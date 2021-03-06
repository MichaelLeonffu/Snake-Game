//This is what the game json will look like and how it will be developed:


game = {
	symbols: {
		walls: {
			wall: 'w',
			intersect: 'i'
		},
		snake: {
			head: 'h',
			tail: 't'
		},
		apple: 'a',
		space: {
			blank: 'b',
			empty: 'e'
		}
	},
	field: [
		['','',''],
		['','',''],
		['','','']
	],
	//Print will add/use this exclusively.
	oldField: [
		['','',''],
		['','',''],
		['','','']
	],
	snakes: [
		{
			name: '',
			head: {
				row: 123,
				column: 123
			},
			tail: [1,2,3,4],
			occupying: '',
			situation: '',
			stats: {
				moves: 123,
				apples: 123,
				movesFromLastapple: 123
			}
		}
	],
	apples: [
		{
			name: '',
			number: 123,
			pos: {
				row: 123,
				column: 123
			}
		}
	],
	stats: {
		moves: 123,
		totalApplesGenerated: 123,
		totalApplesCollected: 123
	},
	game: {
		tree: {
			apple: '',
			world: '',
			worldOptions: {
				rows: 123,
				columns: 123
			},
			snakeHeads: [
				{
					snakeName: '',
					row: 123,
					column: 123,
					snakeSymbol: ''
				}
			]
		},
		seeds: {
			apple: '',
			world: ''
		},
		situation: '',
		snakeCount: 123
	}
}

//Graphics
graphics: {
	walls: {
		LURD: '',
		LUR: '',
		LUD: '',
		LRD: '',
		URD: '',
		LU: '',
		LD: '',
		RD: '',
		UR: '',
		LR: '',
		UD: ''
	},
	snake: {
		head: '',
		tail: ''
	},
	apple: '',
	space: {
		blank: '',
		empty: ''
	}
}