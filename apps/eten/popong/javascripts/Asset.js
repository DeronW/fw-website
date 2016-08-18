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
                {id: 'colorLevel', src: 'images/game/level_color.png'},
                {id: 'tipStar', src: 'images/game/tip-star.jpg'}
            ];

            this.queue = new Hilo.LoadQueue();
            this.queue.add(resources);
            this.queue.on('complete', this.onComplete.bind(this));
            this.queue.start();
        },

        onComplete: function (e) {

            this.colorLevel = this.queue.get('colorLevel').content;
            this.tipStar = this.queue.get('colorLevel').content;
            // this.level_color_rect = {
            //     0: {image: level_color, rect: [8 + 84 * 0 + 16 * 0, 8, 84, 84]},
            //     1: {image: level_color, rect: [8 + 84 * 1 + 16 * 1, 8, 84, 84]},
            //     2: {image: level_color, rect: [8 + 84 * 2 + 16 * 2, 8, 84, 84]},
            //     3: {image: level_color, rect: [8 + 84 * 3 + 16 * 3, 8, 84, 84]},

            //     4: {image: level_color, rect: [8 + 84 * 0 + 16 * 0, 8 + 84 + 8, 84, 84]},
            //     5: {image: level_color, rect: [8 + 84 * 1 + 16 * 1, 8 + 84 + 8, 84, 84]},
            //     6: {image: level_color, rect: [8 + 84 * 2 + 16 * 2, 8 + 84 + 8, 84, 84]},
            //     7: {image: level_color, rect: [8 + 84 * 3 + 16 * 3, 8 + 84 + 8, 84, 84]}
            // };

            this.queue.off('complete');
            this.fire('complete');
        }
    });

})(window.Game);