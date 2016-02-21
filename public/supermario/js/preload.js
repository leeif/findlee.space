var SuperMario = SuperMario || {};

//loading the game assets
SuperMario.Preload = function(){};

SuperMario.Preload.prototype = {
  preload: function() {
    //show loading screen
    //load game assets
    this.load.tilemap('level-1-1', 'supermario/asset/tilemap/super_mario_level_1.json', 
    	null, Phaser.Tilemap.TILED_JSON);
    this.load.image('background', 'supermario/asset/image/background-01.png');
    this.load.image('ground', 'supermario/asset/image/ground.png');
    this.load.image('block-01', 'supermario/asset/image/block-01.png');
    this.load.image('block-02', 'supermario/asset/image/block-02.png');
    this.load.image('block-03', 'supermario/asset/image/block-03.png');
    this.load.image('pipe', 'supermario/asset/image/pipe.png');
    this.load.spritesheet('kinoko', 'supermario//asset/image/kinoko_frame.png', 32, 32);
    this.load.image('bigMarshroom', 'supermario//asset/image/big_marshroom.png');
    this.load.image('deadMario', 'supermario/asset/image/dead.png');
    this.load.spritesheet('smallMario', 'supermario/asset/image/mario_small_frame.png', 32, 32);
    this.load.spritesheet('bigMario', 'supermario/asset/image/mario_big_frame.png', 32, 64);
  },
  create: function() {
    this.state.start('game');
  }
};