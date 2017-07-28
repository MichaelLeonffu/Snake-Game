var exports = module.exports = {}

var snake = require('./../../snake.js')

//var symbols = snake.symbols

//field,oldApple = {appleRow: 2, appleColumn: 2}

exports.generateApple = function(game){
	var symbols = game.symbols
	var oldApple = {}
		if(game.situation !== 'init'){
		oldApple.appleRow = game.snake.headPOS.row
		oldApple.appleColumn = game.snake.headPOS.Column
		var apple = false

		//Find a home for apple!
		findAppleHome:
		for (var row = oldApple.appleRow; row+1 > 0; row--) {
			findAppleColumn:
			for (var column = oldApple.appleColumn; column+1 > 0; column--) {
				for(borders in symbols.borders){
					if(game.field[row][column] === symbols.borders[borders]){
						break findAppleColumn
					}
				}
				if(game.field[row][column] !== symbols.snake.snakeTail && game.field[row][column] !== symbols.snake.snakeHead){
					game.field[row][column] = symbols.apple
					apple = true
					break findAppleHome
				}
			}
		}

		//If apple didn't find a home...
		findAppleHome:
		if(!apple){
			for (var row = game.field.length-1; row+1 > oldApple.appleRow; row--) {
				findAppleColumn:
				for (var column = game.field[row].length-1; column+1 > oldApple.appleColumn; column--) {
					for(borders in symbols.borders){
						if(game.field[row][column] === symbols.borders[borders]){
							break findAppleColumn
						}
					}
					if(game.field[row][column] !== symbols.snake.snakeTail && game.field[row][column] !== symbols.snake.snakeHead){
						game.field[row][column] = symbols.apple
						apple = true
						break findAppleHome
					}
				}
			}
		}
	}else{
		var validAppleSpwn = false
		var row = 0, 
			column = 0
		var onBorders = false
		while(!validAppleSpwn){
			onBorders = false
			row = Math.floor(Math.random()*game.field.length)
			column = Math.floor(Math.random()*game.field[0].length)
			for(borders in symbols.borders){
				if(game.field[row][column] === symbols.borders[borders]){
					onBorders = true
				}
			}
			if(row !== Math.round(game.field.length/2) -1 && column !== Math.round(game.field[0].length/2) -1 && !onBorders){validAppleSpwn = true}
		}
		game.field[row][column] = symbols.apple
		apple = true
	}

	//Apple is very sad....
	if(!apple){
		game.field[0][0] = symbols.apple
	}

	return game
}
	/*
	var apple = {
		appleRow: -1,
		appleColumn: -1
	}

	//Find a home for apple!
	findAppleHome:
	for (var row = oldApple.appleRow; row+1 > 0; row--) {
		findAppleColumn:
		for (var column = oldApple.appleColumn; column+1 > 0; column--) {
			for(borders in symbols.borders){
				if(game.field[row][column] === symbols.borders[borders]){
					break findAppleColumn
				}
			}
			if(game.field[row][column] !== symbols.snake.snakeTail && game.field[row][column] !== symbols.snake.snakeHead){
				apple.appleRow = row
				apple.appleColumn = column
				break findAppleHome
			}
		}
	}

	//If apple didn't find a home...
	findAppleHome:
	if(apple.appleRow === -1 || apple.appleColumn === -1){
		for (var row = game.field.length-1; row+1 > oldApple.appleRow; row--) {
			findAppleColumn:
			for (var column = game.field[row].length-1; column+1 > oldApple.appleColumn; column--) {
				for(borders in symbols.borders){
					if(game.field[row][column] === symbols.borders[borders]){
						break findAppleColumn
					}
				}
				if(game.field[row][column] !== symbols.snake.snakeTail && game.field[row][column] !== symbols.snake.snakeHead){
					apple.appleRow = row
					apple.appleColumn = column
					break findAppleHome
				}
			}
		}
	}

	//Apple is very sad....
	if(apple.appleRow === -1 || apple.appleColumn === -1){
		apple.appleRow = 2
		apple.appleColumn = 2
	}
	*/
