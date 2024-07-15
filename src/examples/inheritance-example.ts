type Point = {
    x: number
    y: number
}

export class Coordinates {
    constructor(public coordinates: Point) {
    }

    updateCoordinates(coordinates: Point): void {
        if (!coordinates) {
            throw new Error('Invalid coordinates format');
        }

        this.coordinates.x = coordinates.x;
        this.coordinates.y = coordinates.y;
    }

    toString(): string {
        return JSON.stringify(this.coordinates);
    }
}

interface IVehicle {
    name: string;
    color: string;
    speed: number;
    coordinates: Coordinates;

    move(coordinates: Point): string;

    getCoordinates(): string;
}

class BaseVehicle implements IVehicle {
    constructor(
        public name: string,
        public color: string,
        public speed: number,
        public coordinates: Coordinates,
    ) {
    }

    move(coordinates: Point): string {
        if (!coordinates) {
            throw new Error('Invalid coordinates format');
        }

        this.coordinates.updateCoordinates(coordinates);

        return `${this.name} move to coordinates ${this.coordinates}.`;
    }

    getCoordinates(): string {
        if (!this.coordinates) {
            throw new Error('Coordinates are not available');
        }

        return `${this.name} current coordinates ${this.coordinates}.`;
    }
}

export class Car extends BaseVehicle {
}

export class Truck extends BaseVehicle {
}

(() => {
    const carCoordinates = new Coordinates({x: 34, y: 25});
    const car = new Car('Toyota', 'red', 100, carCoordinates);

    console.log(car.getCoordinates());
    console.log(car.move({x: 12, y: 54}));

    const truckCoordinates = new Coordinates({x: 56, y: 12});
    const truck = new Truck('Volvo', 'blue', 200, truckCoordinates);

    console.log(truck.getCoordinates());
    console.log(truck.move({x: 42, y: 100}));
})();

/*
Example for use

const carCoordinates = new Coordinates({ x: 34, y: 25 })
const car = new Car('Toyota', 'red', 100, carCoordinates)

console.log(car.getCoordinates())
console.log(car.move({ x: 12, y: 54 }))

const truckCoordinates = new Coordinates({ x: 56, y: 12 })
const truck = new Truck('Volvo', 'blue', 200, truckCoordinates)

console.log(truck.getCoordinates())
console.log(truck.move({ x: 42, y: 100 }))
*/