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
                {id: 'tipStar', src: 'images/game/tip-star.png'}
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

            this.queue.off('complete');
            this.fire('complete');
        }
    });

})(window.Game);