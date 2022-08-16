import { model as mongoseCreateModel, Schema } from 'mongoose';
import { ICar } from '../interfaces/ICar';
import MongoModel from './mongoModel';

const carShema = new Schema<ICar>({ model: String,
  year: Number,
  color: String,
  buyValue: Number,
  doorsQty: Number,
  seatsQty: Number,
  status: Boolean || undefined }, { versionKey: false });

class CarModel extends MongoModel<ICar> {
  constructor(model = mongoseCreateModel('Car', carShema)) {
    super(model);
  }
}
export default CarModel;