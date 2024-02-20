export class Coordinates {
    private x: number;
    private y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;

    }

    public getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }
}