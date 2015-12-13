define(function () {

    function Segment(list, x, y) {
        this.list = list; 
		this.x = x;
		this.y = y;
		this.next = null;
		this.prev = null;
    }

	Segment.prototype.remove = function() {
		if (this.prev !== null) {
          this.prev.next = this.next;
        }

        if (this.next !== null) {
          this.next.prev = this.prev;
        }

        if (this.list._head === this) {
          this.list._head = this.next;
        }

        if (this.list._tail === this) {
          this.list._tail = this.prev;
        }

        this.list.length--;
	};
	
	Segment.prototype.prepend = function(x, y) {
        if (this.list._head === this) {
          return this.list.prepend(x, y);
        }

        var newSegment = new Segment(x, y);
        newSegment.prev = this.prev;
        newSegment.next = this;
        this.prev.next = newSegment;
        this.prev = newSegment;

        this.list.length++;
        return newSegment;
	};

	Segment.prototype.append = function(x, y) {
        if (this.list._tail === this) {
          return this.list.append(x, y);
        }

        var newSegment = new Segment(x, y);
        newSegment.prev = this;
        newSegment.next = this.next;
        this.next.prev = newSegment;
        this.next = newSegment;

        this.list._length++;
        return newSegment;
	};
	
    return Segment;
});