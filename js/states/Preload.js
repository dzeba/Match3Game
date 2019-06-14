var Match3 = Match3 || {};


Match3.PreloadState = {
    preload: function () {

        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'bar');
        this.preloadBar.anchor.setTo(0.5);
        this.preloadBar.scale.setTo(100, 1);
        this.load.setPreloadSprite(this.preloadBar);


        this.load.image('play', 'assets/images/btn-play.png');
        this.load.image('particle', 'assets/images/particles/particle_ex3.png');

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