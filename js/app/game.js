define(['jquery', 'app/gameboard', 'app/snake', 'bootstrap'], function ($, GameBoard, Snake) {

	function Game(width, height, tickRate, container) {
		this.width = width, this.height = height;
		this.container = $(container);
		this.gameBoard = new GameBoard(this.width, this.height, this.container);
		this.snake = new Snake(0, 0, "east");
		this.tick_rate = tickRate; //ms
		this.food = null;
		this.state = clearState(this.width, this.height);

		this.tick = setInterval(this.task_tick.bind(this), this.tick_rate);
		this.initKeyHandler();
	}

	Game.prototype.task_tick  = function() {

		var head = this.snake.head();

		//Update the snake
		if( this.food && (head.x == this.food.x && head.y == this.food.y) ) {
			this.snake.update(true);
			this.food = null;
		} else {
			this.snake.update(false);
		}

		head = this.snake.head();

		//Check if we hit the border
		if( head.x >= this.width || head.y >= this.height || head.x < 0 || head.y < 0 ) {
			//Game over
			this.gameOver();
			return;
		}

		//Check if we bit into the snake
		if( this.state[head.x][head.y] == 1 ) {
			//Game over
			this.gameOver();
			return;
		}

		var newState = clearState(this.width, this.height);

		if( this.food ) {
			newState[this.food.x][this.food.y] = 2;
		}

		var segment = head;
		do { //Iterate over the entire snake
			newState[segment.x][segment.y] = 1;
			segment = segment.next;
		} while (segment);

		//Add food
		if( !this.food ) {
			do {
				randomX = Math.floor(Math.random()*this.width);
				randomY = Math.floor(Math.random()*this.height);
			} while (newState[randomX][randomY] == 1);
			this.food = {x: randomX, y: randomY};
		}

		this.state = newState;
		this.gameBoard.render(this.state);
	}

	Game.prototype.initKeyHandler = function () {
		$(document).keydown(function(e) {
			switch(e.which) {
				case 37: // left
					this.snake.direction("west");
					break;
				case 38: // up
					this.snake.direction("north");
					break;
				case 39: // right
					this.snake.direction("east");
					break;
				case 40: // down
					this.snake.direction("south");
					break;
				default: return; // exit this handler for other keys
			}
			e.preventDefault(); // prevent the default action (scroll / move caret)
		}.bind(this));
	}

	function clearState(width, height) {
		var newState = new Array();
		for(var x = 0; x < width; x++) {
			newState[x] = new Array();
			for(var y = 0; y < height; y++) {
				newState[x][y] = 0;
			}
		}
		return newState;
	}

	Game.prototype.gameOver = function() {
		clearInterval(this.tick);
		this.container.text("Game Over");
	}
	
    return Game;
});