var exports = module.exports = {}
exports.appleTree = function(game){
	console.log('Start- ','Apple Tree; aLeftApple')
	game = appleTree(game)
	console.log('End- ','Apple Tree; aLeftApple')
	return game
}

function appleTree(game){
	//Checks all snakes for the apple situation
	for(var snakeIndex = 0; snakeIndex < game.snakes.length; snakeIndex++){
		if(game.snakes[snakeIndex].situation === 'apple'){
			//Find a home for apple!
			findAppleHome:
			for (var row = game.snakes[snakeIndex].head.row-1; row !== game.snakes[snakeIndex].head.row; row--) {
				for (var column = game.snakes[snakeIndex].head.column-1; column !== game.snakes[snakeIndex].head.column; column--) {
					if(game.field[row][column] !== game.symbols.walls.wall && 
						game.field[row][column] !== game.symbols.walls.intersect &&
						game.field[row][column] !== game.symbols.snake.head &&
						game.field[row][column] !== game.symbols.snake.tail){
						//APPLE FOUND A HOME!
						game.field[row][column] = game.symbols.apple
						break findAppleHome
					}
					//Loop back to the start
					if(column === 0){column = game.field[0].length}
				}
				if(row === 0){row = game.field.length}
			}
		}
	}
	return game
}
