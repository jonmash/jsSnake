define(['jquery'], function ($) {
    function gameBoard(width, height, container) {
        this.width = width;
		this.height = height;
		this.container = $(container);
		this.build();
    }

    gameBoard.prototype.render = function(state) {
		for(var y = 0; y < this.height; y++) {
			for(var x = 0; x < this.width; x++) {
				var pixel = $("#"+("x"+x+"y"+y));
				
				pixel.removeClass("pixel-clear").removeClass("pixel-snake").removeClass("pixel-food");
				switch(state[x][y]) {
				case 0: //Clear
					pixel.addClass("pixel-clear");
					break;
				case 1: //Snake
					pixel.addClass("pixel-snake");
					break;
				case 2: //Food
					pixel.addClass("pixel-food");
					break;
				}
			}
		}
	}
	
    gameBoard.prototype.build = function() {
		for(var y = 0; y < this.height; y++) {
			for(var x = 0; x < this.width; x++) {
				var pixel = $("<div>")
				  .addClass("pixel")
				  .attr("id", ("x"+x+"y"+y));
				
				this.container.append(pixel);
			}
			var clear = $("<div>")
			  .addClass("clear")
			
			this.container.append(clear);
		}
	}	

    return gameBoard;
});