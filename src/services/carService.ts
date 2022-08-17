import { isValidObjectId } from 'mongoose';
import IService from '../interfaces/IService';
import { ICar, carSchema } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/errosCatalog';

class CarService implements IService<ICar> {
  private _car: IModel<ICar>;
  constructor(model: IModel<ICar>) {
    this._car = model;
  }

  public async create(obj: ICar): Promise<ICar> {
    const parsed = carSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    return this._car.create(obj);
  }

  public async read(): Promise<ICar[] > {
    const cars = await this._car.read();
    return cars;
  }

  public async readOne(_id: string): Promise<ICar> {
    if (!isValidObjectId(_id)) {
      throw new Error(ErrorTypes.InvalidMongoId);
    }
    const car = await this._car.readOne(_id);
    if (!car) {
      throw new Error(ErrorTypes.EntityNotFound);
    }
    return car;
  }

  public async update(_id: string, obj: ICar): Promise<ICar> {
    if (!isValidObjectId(_id)) {
      throw new Error(ErrorTypes.InvalidMongoId);
    }
    const parsed = carSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    } 
    const car = await this._car.readOne(_id);
    if (!car) {
      throw new Error(ErrorTypes.EntityNotFound);
    }
    const update = await this._car.update(_id, obj);
    return update as ICar;
  }
}

export default CarService;
