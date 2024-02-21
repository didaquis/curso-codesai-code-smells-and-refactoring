import {Direction} from './Direction'
import {Coordinates} from "./Coordinates";

export class Rover {

    private direction: Direction;
    private coordinates: Coordinates;

    constructor(x: number, y: number, direction: string) {
        this.coordinates = new Coordinates(x, y);
        this.direction = Direction.create(direction);
    }

    private displacement = 1;

    public receive(commandsSequence: string) {
        this.executeCommands(this.extractCommands(commandsSequence));
    }

    private executeCommands(commands: string[]) {
        commands.forEach((command) => {
            this.executeCommand(command);
        });
    }

    private extractCommands(commandsSequence: string): string[] {
        const commands: string[] = [];
        for (let i = 0; i < commandsSequence.length; ++i) {
            const command = commandsSequence.substring(i, i + 1);
            commands.push(command);
        }
        return commands;
    }

    private executeCommand(command: string) {
        if (command === "l") {
            this.direction = this.direction.rotateLeft();
        } else if (command === "r") {
            this.direction = this.direction.rotateRight();
        } else if (command === "f") {
            this.coordinates = this.direction.move(this.displacement, this.coordinates);
        } else {
            this.coordinates = this.direction.move(-this.displacement, this.coordinates);
        }
    }
}