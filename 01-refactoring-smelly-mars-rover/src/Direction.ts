export class Direction {

    private direction: string;

    constructor(direction: string) {
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
}