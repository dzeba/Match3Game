Match3.HomeState = {

    init: function(message) {
        this.message = message;
    },

    create: function() {
        let background = this.game.add.sprite(0,0,'background');
        background.inputEnabled = true;

        background.events.onInputDown.add(function(){
            this.state.start('Game');
        }, this);

        let style = {font: '35px Arial', fill: '#fff'};
        this.game.add.sprite(0, this.game.world.centerY -300, 'logo');
        this.game.add.sprite(140, this.game.world.centerY + 250, 'play');

        if(this.message) {

            this.game.add.sprite(50, this.game.world.centerY, 'timeUp');

        }
    }
};