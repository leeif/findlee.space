var SuperMario = SuperMario || {};

$(document).ready(function(){

	var width = $('#game').width();
	console.log(width);
	var height = $('#game').height();
	console.log(height);
  SuperMario.game = new Phaser.Game(width, height, Phaser.AUTO, 'game');
  SuperMario.game.state.add('boot', SuperMario.Boot);
  SuperMario.game.state.add('preload', SuperMario.Preload);
  SuperMario.game.state.add('game', SuperMario.Game);

  SuperMario.game.state.start('boot');

}); 
