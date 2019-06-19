var Match3 = Match3 || {};


Match3.PreloadState = {
    preload: function () {

        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'bar');
        this.preloadBar.anchor.setTo(0.5);
        this.preloadBar.scale.setTo(100, 1);
        this.load.setPreloadSprite(this.preloadBar);

        this.load.image('shadow', 'assets/images/game/shadow.png');
        this.load.image('hand', 'assets/images/game/hand.png');
        this.load.image('play', 'assets/images/btn-play.png');
        this.load.image('particle1', 'assets/images/particles/particle-1.png');
        this.load.image('particle2', 'assets/images/particles/particle-2.png');
        this.load.image('particle3', 'assets/images/particles/particle-3.png');
        this.load.image('particle4', 'assets/images/particles/particle-4.png');
        this.load.image('particle5', 'assets/images/particles/particle-5.png');
        this.load.image('particle6', 'assets/images/particles/particle-6.png');
        this.load.image('volume', 'assets/images/btn-sfx.png');
        this.load.image('logo', 'assets/images/donuts_logo.png');
        this.load.image('timeUp', 'assets/images/text-timeup.png');
        this.load.image('block1', 'assets/images/game/gem-01.png');
        this.load.image('block2', 'assets/images/game/gem-02.png');
        this.load.image('block3', 'assets/images/game/gem-03.png');
        this.load.image('block4', 'assets/images/game/gem-04.png');
        this.load.image('block5', 'assets/images/game/gem-05.png');
        this.load.image('block6', 'assets/images/game/gem-06.png');
        this.load.image('deadBlock', 'assets/images/game/shadow.png');
        this.load.image('background', 'assets/images/backgrounds/background.jpg');
        this.load.audio('backgroundAudio', 'assets/audio/background.mp3',);



    },
    create: function () {
        this.state.start('HomeState');
    }
};