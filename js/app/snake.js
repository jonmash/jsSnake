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

		this._head = null;
		this._tail = null;
		this._direction = dir.east;
		this._directionOnNextTick = dir.east;
		this.length = 0;

		this.direction(direction);
		this.append(x, y);
    }

	snake.prototype.direction = function( direction ) {
		if( direction === null ) {
			return this._direction;
		}

		if( !(direction in dir) ) {
			throw new Error("Invalid direction");
		}
		switch(this._direction) {
			case dir.north:
				if(direction == "south") {
					return;
				}
				break;
			case dir.east:
				if(direction == "west") {
					return;
				}
				break;
			case dir.south:
				if(direction == "north") {
					return;
				}
				break;
			case dir.west:
				if(direction == "east") {
					return;
				}
				break;
		}
		this._directionOnNextTick = dir[direction];
	}

	snake.prototype.update = function( fed ) {
		this._direction = this._directionOnNextTick;
		this.prepend(this._head.x+this._direction.x, this._head.y+this._direction.y);
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