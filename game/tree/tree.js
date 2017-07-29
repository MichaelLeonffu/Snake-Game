//Putting things in basket.... apples.... more apples.... oh? some worlds too!
//Worlds
var wOriginal = require('./worlds/wOriginal.js')

//Apple Trees
var aLeftApple = require('./appleTree/aLeftApple.js')

//Basket
var basket = {
	wOriginal,
	aLeftApple
}

//Basket transport; dont get lost in the woods!
var exports = module.exports = {}

exports.worldTree = function(game){
	console.log('Start- ','World Tree')
	game = basket[game.game.tree.world].worldTree(game)
	console.log('End- ','World Tree')
	return game
}

exports.appleTree = function(game){
	console.log('Start- ','Apple Tree')
	game = basket[game.game.tree.apple].appleTree(game)
	console.log('End- ','Apple Tree')
	return game
}