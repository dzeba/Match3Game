var Match3 = Match3 || {};

Match3.game = new Phaser.Game(560, 950, Phaser.AUTO);

Match3.game.state.add('Boot', Match3.BootState);
Match3.game.state.add('Preload', Match3.PreloadState);
Match3.game.state.add('HomeState', Match3.HomeState);
Match3.game.state.add('Game', Match3.GameState);


Match3.game.state.start('Boot');
