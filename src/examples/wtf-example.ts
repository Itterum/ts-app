import {generateId} from '../utils/generatorId';

interface Entity {
    readonly id: string;
}

interface User extends Entity {
    name: string;
    email: string;
    password: string;
}

interface Car extends Entity {
    brand: string;
    model: string;
    year: number;
    color: string;
}

class BaseService<T extends Entity> {
    private entities: T[] = [];

    async create(entity: T): Promise<string> {
        this.entities.push(entity);
        return `Entity has been created.`;
    }

    async read(id: string): Promise<T | undefined> {
        return this.entities.find(entity => entity.id === id);
    }
}

class BaseController<T extends Entity> {
    private service: BaseService<T>;

    constructor(service: BaseService<T>) {
        this.service = service;
    }

    async create(entity: T): Promise<string> {
        return this.service?.create(entity);
    }

    async read(id: string): Promise<T | undefined> {
        return this.service?.read(id);
    }
}

const user1: User = {
    id: generateId(),
    name: 'John',
    email: 'john@example.com',
    password: 'passw0rd',
};

const car1: Car = {
    id: generateId(),
    brand: 'Toyota',
    model: 'Corolla',
    year: 2020,
    color: 'blue',
};

async function forUser() {
    class UserService extends BaseService<User> {
    }

    class UserController extends BaseController<User> {
    }

    const userService: UserService = new UserService();

    const userController: UserController = new UserController(userService);

    console.log(await userController.create(user1));
    const response = await userController.read(user1.id);

    console.log(response);
}

async function forCar() {
    class CarService extends BaseService<Car> {
    }

    class CarController extends BaseController<Car> {
    }

    const carService: CarService = new CarService();

    const carController: CarController = new CarController(carService);

    console.log(await carController.create(car1));
    console.log(await carController.read(car1.id));
}

(async () => {
    await forUser();
    await forCar();
})();
