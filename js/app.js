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
		var width = 10, height = 10;
		var gameBoard = new GameBoard(width, height, "#gameboard");
		var snake = new Snake(0, 0, "east");
		var tick = setInterval(function() {
			var state = new Array();
			for(var x = 0; x < width; x++) {
				state[x] = new Array();
				for(var y = 0; y < height; y++) {
					state[x][y] = 0;
				}
			}
			
			//Draw the snake
			snake.update(false);
			var segment = snake.head();
			
			if(segment.x >= width || segment.y >= height) {
				//Game over
				clearInterval(tick);
				gameOver();
				return;
			}
			
			do {
				state[segment.x][segment.y] = 1;
				segment = segment.next;
			} while (segment);
			
			//Add food
			
			
			
			gameBoard.render(state);
		}, 500);
    });
	
	function gameOver() {
		$("#gameboard").text("Game Over");
	}
});