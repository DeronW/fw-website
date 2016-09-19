;(function () {

    window.onload = function () {
        Game.loadAssets();
    };

    var Game = window.Game = {
        width: 0,
        height: 0,

        initialized: false,
        asset: null,
        stage: null,
        ticker: null,
        score: 0,
        progressTimer: null,

        // game cells
        cellWidth: null,
        cellHeight: null,
        rowCount: 9,
        columnCount: 8,
        gameContainerMarginTop: 560,
        levelTailImage: null,
        cells: [],

        // 记录当前关卡完成进度
        status: {
            level: '第几关',
            startAt: '关卡开始时间',
            pauseAt: '暂停开始时间',
            refreshAt: '开始重新排列',
            star: '获得几颗星',
            wrongTouch: 0,
            initCount: '初始化方块数量',
            tips: [],
            title: null
        },
        // 游戏道具
        tools: {},

        loadAssets: function () {
            if (this.initialized) return;

            this.asset = new Game.Asset();
            this.asset.on('complete', function (e) {
                this.asset.off('complete');
                this.initStage();

                this.initialized = true
            }.bind(this));

            this.asset.load()
        },

        initStage: function () {
            this.scale = 0.5;
            this.width = window.innerWidth * 2;
            this.height = window.innerHeight * 2;

            // 舞台
            this.stage = new Hilo.Stage({
                renderType: 'canvas',
                width: this.width,
                height: this.height,
                scaleX: this.scale,
                scaleY: this.scale,
                background: '#f6d3ab'
            });
            document.getElementById('game').appendChild(this.stage.canvas);

            // 启动计时器
            this.ticker = new Hilo.Ticker(20);
            this.ticker.addTick(Hilo.Tween);
            this.ticker.addTick(this.stage);
            this.ticker.start();

            // 绑定交互事件
            this.stage.enableDOMEvent(Hilo.event.POINTER_START, true);
            this.stage.on(Hilo.event.POINTER_START, this.onUserInput.bind(this));

            // 舞台更新
            this.stage.onUpdate = this.onUpdate.bind(this);

            this.initGameContainer();

            this.levelTailImage = this.asset.level_1;
            //this.setLevel(20, 0)
        },

        initGameContainer: function () {
            this.cellWidth = this.width / this.columnCount;
            this.cellHeight = this.cellWidth;

            var c = this.gameContainer = new Hilo.Container({
                x: 0,
                y: this.gameContainerMarginTop,
                alpha: 1,
                background: '#f6d3ab',
                width: this.width,
                height: this.width / this.columnCount * this.rowCount,
                clipChildren: true,
                pointerChildren: false
            }).addTo(this.stage, 1);

            for (var i = 0; i < this.columnCount / 2; i++) {
                new Hilo.View({
                    x: c.width / this.columnCount * (i * 2 + 1),
                    y: 0,
                    width: c.width / this.columnCount,
                    height: c.height,
                    alpha: 0.25,
                    background: '#f0a65e'
                }).addTo(c)
            }

            for (var i = 0; i < this.rowCount; i++) {
                new Hilo.View({
                    x: 0,
                    y: c.height / this.rowCount * i * 2,
                    width: c.width,
                    height: c.height / this.rowCount,
                    alpha: 0.3,
                    background: '#f0b67d'
                }).addTo(c)
            }

            // 添加顶部背景
            new Hilo.Bitmap({
                image: this.asset.grasshead,
                width: this.width,
                height: 271 * 2,
                y: 0,
                x: 0
            }).addTo(this.stage);

            // 不添加底部草地了, 屏幕高度不够
            // // 添加底部草地
            // new Hilo.Bitmap({
            //     image: this.asset.grassland,
            //     width: this.width,
            //     height: 160,
            //     y: this.height - 160,
            //     x: 0
            // }).addTo(this.stage);

            // 添加暂停按钮
            this.tools.pause = new Hilo.Bitmap({
                image: this.asset.pause,
                width: 84 * 2,
                height: 84 * 2,
                y: 30,
                x: this.width - 280
            }).addTo(this.stage);

            // 道具: 重新排列
            this.tools.refresh = new Hilo.Bitmap({
                image: this.asset.propsRefresh,
                width: 83 * 2,
                height: 96 * 2,
                y: 320,
                x: 280
            }).addTo(this.stage);

            // 道具: 提示
            this.tools.tips = new Hilo.Bitmap({
                image: this.asset.propsTips,
                width: 83 * 2,
                height: 96 * 2,
                y: 300,
                x: this.width - 320 - 83 - 83
            }).addTo(this.stage);

        },

        onUserInput: function (e) {
            if (this.status.refreshAt) return; // 洗牌过程中不能响应用户事件
            if (e.eventTarget == this.gameContainer) {
                var cellWidth = this.gameContainer.width / this.columnCount,
                    cellHeight = this.gameContainer.height / this.rowCount;
                var x = e.stageX, y = e.stageY - this.gameContainerMarginTop;
                var column = Math.floor(x / cellWidth), row = Math.floor(y / cellHeight);
                this.biuAction(row, column);
                setTimeout(this.checkLevelComplete.bind(this), 500);
            } else if (e.eventTarget == this.tools.refresh) {
                this.toolsRefresh();
            } else if (e.eventTarget == this.tools.tips) {
                this.toolsShowTips()
            } else if (e.eventTarget == this.tools.freeze) {
                this.toolsFreeze()
            } else if (e.eventTarget == this.tools.dismiss) {
                this.toolsDismiss()
            } else if (e.eventTarget == this.tools.pause) {
                this.pauseGameProgress();
                window.ContentPanel.setPage('pause');
            }
        },

        checkHasMatch: function (row, column) {

            if (this.cells[row][column]) return [];

            var i, top = {}, left = {}, right = {}, bottom = {};

            for (i = column; i >= 0; i--) {
                var c_a = this.cells[row][i];
                if (c_a && !c_a.with_animate) {
                    left = c_a;
                    break;
                }
            }
            for (i = column; i < this.columnCount; i++) {
                var c_b = this.cells[row][i];
                if (c_b && !c_b.with_animate) {
                    right = c_b;
                    break
                }
            }
            for (i = row; i >= 0; i--) {
                var c_c = this.cells[i][column];
                if (c_c && !c_c.with_animate) {
                    top = c_c;
                    break;
                }
            }
            for (i = row; i < this.rowCount; i++) {
                var c_d = this.cells[i][column];
                if (c_d && !c_d.with_animate) {
                    bottom = c_d;
                    break;
                }
            }

            var positions = [top.position, right.position, bottom.position, left.position];

            function checkRepeat(p) {
                var r = 0;
                positions.forEach(function (i) {
                    if (i != undefined && i == p) r++
                });
                return r > 1;
            }

            var tiles = [];
            [top, left, right, bottom].forEach(function (i) {
                if (checkRepeat(i.position)) tiles.push(i);
            });

            return tiles;
        },

        toolsShowTips: function () {

            var i, j;
            out:
                for (i = 0; i < this.rowCount; i++) {
                    for (j = 0; j < this.columnCount; j++) {
                        var m = !!this.checkHasMatch(i, j).length;
                        if (m) {
                            addStar.call(this, i, j, 0.7);
                            break out;
                        }
                    }
                }

            function addStar(row, col, scale) {
                var padding = 4;
                var x = this.cellWidth * col + padding, y = this.cellHeight * row + padding;
                var bm = new Hilo.Bitmap({
                    x: x + this.cellWidth / 2,
                    y: y + this.cellHeight / 2,
                    pivotX: this.cellWidth / 2,
                    pivotY: this.cellHeight / 2,
                    scaleX: scale,
                    scaleY: scale,
                    height: this.cellHeight - padding * 2,
                    width: this.cellWidth - padding * 2,
                    image: this.asset.tipStar
                }).addTo(this.gameContainer);

                this.status.tips.push({
                    addAt: now(),
                    bitmap: bm
                });
            };
        },

        toolsRefresh: function () {
            if (this.status.refreshAt) return; // 正在刷新中, 不能重复点击
            this.status.refreshAt = now();
            setTimeout(function () {
                this.setLevel(this.getTileCount(), this.status.level);
                this.status.refreshAt = null;
            }.bind(this), 800);
        },

        toolsFreeze: function () {
            alert('冰冻道具未完成')
        },

        toolsDismiss: function () {
            alert('消除道具未完成')
        },

        biuAction: function (row, column) {
            if (this.cells[row][column]) return;
            var match_tiles = this.checkHasMatch(row, column);
            match_tiles.forEach(function (i) {
                i.bitmap.removeFromParent(this.gameContainer);
                this.cells[i.row][i.column] = null;
            }.bind(this));

            // 如果没有匹配, 说明点错了, 要惩罚
            if (!match_tiles.length) {
                this.status.wrongTouch++;
                var newCount = Math.min(this.status.wrongTouch, 6);
                for (var i = 0; i < newCount; i++) {
                    var r = this.getRandomEmptyCell();
                    if (!r) return;
                    this.addTile(null, r.x, r.y, 'with_animate')
                }
            }
        },

        checkLevelComplete: function () {
            var over = true;

            out:
                for (var i = 0; i < this.rowCount; i++) {
                    for (var j = 0; j < this.columnCount; j++) {
                        if (this.checkHasMatch(i, j).length) {
                            over = false;
                            break out;
                        }
                    }
                }

            if (over) {
                this.pauseGameProgress();
                var used_time = parseInt((now() - this.status.startAt) / 1000);
                var success = this.getTileCount() / (this.rowCount * this.columnCount) > 0.8;
                window.ContentPanel.levelComplete(success, used_time);
            }
        },

        setLevel: function (initCount, level) {
            var _this = this;

            this.cells.forEach(function (row) {
                row.forEach(function (i) {
                    i.bitmap.removeFromParent(_this.gameContainer)
                })
            });

            this.cells = [];
            for (var i = 0; i < this.rowCount; i++) {
                this.cells[i] = []
            }

            // 设置当前关卡的游戏头像
            this.levelTailImage = this.asset['level_' + level];

            var list = randListChoices(initCount, this.rowCount * this.columnCount);
            for (var i = 0; i < list.length; i++) {
                var row = Math.floor(list[i] / this.columnCount);
                var column = list[i] % this.columnCount;

                this.addTile(null, row, column);
            }

            // 初始化某一关卡的游戏时, 重置当前关卡游戏的进度
            this.status.title && this.status.title.removeFromParent(this.stage);
            this.status.tips.forEach(function (i) {
                i.removeFromParent(this.gameContainer)
            }.bind(this));

            this.status = {
                level: level,
                startAt: now(),
                continueAt: 0,
                star: 0,
                initCount: initCount,
                wrongTouch: 0,
                tips: [],
                title: null
            };

            // 添加关卡title
            this.status.title = new Hilo.Text({
                text: 'LEVEL ' + this.status.level,
                color: 'red',
                font: '40px',
                textAlign: 'center',
                textVAlign: 'middle',
                width: 300 * 2,
                height: 50 * 2,
                maxWidth: 300 * 2,
                textHeight: 50 * 2,
                textWidth: 300 * 2,
                y: 120,
                x: 420
            }).addTo(this.stage).setFont('normal small-caps bold 80px Sans-serif');

            this.gameMoving();
        },

        gameMoving: function () {
            var delay, consume = parseInt((now() - this.status.startAt) / 1000);

            delay = 5000 - parseInt((this.status.level - 1) / 3) * 500;
            delay -= Math.min(6, parseInt(consume / 10)) * 500;

            this.progressTimer = setTimeout(function () {
                var r = this.getRandomEmptyCell();
                if (!r) {
                    // no more empty cell, game over
                    window.ContentPanel.levelComplete(false, parseInt((now() - this.status.startAt) / 1000));
                    return;
                }

                this.addTile(null, r.x, r.y, 'animate');
                // 添加方块后立即检查 游戏是否结束
                setTimeout(this.checkLevelComplete.bind(this), 500);

                this.gameMoving();
            }.bind(this), delay);
        },

        getRandomEmptyCell: function () {
            var remainCellCount = this.rowCount * this.columnCount - this.getTileCount();
            if (remainCellCount < 1) {
                console.log('game over');
                return null; // 游戏结束了
            }

            var randCell = Math.floor(Math.random() * remainCellCount);
            var x = 0, y = 0;

            out:
                while (x < this.rowCount) {
                    while (y < this.columnCount) {
                        if (!this.cells[x][y]) randCell--;
                        if (randCell < 0) break out;
                        y++;
                    }
                    y = 0;
                    x++;
                }

            return {x: x, y: y}
        },

        pauseGameProgress: function () {
            clearTimeout(this.progressTimer);
            this.status.continueAt = now();
        },

        continueGameProgress: function () {
            if (this.status.continueAt)
                this.status.startAt += now() - this.status.continueAt;
            this.gameMoving();
        },

        addTile: function (position, row, column, with_animate) {
            if (this.cells[row][column])
                throw 'cell in row:' + row + ', column:' + column + ' already exist';

            if (position === null) position = Math.round(Math.random() * 8) % 8;
            var padding = 4;
            var scale = with_animate ? 0.1 : 1;

            this.cells[row][column] = {
                position: position,
                row: row,
                column: column,
                with_animate: with_animate,
                bitmap: new Hilo.Bitmap({
                    x: this.cellWidth * column + padding,
                    y: this.cellHeight * row + padding,
                    scaleX: scale,
                    scaleY: scale,
                    height: this.cellHeight - padding * 2,
                    width: this.cellWidth - padding * 2,
                    rect: this.asset.LEVEL_IMG_RECT[position],
                    image: this.levelTailImage
                }).addTo(this.gameContainer)
            };

            return this.cells[row][column];
        },

        getTileCount: function () {
            var tile_count = 0;
            this.cells.forEach(function (rows) {
                rows.forEach(function (i) {
                    tile_count++
                })
            });
            return tile_count;
        },

        onUpdate: function () {
            // 重新排列时的过场动画
            if (this.status.refreshAt > 0) this.onUpdateRefreshAnimate();
            // 每次更新, 检查那个新增块需要动画
            if (this.cells.length) this.onUpdateTileAnimate();
            // 如果有提示小星星, 让小行星转起来
            if (this.status.tips.length) this.onUpdateRotateStar();
        },

        onUpdateRefreshAnimate: function () {
            var i, j, bm;
            for (i = 0; i < this.rowCount; i++) {
                for (j = 0; j < this.columnCount; j++) {
                    if (!this.cells[i][j]) continue;
                    bm = this.cells[i][j].bitmap;
                    // TODO: 洗牌的动画轨迹
                    // bm.x = 0;
                    bm.y = bm.y + 460;
                }
            }

            if (now() - this.status.refreshAt > 2000)
                this.status.refreshAt = false;
        },

        onUpdateTileAnimate: function () {
            for (var i = 0; i < this.rowCount; i++) {
                for (var j = 0; j < this.columnCount; j++) {
                    var cell = this.cells[i][j];
                    if (cell && cell.with_animate) {
                        var scale = cell.bitmap.scaleX;
                        scale += 0.18;
                        if (scale >= 1) scale = 1;
                        cell.bitmap.scaleX = scale;
                        cell.bitmap.scaleY = scale;

                        if (scale >= 1) cell.with_animate = false;
                    }
                }
            }
        },

        onUpdateRotateStar: function () {
            for (var i = 0; i < this.status.tips.length; i++) {
                var tip = this.status.tips[i];
                if (tip) {
                    if (now() - tip.addAt > 3 * 1000) {
                        tip.bitmap.removeFromParent(this.gameContainer);
                        this.status.tips[i] = null;
                    } else {
                        tip.bitmap.rotation += 8;
                    }
                }
            }
        }
    }
})();

function randListChoices(count, all) {
    var r = [];
    for (var i = 0; i < count; i++) {
        var n = Math.round(Math.random() * all);
        while (r[n % all]) n++;
        r[n % all] = true
    }

    var res = [];
    for (var j = 0; j < r.length; j++) {
        if (r[j]) res.push(j)
    }

    return res;
}

function now() {
    return +new Date()
}