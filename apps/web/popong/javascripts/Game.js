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
        gameContainerMarginTop: 400,
        levelTailImage: null,
        cells: [],

        audios: {
            levelComplete: new Hilo.HTMLAudio({src: 'audios/level-complete.mp3'}),
            popOff: new Hilo.HTMLAudio({src: 'audios/pop-off.wav'}),
            propsRefresh: new Hilo.HTMLAudio({src: 'audios/props-refresh.mp3'}),
            propsTips: new Hilo.HTMLAudio({src: 'audios/props-tips.wav'}),
            wrongTouch: new Hilo.HTMLAudio({src: 'audios/wrong-touch.mp3'})
        },

        // 记录当前关卡完成进度
        status: {
            level: '第几关',
            pauseAt: '暂停开始时间',
            refreshAt: '开始重新排列',
            star: '获得几颗星',
            wrongTouch: 0,
            initCount: '初始化方块数量',
            tips: [],
            timing: 0,
            title: null
        },
        // 游戏道具
        tools: {},
        propsWidth: 91,
        propsHeight: 106,

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

            // 游戏底部留空要变成绿色
            new Hilo.Container({
                x: 0,
                y: this.width / this.columnCount * this.rowCount + this.gameContainerMarginTop,
                background: '#a3d03f',
                width: this.width,
                height: this.height - (this.width / this.columnCount * this.rowCount) - this.gameContainerMarginTop
            }).addTo(this.stage);

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

            for (var i = 0; i < this.rowCount / 2; i++) {
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
                height: 162 * 2,
                y: 0,
                x: 0
            }).addTo(this.stage);

            // 添加暂停按钮
            this.tools.pause = new Hilo.Bitmap({
                image: this.asset.pause,
                width: 84 * 2,
                height: 84 * 2,
                y: 30,
                x: this.width - 200
            }).addTo(this.stage);
        },

        removeAllProps: function () {
            // refresh 重新排列道具, tips 提示道具
            ['refresh', 'tips', 'freeze'].forEach(function (name) {
                var text = name + 'Text';
                this.tools[name] && this.tools[name].removeFromParent(this.stage);
                this.tools[text] && this.tools[text].removeFromParent(this.stage);
                delete this.tools[name];
                delete this.tools[text];
            }.bind(this))
        },

        // 道具: 自动消除
        addPropsDismiss: function (props) {
            var x = this.width - 320 - 83,
                y = 140;
            this.tools.dismiss = new Hilo.Bitmap({
                image: this.asset.propsDismiss,
                width: this.propsWidth * 2,
                height: this.propsHeight * 2,
                y: y,
                x: x
            }).addTo(this.stage);

            var text = props.price + '工分';
            if (props.unlock && props.unlock > this.status.level) text = props.unlock + '关解锁';

            this.tools.dismissText = new Hilo.Text({
                text: text,
                color: 'white',
                textAlign: 'center',
                textVAlign: 'middle',
                width: this.propsWidth * 2,
                height: this.propsHeight * 2,
                y: y + 65,
                x: x
            }).addTo(this.stage).setFont('normal small-caps bold 40px Sans-serif');
        },

        // 道具: 时间冻结
        addPropsFreeze: function (props) {
            var x = this.width - 320 - 300,
                y = 140;
            this.tools.freeze = new Hilo.Bitmap({
                image: this.asset.propsFreeze,
                width: this.propsWidth * 2,
                height: this.propsHeight * 2,
                y: y,
                x: x
            }).addTo(this.stage);

            var text = props.price + '工分';
            if (props.unlock && props.unlock > this.status.level) text = props.unlock + '关解锁';
            this.tools.freezeText = new Hilo.Text({
                text: text,
                color: 'white',
                textAlign: 'center',
                textVAlign: 'middle',
                width: this.propsWidth * 2,
                height: this.propsHeight * 2,
                y: y + 65,
                x: x
            }).addTo(this.stage).setFont('normal small-caps bold 40px Sans-serif');
        },

        // 道具: 重新排列
        addPropsRefresh: function (props) {
            var x = 460,
                y = 140;

            this.tools.refresh = new Hilo.Bitmap({
                image: this.asset.propsRefresh,
                width: this.propsWidth * 2,
                height: this.propsHeight * 2,
                y: y,
                x: x
            }).addTo(this.stage);

            var text = props.price + '工分';
            if (props.unlock && props.unlock > this.status.level) text = props.unlock + '关解锁';
            this.tools.refreshText = new Hilo.Text({
                text: text,
                color: 'white',
                textAlign: 'center',
                textVAlign: 'middle',
                width: this.propsWidth * 2,
                height: this.propsHeight * 2,
                y: y + 65,
                x: x
            }).addTo(this.stage).setFont('normal small-caps bold 40px Sans-serif');
        },

        // 道具: 提示
        addPropsTips: function (props) {
            var x = 240, y = 140;
            this.tools.tips = new Hilo.Bitmap({
                image: this.asset.propsTips,
                width: this.propsWidth * 2,
                height: this.propsHeight * 2,
                y: y,
                x: x
            }).addTo(this.stage);

            var text = props.price + '工分';
            if (props.unlock && props.unlock > this.status.level) text = props.unlock + '关解锁';
            this.tools.tipsText = new Hilo.Text({
                text: text,
                color: 'white',
                textAlign: 'center',
                textVAlign: 'middle',
                width: this.propsWidth * 2,
                height: this.propsHeight * 2,
                y: y + 65,
                x: x
            }).addTo(this.stage).setFont('normal small-caps bold 40px Sans-serif');
        },

        onUserInput: function (e) {
            if (this.status.refreshAt) return; // 洗牌过程中不能响应用户事件

            if (e.eventTarget == this.gameContainer) {
                var cellWidth = this.gameContainer.width / this.columnCount,
                    cellHeight = this.gameContainer.height / this.rowCount;
                var x = e.stageX, y = e.stageY - this.gameContainerMarginTop;
                var column = Math.floor(x / cellWidth), row = Math.floor(y / cellHeight);
                this.biuAction(row, column);
                setTimeout(this.checkLevelComplete.bind(this), 800);
            } else if (e.eventTarget == this.tools.refresh || e.eventTarget == this.tools.refreshText) {
                this.pauseGameProgress();
                // refresh 刷新道具
                window.ContentPanel.useProps(PROPS_NAME_IDS.refresh,
                    function () {
                        this.toolsRefresh();
                        this.continueGameProgress();
                    }.bind(this)
                );
            } else if (e.eventTarget == this.tools.tips || e.eventTarget == this.tools.tipsText) {
                // 表示提示道具
                this.usePropsHandler(PROPS_NAME_IDS.tips, this.toolsShowTips.bind(this));
            } else if (e.eventTarget == this.tools.freeze || e.eventTarget == this.tools.freezeText) {
                // 冰冻时间道具
                this.pauseGameProgress();
                window.ContentPanel.useProps(PROPS_NAME_IDS.freeze, function () {
                    // this.toolsFreeze()
                    this.continueGameProgress();
                })
            } else if (e.eventTarget == this.tools.dismiss || e.eventTarget == this.tools.dismissText) {
                this.pauseGameProgress();
                window.ContentPanel.useProps(PROPS_NAME_IDS.dismiss, function () {
                    // this.toolsDismiss()
                    this.continueGameProgress();
                })
            } else if (e.eventTarget == this.tools.pause) {
                this.pauseGameProgress();
                window.ContentPanel.setPage('pause');
            }
        },

        usePropsHandler: function (prop_id, cb) {
            this.pauseGameProgress();
            window.ContentPanel.useProps(prop_id,
                function () {
                    cb();
                    this.continueGameProgress();
                }.bind(this)
            );
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

        showStarInCell: function (row, col, scale, duration) {
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
                duration: duration || 2 * 1000,
                bitmap: bm
            });
        },

        toolsShowTips: function () {
            var i, j;
            out:
                for (i = 0; i < this.rowCount; i++) {
                    for (j = 0; j < this.columnCount; j++) {
                        var m = !!this.checkHasMatch(i, j).length;
                        if (m) {
                            this.showStarInCell.call(this, i, j, 0.7);
                            break out;
                        }
                    }
                }

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
            // 画线
            match_tiles.forEach(function (i) {
                if (i.row == row) {
                    var col = column, d = column > i.column ? -1 : 1;
                    while (Math.abs(col - i.column) > 1) {
                        col += d;
                        this.drawDotLine(row, col, 'horizon')
                    }
                } else {
                    var r = row, d = row > i.row ? -1 : 1;
                    while (Math.abs(r - i.row) > 1) {
                        r += d;
                        this.drawDotLine(r, column, 'vertical')
                    }
                }
            }.bind(this));

            // 去除方块
            match_tiles.forEach(function (i) {
                i.bitmap.removeFromParent(this.gameContainer);
                this.cells[i.row][i.column] = null;
            }.bind(this));

            if (!match_tiles.length) {
                // 如果没有匹配, 说明点错了, 要惩罚
                this.status.wrongTouch++;
                var newCount = Math.min(this.status.wrongTouch, 6);
                for (var i = 0; i < newCount; i++) {
                    var r = this.getRandomEmptyCell();
                    if (!r) return;
                    this.addTile(null, r.x, r.y, 'with_animate')
                }
                this.audios.wrongTouch.play();
            } else {
                // 成功消除方块后在当前位置显示一颗小星星
                this.showStarInCell(row, column, 0.7, 500);
                this.audios.popOff.play();
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
                var success = this.getTileCount() / (this.rowCount * this.columnCount) < 0.7;
                window.ContentPanel.levelComplete(success, this.status.timing);
            }
        },

        /*
         @params: initCount 初始化方块个数
         @params: level 关卡数
         @params: props 可用道具列表
         */
        setLevel: function (initCount, level, props) {
            var _this = this;

            this.cells.forEach(function (row) {
                row.forEach(function (i) {
                    i && i.bitmap && i.bitmap.removeFromParent(_this.gameContainer)
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
                i && i.removeFromParent(this.gameContainer)
            }.bind(this));
            this.usageTime && this.usageTime.removeFromParent(this.stage);
            this.usageTime = new Hilo.BitmapText({
                x: 80,
                y: 50,
                visible: true,
                text: '0a',
                scaleX: 2,
                scaleY: 2,
                height: 35 * 2,
                glyphs: this.asset.numberGlyphs
            }).addTo(this.stage);

            this.status = {
                level: level,
                pauseAt: false,
                star: 0,
                initCount: initCount,
                wrongTouch: 0,
                tips: [],
                timing: 0,
                title: null
            };

            // 添加关卡title
            // 添加顶部背景
            new Hilo.Bitmap({
                image: this.asset.levelTitle,
                width: 160 * 2,
                height: 35 * 2,
                y: 60,
                x: this.width / 2 - 160 - 30
            }).addTo(this.stage);
            this.status.title = new Hilo.BitmapText({
                x: this.width / 2 + 120,
                y: 60,
                visible: true,
                text: this.status.level,
                scaleX: 2,
                scaleY: 2,
                height: 40 * 2,
                glyphs: this.asset.numberGlyphs
            }).addTo(this.stage);

            // this.status.title = new Hilo.Text({
            //     text: this.status.level,
            //     color: 'red',
            //     font: '40px',
            //     textAlign: 'center',
            //     textVAlign: 'middle',
            //     width: 300 * 3,
            //     height: 50 * 2,
            //     maxWidth: 300 * 2,
            //     textHeight: 50 * 2,
            //     textWidth: 300 * 2,
            //     y: 60,
            //     x: 320
            // }).addTo(this.stage).setFont('normal small-caps bold 80px Sans-serif');

            (props || []).forEach(function (i) {
                if (i.prop_id == PROPS_NAME_IDS.freeze) this.addPropsFreeze(i);
                if (i.prop_id == PROPS_NAME_IDS.refresh) this.addPropsRefresh(i);
                if (i.prop_id == PROPS_NAME_IDS.tips) this.addPropsTips(i);
                if (i.prop_id == PROPS_NAME_IDS.dismiss) this.addPropsDismiss(i);
            }.bind(this));

            this.gameTiming();
            this.gameMoving();
        },

        gameTiming: function () {
            clearTimeout(this._timing_timer);
            this._timing_timer = setTimeout(this.gameTiming.bind(this), 1000);
            // 游戏暂停中, 不再计算时间
            if (this.status.pauseAt) return;

            this.status.timing = (this.status.timing || 1) + 1;
            // var minutes = parseInt(this.status.timing / 60);
            // var seconds = this.status.timing % 60;
            // if (seconds < 10) seconds = '0' + seconds;
            // var text = minutes + 'a' + seconds + 'b';
            // this.usageTime.setText(text);
            this.usageTime.setText(this.status.timing + 'a');
        },

        gameMoving: function () {
            var delay;

            delay = 5000 - parseInt((this.status.level - 1) / 3) * 500;
            delay -= Math.min(6, parseInt(this.status.timing / 10)) * 500;

            this.progressTimer = setTimeout(function () {
                var r = this.getRandomEmptyCell();
                if (!r) {
                    // no more empty cell, game over
                    window.ContentPanel.levelComplete(false, this.status.timing);
                    return;
                }

                this.addTile(null, r.x, r.y, 'animate');
                // 添加方块后立即检查 游戏是否结束
                setTimeout(this.checkLevelComplete.bind(this), 800);

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
            this.status.pauseAt = now();
        },

        continueGameProgress: function () {
            this.status.pauseAt = false;
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

        drawDotLine: function (row, column, orientation) {
            var dots = [], i, c, delta, x, y, radius = 12;
            for (i = 0; i < 3; i++) {
                delta = (3 * (i + 1) - 1) / 10;
                x = column * this.cellHeight;
                y = row * this.cellWidth;

                if (orientation == 'vertical') {
                    x += this.cellHeight / 2 - radius / 2;
                    y += this.cellWidth * delta - radius / 2;
                } else {
                    y += this.cellWidth / 2 - radius / 2;
                    x += this.cellHeight * delta - radius / 2;
                }

                c = new Hilo.Graphics({
                    x: x,
                    y: y,
                    width: 40,
                    height: 40
                }).beginFill("white", 1).drawCircle(0, 0, radius).endFill().addTo(this.gameContainer);
                dots.push(c);
            }
            setTimeout(function () {
                for (var j = 0; j < dots.length; j++) {
                    dots[j].removeFromParent(this.gameContainer)
                }
            }.bind(this), 250);
        },

        getTileCount: function () {
            var tile_count = 0;
            this.cells.forEach(function (rows) {
                rows.forEach(function (i) {
                    i && tile_count++
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
                    if (now() - tip.addAt > tip.duration) {
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