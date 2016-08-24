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
        rowCount: 11,
        columnCount: 8,
        gameContainerMarginTop: 180,
        levelTailImage: null,
        cells: [],

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
                scaleY: this.scale
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
        },

        onUserInput: function (e) {
            if (e.eventTarget == this.gameContainer) {
                var cellWidth = this.gameContainer.width / this.columnCount,
                    cellHeight = this.gameContainer.height / this.rowCount;
                var x = e.stageX, y = e.stageY - this.gameContainerMarginTop;
                var column = Math.floor(x / cellWidth), row = Math.floor(y / cellHeight);
                this.biuAction(row, column);
                setTimeout(this.checkLevelComplete.bind(this), 500);
            }
        },

        checkHasMatch: function (row, column) {

            if (this.cells[row][column]) return [];

            var i, top = {}, left = {}, right = {}, bottom = {};

            for (i = column; i >= 0; i--) {
                if (this.cells[row][i]) {
                    left = this.cells[row][i];
                    break;
                }
            }
            for (i = column; i < this.columnCount; i++) {
                if (this.cells[row][i]) {
                    right = this.cells[row][i];
                    break
                }
            }
            for (i = row; i >= 0; i--) {
                if (this.cells[i][column]) {
                    top = this.cells[i][column];
                    break;
                }
            }
            for (i = row; i < this.rowCount; i++) {
                if (this.cells[i][column]) {
                    bottom = this.cells[i][column];
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

        showTips: function () {
            var padding = 4;
            var scale = 1;
            var star = new Hilo.Bitmap({
                x: this.cellWidth * column + padding,
                y: this.cellHeight * row + padding,
                scaleX: scale,
                scaleY: scale,
                height: this.cellHeight - padding * 2,
                width: this.cellWidth - padding * 2,
                //image: this.levelTailImage
            }).addTo(this.gameContainer);
        },

        biuAction: function (row, column) {
            if (this.cells[row][column]) return;
            var match_tiles = this.checkHasMatch(row, column);
            match_tiles.forEach(function (i) {
                i.bitmap.removeFromParent(this.gameContainer);
                this.cells[i.row][i.column] = null;
            }.bind(this))
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

            if (over && this.getTileCount() / (this.rowCount * this.columnCount) > 0.8) {
                over = false;
            }

            if (over) {
                this.pauseGameProgress();
                alert('level complete');
                window.ContentPanel.levelComplete();
            }
        },

        setLevel: function (count) {
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

            var list = randListChoices(count, 88);
            for (var i = 0; i < list.length; i++) {
                var row = Math.floor(list[i] / 8);
                var column = list[i] % this.columnCount;

                var position = Math.round(Math.random() * 8) % 8;
                this.addTile(position, row, column);
            }

            this.gameMoving();
        },

        gameMoving: function () {
            var delay = 5000 - this.score * 10;
            if (delay < 300) delay = 500;

            this.progressTimer = setTimeout(function () {

                var position = Math.round(Math.random() * 8) % 8;
                var r = parseInt(Math.random() * this.rowCount * this.columnCount);
                var or = r;

                while (this.cells[Math.floor(r / this.columnCount)][r % this.columnCount]) {
                    r++;
                    if (r >= this.rowCount * this.columnCount) r = 0;
                    if (r == or) {
                        return;
                    }
                }

                this.addTile(position, Math.floor(r / this.columnCount), r % this.columnCount, 'animate');
                this.gameMoving();
            }.bind(this), delay);
        },

        pauseGameProgress: function () {
            clearTimeout(this.progressTimer)
        },

        addTile: function (position, row, column, with_animate) {
            if (this.cells[row][column])
                throw 'cell in row:' + row + ', column:' + column + 'already exist';

            var padding = 4;
            var scale = with_animate ? 1 : 1;

            this.cells[row][column] = {
                position: position,
                row: row,
                column: column,
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

        onUpdate: function (delta) {
            if (this.getTileCount() >= this.rowCount * this.columnCount) {
                //alert('game over')
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