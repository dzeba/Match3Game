var Match3 = Match3 || {};

Match3.Block = function (state, x, y, data) {
    Phaser.Sprite.call(this, state.game, x, y, data.asset);

    this.game = state.game;
    this.state = state;
    this.row = data.row;
    this.col = data.col;

    this.anchor.setTo(0.5);

    //listen for input
    this.inputEnabled = true;


    this.events.onInputOver.add(state.pickBlock, this.state);
    this.events.onInputUp.add(state.pickBlock, this.state);


};

Match3.Block.prototype = Object.create(Phaser.Sprite.prototype);
Match3.Block.prototype.constructor = Match3.Block;

Match3.Block.prototype.reset = function (x, y, data) {
    Phaser.Sprite.prototype.reset.call(this, x, y);
    this.loadTexture(data.asset);
    this.row = data.row;
    this.col = data.col;
};

Match3.Block.prototype.kill = function (data) {

    this.col = null;
    this.row = null;
    if (data.asset === 'block1') {


        let emitter = this.game.add.emitter(this.x, this.y, 1);
        emitter.makeParticles('particle1');
        emitter.minParticleSpeed.setTo(-55, -55);
        emitter.maxParticleSpeed.setTo(55, 55);
        emitter.gravity = 0;
        emitter.start(true, 500, null, 1);
    }
    if (data.asset === 'block2') {
        let emitter = this.game.add.emitter(this.x, this.y, 1);
        emitter.makeParticles('particle2');
        emitter.minParticleSpeed.setTo(-55, -55);
        emitter.maxParticleSpeed.setTo(55, 55);
        emitter.gravity = 0;
        emitter.start(true, 500, null, 1);
    }
    if (data.asset === 'block3') {
        let emitter = this.game.add.emitter(this.x, this.y, 1);
        emitter.makeParticles('particle3');
        emitter.minParticleSpeed.setTo(-55, -55);
        emitter.maxParticleSpeed.setTo(55, 55);
        emitter.gravity = 0;
        emitter.start(true, 500, null, 1);
    }
    if (data.asset === 'block4') {
        let emitter = this.game.add.emitter(this.x, this.y, 1);
        emitter.makeParticles('particle4');
        emitter.minParticleSpeed.setTo(-55, -55);
        emitter.maxParticleSpeed.setTo(55, 55);
        emitter.gravity = 0;
        emitter.start(true, 500, null, 1);
    }
    if (data.asset === 'block5') {
        let emitter = this.game.add.emitter(this.x, this.y, 1);
        emitter.makeParticles('particle5');
        emitter.minParticleSpeed.setTo(-55, -55);
        emitter.maxParticleSpeed.setTo(55, 55);
        emitter.gravity = 0;
        emitter.start(true, 500, null, 1);
    }
    if (data.asset === 'block6') {
        let emitter = this.game.add.emitter(this.x, this.y, 1);
        emitter.makeParticles('particle1');
        emitter.minParticleSpeed.setTo(-55, -55);
        emitter.maxParticleSpeed.setTo(55, 55);
        emitter.gravity = 0;
        emitter.start(true, 500, null, 1);
    }

    this.game.time.events.add(this.state.ANIMATION_TIME / 2, function () {
        Phaser.Sprite.prototype.kill.call(this);
    }, this);
};