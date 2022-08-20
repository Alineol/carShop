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

  private checkId = (id: string) => {
    if (!isValidObjectId(id)) {
      throw new Error(ErrorTypes.InvalidMongoId);
    }
  };

  private checkCarBody = (obj: ICar) => {
    const parsed = carSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
  };

  public async create(obj: ICar): Promise<ICar> {
    this.checkCarBody(obj);
    return this._car.create(obj);
  }

  public async read(): Promise<ICar[] > {
    const cars = await this._car.read();
    return cars;
  }

  public async readOne(_id: string): Promise<ICar> {
    this.checkId(_id);
    const car = await this._car.readOne(_id);
    if (!car) {
      throw new Error(ErrorTypes.EntityNotFound);
    }
    return car;
  }

  public async update(_id: string, obj: ICar): Promise<ICar> {
    this.checkId(_id);
    this.checkCarBody(obj); 
    await this.readOne(_id);
    const update = await this._car.update(_id, obj);
    return update as ICar;
  }

  public async delete(_id: string): Promise<null> {
    this.checkId(_id);
    await this.readOne(_id);
    const update = await this._car.delete(_id);
    return update as null;
  }
}

export default CarService;
