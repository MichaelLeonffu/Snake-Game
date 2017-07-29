var exports = module.exports = {}
exports.worldTree = function(game){
	console.log('Start- ','World Tree; wOriginal')
	game = worldTree(game)
	console.log('End- ','World Tree; wOriginal')
	return game
}

function worldTree(game){
	//Just do it!
	for (var row = 0; row <= game.game.tree.worldOptions.rows; row++) {
		game.field[row] = []
		for (var column = 0; column <=  game.game.tree.worldOptions.columns; column++) {
			if(row === 0 && column === 0){
				game.field[row][column] = game.symbols.walls.intersect
			}else if(row === game.game.tree.worldOptions.rows && column === 0){
				game.field[row][column] = game.symbols.walls.intersect
			}else if(row === 0 && column === game.game.tree.worldOptions.columns){
				game.field[row][column] = game.symbols.walls.intersect
			}else if(row === game.game.tree.worldOptions.rows && column === game.game.tree.worldOptions.columns){
				game.field[row][column] = game.symbols.walls.intersect
			}else if(row === 0 || row === game.game.tree.worldOptions.rows){
				game.field[row][column] = game.symbols.walls.wall
			}else if(column === 0 || column === game.game.tree.worldOptions.columns){
				game.field[row][column] = game.symbols.walls.wall
			}else{
				game.field[row][column] = game.symbols.space.empty
			}
		}
	}
	//Place snake head
	for(var snakeIndex = 0; snakeIndex < game.game.tree.snakeHeads.length; snakeIndex++){
		if(game.game.tree.snakeHeads[snakeIndex].row === -1 && game.game.tree.snakeHeads[snakeIndex].column === -1 ){
			game.field[Math.round(game.field.length/2) -1][Math.round(game.field[0].length/2) -1] = game.game.tree.snakeHeads[snakeIndex].snakeSymbol
		}else{
			game.field[game.game.tree.snakeHeads[snakeIndex].row][game.game.tree.snakeHeads[snakeIndex].column] = game.game.tree.snakeHeads[snakeIndex].snakeSymbol
		}
	}
	return game
}