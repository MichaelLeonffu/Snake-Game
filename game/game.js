var stdin = process.openStdin();

// var appleBasket = require('./appleBasket/appleBasket.js')

// var exports = module.exports = {}
//exports.symbols = symbols

function wait(timeInMilli){
	var duration = Math.abs(timeInMilli)
	var startTime = new Date()
	var currentTime = 0
	while(currentTime - startTime <= duration){currentTime = new Date()}
}








function generateEmptyField(height,width){
	var table = []
	for (var row = 0; row <= height; row++) {
		table[row] = []
		for (var column = 0; column <= width; column++) {
			if(row === 0 && column === 0){
				table[row][column] = symbols.borders.topLeft
			}else if(row === height && column === 0){
				table[row][column] = symbols.borders.bottomLeft
			}else if(row === 0 && column === width){
				table[row][column] = symbols.borders.topRight
			}else if(row === height && column === width){
				table[row][column] = symbols.borders.bottomRight
			}else if(row === 0 || row === height){
				table[row][column] = symbols.borders.upDown
			}else if(column === 0 || column === width){
				table[row][column] = symbols.borders.leftRight
			}else{
				table[row][column] = symbols.blankSpace
			}
		}
	}
	return table
}

function print(input,print = true){
	if(print){console.log(input)}
}

function snakeController(field,snake,direction = 0,apple = false){
	var backwards = false

	//init snake
	if(snake.headPOS.row === -1 && snake.headPOS.column === -1 ){
		//-1 is because the walls count as a row and column
		snake.headPOS.row = Math.round(field.length/2) -1
		snake.headPOS.column = Math.round(field[0].length/2) -1
	}

	switch (direction) {
		case 1:
			if(2 === snake.tail[0]){
				backwards = true				
				break
			}
			snake.headPOS.row -= 1
			break
		case 2:
			if(1 === snake.tail[0]){
				backwards = true
				break
			}
			snake.headPOS.row += 1
			break
		case 3:
			if(4 === snake.tail[0]){
				backwards = true
				break
			}
			snake.headPOS.column -= 1
			break
		case 4:
			if(3 === snake.tail[0]){
				backwards = true
				break
			}
			snake.headPOS.column += 1
			break
		default:
			console.log('NO VAILD DIRECTION')
	}

	//update snake if it didn't go backwards
	if(backwards === false){
		snake.occupying = field[snake.headPOS.row][snake.headPOS.column]
		snake.tail.unshift(direction)
		if(apple === false){snake.tail.pop()}
	}
	return snake
}

function updateSnakeField(field,snake){
	var updatedSnakeField = field
	var tailRow = snake.headPOS.row,
		tailColumn = snake.headPOS.column,
		finalTailRow = snake.headPOS.row,
		finalTailColumn = snake.headPOS.column
	for (var segment = 0; segment < snake.tail.length; segment++) {
		if(snake.tail[segment] === 1 || snake.tail[segment] === 2){finalTailRow += snake.tail[segment] === 1 ? 1 : -1}
		if(snake.tail[segment] === 3 || snake.tail[segment] === 4){finalTailColumn += snake.tail[segment] === 3 ? 1 : -1}
	}
	//Clean this; clears all things around last tail bit.
	updatedSnakeField = fieldEditor(updatedSnakeField,finalTailRow+1,finalTailColumn,symbols.blankSpace,symbols.snakeTail)
	updatedSnakeField = fieldEditor(updatedSnakeField,finalTailRow-1,finalTailColumn,symbols.blankSpace,symbols.snakeTail)
	updatedSnakeField = fieldEditor(updatedSnakeField,finalTailRow,finalTailColumn+1,symbols.blankSpace,symbols.snakeTail)
	updatedSnakeField = fieldEditor(updatedSnakeField,finalTailRow,finalTailColumn-1,symbols.blankSpace,symbols.snakeTail)

	for (var segment = 0; segment < snake.tail.length; segment++) {
		if(snake.tail[segment] === 1 || snake.tail[segment] === 2){tailRow += snake.tail[segment] === 1 ? 1 : -1}
		if(snake.tail[segment] === 3 || snake.tail[segment] === 4){tailColumn += snake.tail[segment] === 3 ? 1 : -1}
		updatedSnakeField = fieldEditor(updatedSnakeField,tailRow,tailColumn,symbols.snakeTail)
	}

	updatedSnakeField = fieldEditor(field,snake.headPOS.row,snake.headPOS.column,symbols.snakeHead)

	//fieldEditor(field,snake.headPOS.row + snake.tail[0] === 1 ? 1 : -1,snake.headPOS.column + snake.tail[0] === 3 ? 1 : -1,symbols.snakeTail)

	return updatedSnakeField
}

function gameSituation(game,situation = 'alive'){

	if(situation !== 'init'){
		//If snake is touching any of the borders
		for(borders in symbols.borders){
			if(game.snake.occupying === symbols.borders[borders]){
				situation = 'dead'
				break
			}
		}
		//If snake is touching snake tail
		if(game.snake.occupying === symbols.snakeTail){situation = 'dead'}

		if(game.snake.occupying === symbols.apple){
			situation = 'apple'
			console.log('GOT APPLE!')
			wait(1000)
		}
	}
	
	game.situation = situation

	return game//alive or dead or apple
	//return snake.occupying === symbols.borders.upDown || snake.occupying === symbols.borders.leftRight || snake.occupying === symbols.snakeTail ? 'dead' : 'alive' //alive or dead
}

	//Maybe make this use paramters as a single json or seomthing?
function fieldEditor(field,row,column,changeTo,changeFrom = 'DEFAULT'){
	try{
		if(field[row][column] == changeFrom || changeFrom == 'DEFAULT'){ field[row][column] = changeTo }
	}catch(err){
		console.log('row',row)
		console.log('column',column)
		wait(1000)
	}
	//if(field[row][column] == changeFrom || changeFrom == 'DEFAULT'){ field[row][column] = changeTo }
	return field
}

function generateApple(game){
	if(game.situation === 'apple' || game.situation === 'init'){
		game = appleBasket.basicAppleLeftApple(game)
	}
	return game
}


//GAME

	//Clears Screen 
	process.stdout.write('\033c')
	//Game Init
	console.log('----GAME INIT----')

	wait(1000)
	//Clears Screen 
	process.stdout.write('\033c')
	//Game Run
	gamePrinter(game,graphics)



//Printing
graphics = {
	walls: {
		LURD: '\033[0;30m+',
		LUR: '\033[0mi',
		LUD: '\033[0mi',
		LRD: '\033[0mi',
		URD: '\033[0mi',
		LU: '\033[0m┛',
		LD: '\033[0m┓',
		RD: '\033[0m┏',
		UR: '\033[0m┗',
		LR: '\033[0m━',
		UD: '\033[0m┃'
	},
	snake: {
		head: '\033[0m@',
		tail: '\033[0mO'
	},
	apple: '\033[0;31m',
	space: {
		blank: '\033[0;40m█',
		empty: '\033[0;30m+'
	}
}


function gamePrinter(game,graphics){
	//On start up creates oldField
	if(game.game.situation === 'init'){game.oldField = []}
	for (var row = 0; row < game.field.length; row++) {
		//Checks if row is undefined; adds row.
		if(!game.oldField[row]){game.oldField[row] = []}
		for (var column = 0; column < game.field[row].length; column++) {
			//Updates the cell if any changes
			if(game.oldField[row][column] !== game.field[row][column]){
				process.stdout.write('\033[' + (row+1) + ';' + (column*2+1) + 'H' + game.field[row][column])
			}
		}
	}
	game.oldField = game.field
}
