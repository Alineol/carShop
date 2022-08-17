import { Model, isValidObjectId } from 'mongoose';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/errosCatalog';

abstract class MongoModel<T> implements IModel<T> {
  protected _model: Model<T>;

  constructor(model:Model<T>) {
    this._model = model;
  }
  public async create(object: T): Promise<T> {
    return this._model.create({ ...object });
  }

  public async readOne(_id:string):Promise<T | null> {
    if (!isValidObjectId(_id)) throw new Error(ErrorTypes.InvalidMongoId);
    return this._model.findById(_id);
  }

  public async read(): Promise<T[]> {
    return this._model.find();
  }

  public async update(_id: string, object: T): Promise<T | null> {
    await this._model.updateOne({ _id }, object);
    return object;
  }

  public async delete(_id: string): Promise< T | null> {
    await this._model.deleteOne({ _id });
    return null;
  }
}

export default MongoModel;