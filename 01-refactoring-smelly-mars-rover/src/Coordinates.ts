export class Coordinates {
    private readonly x: number;
    private readonly y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    moveAlongY(displacement: number): Coordinates {
        return new Coordinates(this.x, this.y + displacement);
    }

    moveAlongX(displacement: number): Coordinates {
        return new Coordinates(this.x + displacement, this.y);
    }
}