(function (ns) {

    var Asset = ns.Asset = Hilo.Class.create({
        Mixes: Hilo.EventMixin,

        queue: null,
        colorLevel: null,
        LEVEL_IMG_RECT: [
            [8 + 84 * 0 + 16 * 0, 8, 84, 84],
            [8 + 84 * 1 + 16 * 1, 8, 84, 84],
            [8 + 84 * 2 + 16 * 2, 8, 84, 84],
            [8 + 84 * 3 + 16 * 3, 8, 84, 84],

            [8 + 84 * 0 + 16 * 0, 8 + 84 + 16, 84, 84],
            [8 + 84 * 1 + 16 * 1, 8 + 84 + 16, 84, 84],
            [8 + 84 * 2 + 16 * 2, 8 + 84 + 16, 84, 84],
            [8 + 84 * 3 + 16 * 3, 8 + 84 + 16, 84, 84]
        ],

        load: function () {
            var resources = [
                {id: 'level_1', src: 'images/game/level_1.png'},
                {id: 'level_2', src: 'images/game/level_2.png'},
                {id: 'level_3', src: 'images/game/level_3.png'},
                {id: 'level_4', src: 'images/game/level_4.png'},
                {id: 'level_5', src: 'images/game/level_5.png'},
                {id: 'level_6', src: 'images/game/level_6.png'},
                {id: 'level_7', src: 'images/game/level_7.png'},
                {id: 'level_8', src: 'images/game/level_8.png'},
                {id: 'level_9', src: 'images/game/level_9.png'},
                {id: 'tipStar', src: 'images/game/tip-star.png'},
                {id: 'grassland', src: 'images/game/grassland.png'},
                {id: 'grasshead', src: 'images/game/grass-head.png'},
                {id: 'pause', src: 'images/game/pause.png'},
                {id: 'propsTips', src: 'images/game/props-tips.png'},
                {id: 'propsRefresh', src: 'images/game/props-refresh.png'},
                {id: 'propsFreeze', src: 'images/game/props-freeze.png'},
                {id: 'propsDismiss', src: 'images/game/props-dismiss.png'},
                {id: 'numbers', src: 'images/game/numbers.png'},
            ];

            this.queue = new Hilo.LoadQueue();
            this.queue.add(resources);
            this.queue.on('complete', this.onComplete.bind(this));
            this.queue.start();
        },

        onComplete: function (e) {

            this.level_1 = this.queue.get('level_1').content;
            this.level_2 = this.queue.get('level_2').content;
            this.level_3 = this.queue.get('level_3').content;
            this.level_4 = this.queue.get('level_4').content;
            this.level_5 = this.queue.get('level_5').content;
            this.level_6 = this.queue.get('level_6').content;
            this.level_7 = this.queue.get('level_7').content;
            this.level_8 = this.queue.get('level_8').content;
            this.level_9 = this.queue.get('level_9').content;

            this.tipStar = this.queue.get('tipStar').content;

            this.grassland = this.queue.get('grassland').content;
            this.grasshead = this.queue.get('grasshead').content;
            this.pause = this.queue.get('pause').content;

            this.propsRefresh = this.queue.get('propsRefresh').content;
            this.propsTips = this.queue.get('propsTips').content;

            var numbers = this.queue.get('numbers').content;
            this.numberGlyphs = {
                0: {image: numbers, rect: [0, 0, 35, 35]},
                1: {image: numbers, rect: [0, 0, 35 * 2, 35]},
                2: {image: numbers, rect: [0, 0, 35 * 3, 35]},
                3: {image: numbers, rect: [0, 0, 35 * 4, 35]},
                4: {image: numbers, rect: [0, 0, 35 * 5, 35]},
                5: {image: numbers, rect: [0, 0, 35 * 6, 35]},
                6: {image: numbers, rect: [0, 0, 35 * 7, 35]},
                7: {image: numbers, rect: [0, 0, 35 * 8, 35]},
                8: {image: numbers, rect: [0, 0, 35 * 9, 35]},
                9: {image: numbers, rect: [0, 0, 35 * 10, 35]}
            };

            this.queue.off('complete');
            this.fire('complete');
        }
    });

})(window.Game);