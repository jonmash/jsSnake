requirejs.config({
	baseUrl: 'js',
	paths: {
		jquery: 'vendor/jquery-1.11.2.min',
		bootstrap: 'vendor/bootstrap.min'
	},
	shim : {
		bootstrap : { deps: ['jquery'] }
	}
});
require(['jquery', 'app/gameboard', 'app/snake', 'bootstrap'], function($, GameBoard, Snake){
	$(function() {//domReady
		initGame();
    });

	function initGame() {
		this.width = 10, this.height = 10;
		this.gameBoard = new GameBoard(width, height, "#gameboard");
		this.snake = new Snake(0, 0, "east");
		this.tick_rate = 500; //ms
		this.food = null;
		this.state = clearState(this.width, this.height);

		this.tick = setInterval(task_tick.bind(this), this.tick_rate);
		(initKeyHandler.bind(this))();
	}

	function task_tick () {

		var head = this.snake.head();

		//Update the snake
		if( food && (head.x == this.food.x && head.y == this.food.y) ) {
			this.snake.update(true);
			this.food = null;
		} else {
			this.snake.update(false);
		}

		head = this.snake.head();

		//Check if we hit the border
		if( head.x >= this.width || head.y >= this.height || head.x < 0 || head.y < 0 ) {
			//Game over
			(gameOver.bind(this))();
			return;
		}

		//Check if we bit into the snake
		if( this.state[head.x][head.y] == 1 ) {
			//Game over
			(gameOver.bind(this))();
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
			food = {x: randomX, y: randomY};
		}

		this.state = newState;
		this.gameBoard.render(this.state);
	}

	function initKeyHandler() {
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

	function gameOver() {
		clearInterval(this.tick);
		$("#gameboard").text("Game Over");
	}
});