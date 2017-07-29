var stdin = process.openStdin();

// stdin.addListener("data", function(d) {
// 	// note:  d is an object, and when converted to a string it will
// 	// end with a linefeed.  so we (rather crudely) account for that  
// 	// with toString() and then trim()
// 	process.stdout.write('\033c') 
// 	console.log(d)
// 	console.log("you entered: [" + d.toString().trim() + "]");
// });

//Graphics! : D

/*
 Will bring back once a better print is created.
borders:{
	leftRight: '\033[0m┃',
	upDown: '\033[0m━',
	topRight: '\033[0m┓',
	bottomRight: '\033[0m┛',
	topLeft: '\033[0m┏',
	bottomLeft: '\033[0m┗'
}
*/

var appleBasket = require('./appleBasket/appleBasket.js')

var symbols = {
	borders:{
		leftRight: '\033[0m|',
		upDown: '\033[0m=',
		topRight: '\033[0m=',
		bottomRight: '\033[0m=',
		topLeft: '\033[0m=',
		bottomLeft: '\033[0m='
	},
	blankSpace: '\033[0;30m+',
	placeholder:'\033[0;40m█',
	apple: '\033[0;31m',
	snakeHead: '\033[0m@',
	snakeTail: '\033[0mO'
}

var exports = module.exports = {}
exports.symbols = symbols

//Though this is never used.
var snakeDirections = {
	up: 1,
	down: 2,
	left: 3,
	right: 4
}

var snake = {
	headPOS: {
		row: -1,
		column: -1
	},
	tail: [1],
	occupying: 'blankSpace'
}

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

function snakeGame(){
	var game = {}
	game.symbols = symbols
	var gameIsRunning = true
	//Game init:
	gameSituation(game,'init')
	game.field = generateEmptyField(15,15)
	game = generateApple(game)
	game.snake = snake
	while(gameIsRunning){
		snake = snakeController(game.field,snake, bruteSnake(game))
		game.snake = snake
		game.field = updateSnakeField(game.field,game.snake)
		game = gameSituation(game)
		game = generateApple(game)
		tablePrinter(game.field)
		wait(50)
		//gameIsRunning = false
		if(game.situation === 'dead'){
			gameIsRunning = false
		}
	}
	console.log('done')

}

snakeGame()
//tablePrinter(field)


//snake = snakeController(field,snake,4)
//field = updateSnakeField(field,snake)
//tablePrinter(field)

function bruteSnake(game){
var field = game.field
var snake = game.snake

	var randomDirection = 0
	randomDirection = Math.floor(Math.random()*4)+1
	searching = true
	var been1 = false,
		been2 = false,
		been3 = false,
		been4 = false
	while(searching){
		if(snake.headPOS.row !== -1 && snake.headPOS.column !== -1){
			if(randomDirection === 1){been1 = true}
			if(randomDirection === 2){been2 = true}
			if(randomDirection === 3){been3 = true}
			if(randomDirection === 4){been4 = true}
			if(
				(field[snake.headPOS.row][snake.headPOS.column+1] === symbols.snakeTail && randomDirection === 4) ||
				(field[snake.headPOS.row][snake.headPOS.column-1] === symbols.snakeTail && randomDirection === 3) ||
				(field[snake.headPOS.row+1][snake.headPOS.column] === symbols.snakeTail && randomDirection === 2) ||
				(field[snake.headPOS.row-1][snake.headPOS.column] === symbols.snakeTail && randomDirection === 1) ||
				(field[snake.headPOS.row][snake.headPOS.column+1] === symbols.borders.leftRight && randomDirection === 4) ||
				(field[snake.headPOS.row][snake.headPOS.column-1] === symbols.borders.leftRight && randomDirection === 3) ||
				(field[snake.headPOS.row+1][snake.headPOS.column] === symbols.borders.upDown && randomDirection === 2) ||
				(field[snake.headPOS.row-1][snake.headPOS.column] === symbols.borders.upDown && randomDirection === 1)
				){
				randomDirection = Math.floor(Math.random()*4)+1
			}else{
				searching = false
			}
			if(been1&&been2&&been3&&been4){
				searching = false
			}
		}else{
			searching = false
		}
	}
	return randomDirection
}


function tablePrinter(table){
	process.stdout.write('\033c')
	var printableTable = []
	for (var row = 0; row < table.length; row++) {
		printableTable[row] = ''
		for (var column = 0; column < table[row].length; column++) {
			printableTable[row] += table[row][column]
			if(column !== table[row].length-1){printableTable[row] += ' '}
		}
		console.log(printableTable[row])
	}
}


//TODO: Make a more effetive print (which doesnt need to refresh whole screen to move worm low proiorty)

function tablePrinterDelay(table,delay = 0){
	process.stdout.write('\033c')
	var printableTable = []
	for (var row = 0; row < table.length; row++) {
		printableTable[row] = ''
		for (var column = 0; column < table[row].length; column++) {
			printableTable[row] += table[row][column]
			if(column !== table[row].length-1){printableTable[row] += ' '}

			if(delay !== 0){wait(delay)}
			process.stdout.write('\033c')
			for (var rowPrint = 0; rowPrint < printableTable.length; rowPrint++) {
				console.log(printableTable[rowPrint])
			}
		}
	}
}

function tablePrinterCursor(table,delay = 0){
	process.stdout.write('\033c')
	var printableTable = []
	for (var row = 0; row < table.length; row++) {
		printableTable[row] = ''
		for (var column = 0; column < table[row].length; column++) {
			printableTable[row] += table[row][column]
			if(delay !== 0){wait(delay)}
			process.stdout.write('\033[' + (row+1) + ';' + (column*2+1) + 'H' + table[row][column])
		}
	}
}

//Export Stuff




