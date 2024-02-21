import {Coordinates} from "./Coordinates";

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

    abstract rotateRight(): Direction

    abstract move(displacement: number, coordinates: Coordinates): Coordinates
}

class NorthDirection extends Direction {

    constructor() {
        super("N");
    }

    rotateLeft(): Direction {
        return Direction.create("W");
    }

    rotateRight(): Direction {
        return Direction.create("E");
    }


    move(displacement: number, coordinates: Coordinates): Coordinates {
        return coordinates.moveAlongY(displacement);
    }
}

class SouthDirection extends Direction {

    constructor() {
        super("S");
    }


    rotateLeft(): Direction {
        return Direction.create("E");
    }


    rotateRight(): Direction {
        return Direction.create("W");
    }

    move(displacement: number, coordinates: Coordinates): Coordinates {
        return coordinates.moveAlongY(-displacement);
    }
}

class WestDirection extends Direction {

    constructor() {
        super("W");
    }


    rotateLeft(): Direction {
        return Direction.create("S");
    }


    rotateRight(): Direction {
        return Direction.create("N");
    }


    move(displacement: number, coordinates: Coordinates): Coordinates {
        return coordinates.moveAlongX(-displacement);
    }
}

class EastDirection extends Direction {

    constructor() {
        super("E");
    }


    rotateLeft(): Direction {
        return Direction.create("N");
    }


    rotateRight(): Direction {
        return Direction.create("S");
    }


    move(displacement: number, coordinates: Coordinates): Coordinates {
        return coordinates.moveAlongX(displacement);
    }
}