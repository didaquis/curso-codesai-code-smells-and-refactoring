export abstract class Direction {

    private direction: string;

    protected constructor(direction: string) {
     this.direction = direction;
    }

    public isFacingNorth() {
        return this.direction === "N";
    }

    public isFacingSouth() {
        return this.direction === "S";
    }

    public isFacingWest() {
        return this.direction === "W";
    }

    static create(direction: string): Direction {
        if ( direction === "N") {
            return new NorthDirection();
        }
        if ( direction === "S") {
            return new SouthDirection();
        }
        if ( direction === "W") {
            return new WestDirection();
        }
        return new EastDirection();
    }

    abstract rotateLeft(): Direction
}

class NorthDirection extends Direction {

    constructor() {
        super("N");
    }

    rotateLeft(): Direction {
        return Direction.create("W");
    }
}

class SouthDirection extends Direction {

    constructor() {
        super("S");
    }


    rotateLeft(): Direction {
        return Direction.create("E");
    }
}

class WestDirection extends Direction {

    constructor() {
        super("W");
    }


    rotateLeft(): Direction {
        return Direction.create("S");
    }
}

class EastDirection extends Direction {

    constructor() {
        super("E");
    }


    rotateLeft(): Direction {
        return Direction.create("N");
    }
}