var stdin = process.openStdin();

stdin.addListener("data", function(d) {
	// note:  d is an object, and when converted to a string it will
	// end with a linefeed.  so we (rather crudely) account for that  
	// with toString() and then trim()
	process.stdout.write('\033c') 
	console.log(d)
	console.log("you entered: [" + d.toString().trim() + "]");
});

function generateEmptyField(hieght,width){
	var table = []
	for (var row = 0; row <= hieght; row++) {
		table[row] = []
		for (var column = 0; column <= width * 2; column++) {
			if(row == 0 || row == hieght){
				table[row][column] = '='
			}else if(column == 0 || column == width * 2){
				table[row][column] = '|'
			}else{
				table[row][column] = column%2 ? ' ' : '+'
			}
		}
	}
	return table
}

	//Maybe make this use paramters as a single json or seomthing?
function fieldEditor(field,row,column,changeTo,changeFrom = 'DEFAULT'){
	if(field[row][column*2] == changeFrom || changeFrom == 'DEFAULT'){ field[row][column*2] = changeTo }
	return field
}

generatedTable = generateEmptyField(55,55)
tablePrinter(generatedTable)

generatedTable = fieldEditor(generatedTable, 41, 40, '1')

tablePrinter(generatedTable)

function tablePrinter(table){
	var printableTable = []
	for (var row = 0; row < table.length; row++) {
		printableTable[row] = ''
		for (var column = 0; column < table[row].length; column++) {
			table[row][column]
			printableTable[row] += table[row][column]
		}
		console.log(printableTable[row])
	}

}
