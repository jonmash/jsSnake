define(['app/snake-segment'], function (Segment) {
	var dir = {
		north: {x: 0, y: -1},
		east:  {x: 1, y: 0},
		south: {x: 0, y: 1},
		west:  {x: -1, y: 0}
	};
	
    function snake(x, y, direction) {
		
		x = parseInt(x);
		y = parseInt(y);
		
		direction = direction || "east";
		if( !(direction in dir) ) {
			throw new Error("Invalid direction");
		}
		
		this._head = null;
		this._tail = null;
		this.direction = dir.east;
		this.length = 0;
		
		this.append(x || 0, y || 0);
    }

	snake.prototype.update = function( fed ) {
		this.prepend(this._head.x+this.direction.x, this._head.y+this.direction.y);
		if( !(fed === true) ) {
			this._tail.remove();
		}
	}
	
	snake.prototype.append = function (x, y) {
		var segment = new Segment(this, x, y);

		if (this.length === 0) {//Empty
			this._head = segment;
			this._tail = segment;
		} else {
			this._tail.next = segment;
			segment.prev = this._tail;
			this._tail = segment;
		}

		this.length++;

		return segment;
	};

	snake.prototype.prepend = function (x, y) {
		var node = new Segment(this, x, y);

		if (this._head === null) {
			return this.append(x, y);
		} else {
			this._head.prev = node;
			node.next = this._head;
			this._head = node;
		}

		this._length++;

		return node;
	};
	
	snake.prototype.head = function () {
		return this._head;
	}
	snake.prototype.tail = function () {
		return this._tail;
	}

    return snake;
});