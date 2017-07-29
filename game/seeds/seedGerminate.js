//Collecting all seeds (DONT MIX THEM!)
//World Seeds
var wSeed = require('./worldSeeds/wSeed.js')

//Apple Seeds
var aUpSeed = require('./appleSeeds/aUpSeed.js')

//All seeds
var seedPouch = {
	wSeed,
	aUpSeed
}

//Seed transport
var exports = module.exports = {}

exports.seedWorldGerminate = function(game){
	console.log('Start- ','World Seed Germinate')
	game = seedPouch[game.game.seeds.world].worldSeed(game)
	console.log('End- ','World Seed Germinate')
	return game
}

exports.seedAppleGerminate = function(game){
	console.log('Start- ','Apple Seed Germinate')
	game = seedPouch[game.game.seeds.apple].appleSeed(game)
	console.log('End- ','Apple Seed Germinate')
	return game
}