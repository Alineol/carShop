import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import { Model } from 'mongoose';
import { carWithIdMock, carMockWithouId, carsWithIdArray } from '../../mocks/carMocks'
import CarModel from '../../../models/carModel'

describe('Testa a model de car com casos de sucesso', () => {
  const carModel = new CarModel()
  before(async () => {
    sinon.stub(Model, 'create').resolves(carWithIdMock)
    sinon.stub(Model, 'find').resolves(carsWithIdArray)
    sinon.stub(Model, 'findById').resolves(carWithIdMock)
  });

  after(()=>{
    sinon.restore();
  })

    it('cria um carro com sucesso', async () => {
      const newCar = await carModel.create(carMockWithouId)
      expect(newCar).to.be.deep.equal(carWithIdMock)
    })

    it('Busca todos os carros no bd', async() => {
      const cars = await carModel.read();
      expect (cars).to.be.deep.equal(carsWithIdArray)
    })

    it('Busca um carro pelo id', async() => {
      const cars = await carModel.readOne('62cf1fc6498565d94eba52cd');
      expect (cars).to.be.deep.equal(carWithIdMock)
    })

});