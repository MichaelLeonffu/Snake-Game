var stdin = process.openStdin();

stdin.addListener("data", function(d) {
	// note:  d is an object, and when converted to a string it will
	// end with a linefeed.  so we (rather crudely) account for that  
	// with toString() and then trim()
	process.stdout.write('\033c') 
	console.log(d)
	console.log("you entered: [" + d.toString().trim() + "]");
});

var symbols = {
	borders:{
		leftRight: '\033[0m|',
		upDown: '\033[0m='
	},
	blankSpace: '\033[0;31m+',
	apple: '\033[0ma',
	snakeHead: '\033[0m@',
	snakeTail: '\033[0mO'
}
var directions = {
	up: 1,
	down: 2,
	left: 3,
	right: 4
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
			if(row === 0 || row === height){
				table[row][column] = symbols.borders.upDown
			}else if(column === 0 || column === width){
				table[row][column] = symbols.borders.leftRight
			}else if(column === Math.round(width/2) && row === Math.round(height/2)){
				table[row][column] = symbols.snakeHead
			}else{
				table[row][column] = symbols.blankSpace
			}
		}
	}
	return table
}

function snakeController(field,snake,direction){
	const DEFAULTCORDS = {
		row: 0,
		column: 0
	}
	var snake = {
		headPOS: DEFAULTCORDS,
		tailPOS: DEFAULTCORDS
	}
	findingSnakeHead:
	for (var row = 0; row <= field.length; row++) {
		for (var column = 0; column <= field[row].length; column++) {
			if(symbols.snakeHead == field[row][column]){
				snake.headPOS.row = row
				snake.tailPOS.column = column
				break findingSnakeHead
			}
		}
	}
}


	//Maybe make this use paramters as a single json or seomthing?
function fieldEditor(field,row,column,changeTo,changeFrom = 'DEFAULT'){
	if(field[row][column] == changeFrom || changeFrom == 'DEFAULT'){ field[row][column] = changeTo }
	return field
}

generatedTable = generateEmptyField(55,55)

//tablePrinterDelay(generatedTable,1)
tablePrinterCursor(generatedTable,1)

// generatedTable = fieldEditor(generatedTable, 41, 40, symbols.snakeHead)
// generatedTable = fieldEditor(generatedTable, 40, 40, symbols.snakeTail)

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
			//process.stdout.write('\033c')
		}
	}
}