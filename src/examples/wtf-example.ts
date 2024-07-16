import {generateId} from '../utils/generatorId';
import bcrypt from 'bcrypt';

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

interface IBaseService<T extends Entity> {
    create(entity: T): Promise<string>;

    read(id: string): Promise<T | undefined>;

    update(id: string, entity: Partial<T>): Promise<string>;

    delete(id: string): Promise<string>;
}

class BaseService<T extends Entity> implements IBaseService<T> {
    private entities: Map<string, T> = new Map();

    async create(entity: T): Promise<string> {
        if (!entity.id) {
            throw new Error('Entity must have an id');
        }
        this.entities.set(entity.id, entity);
        return `Entity with id ${entity.id} has been created.`;
    }

    async read(id: string): Promise<T | undefined> {
        return this.entities.get(id);
    }

    async update(id: string, updatedFields: Partial<T>): Promise<string> {
        const entity = this.entities.get(id);
        if (!entity) {
            throw new Error(`Entity with id ${id} not found`);
        }
        this.entities.set(id, {...entity, ...updatedFields});
        return `Entity with id ${id} has been updated.`;
    }

    async delete(id: string): Promise<string> {
        if (!this.entities.has(id)) {
            throw new Error(`Entity with id ${id} not found`);
        }
        this.entities.delete(id);
        return `Entity with id ${id} has been deleted.`;
    }
}

interface IBaseController<T extends Entity> {
    create(entity: T): Promise<string>;

    read(id: string): Promise<T | undefined>;

    update(id: string, entity: Partial<T>): Promise<string>;

    delete(id: string): Promise<string>;
}

class BaseController<T extends Entity> implements IBaseController<T> {
    protected service: IBaseService<T>;

    constructor(service: IBaseService<T>) {
        this.service = service;
    }

    async create(entity: T): Promise<string> {
        try {
            return await this.service.create(entity);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Failed to create entity: ${error.message}`);
            }

            throw new Error(`Failed to create entity: ${String(error)}`);
        }
    }

    async read(id: string): Promise<T | undefined> {
        try {
            return await this.service.read(id);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Failed to read entity: ${error.message}`);
            }

            throw new Error(`Failed to read entity: ${String(error)}`);
        }
    }

    async update(id: string, updatedFields: Partial<T>): Promise<string> {
        try {
            return await this.service.update(id, updatedFields);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Failed to update entity: ${error.message}`);
            }

            throw new Error(`Failed to update entity: ${String(error)}`);
        }
    }

    async delete(id: string): Promise<string> {
        try {
            return await this.service.delete(id);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Failed to delete entity: ${error.message}`);
            }

            throw new Error(`Failed to delete entity: ${String(error)}`);
        }
    }
}

class UserService extends BaseService<User> {
    async create(user: User): Promise<string> {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return super.create({...user, password: hashedPassword});
    }
}

class UserController extends BaseController<User> {
}

class CarService extends BaseService<Car> {
}

class CarController extends BaseController<Car> {
}

(async () => {
    const userService = new UserService();
    const userController = new UserController(userService);

    const carService = new CarService();
    const carController = new CarController(carService);

    const user: User = {
        id: generateId(),
        name: 'John',
        email: 'john@example.com',
        password: 'passw0rd',
    };

    const car: Car = {
        id: generateId(),
        brand: 'Toyota',
        model: 'Corolla',
        year: 2020,
        color: 'blue',
    };

    try {
        console.log(await userController.create(user));
        console.log(await userController.read(user.id));

        console.log(await carController.create(car));
        console.log(await carController.read(car.id));
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('An error occurred:', error.message);
        }

        throw new Error(`An error occurred: ${String(error)}`);
    }
})();
