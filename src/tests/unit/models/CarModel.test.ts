import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import { Model } from 'mongoose';
import { carWithIdMock, carMockWithouId } from '../../mocks/carMocks'
import CarModel from '../../../models/carModel'

describe('Testa a model de car', () => {
  const carModel = new CarModel()
  before(async () => {
    sinon.stub(Model, 'create').resolves(carWithIdMock)
  });

  after(()=>{
    sinon.restore();
  })

    it('cria um carro com sucesso', async () => {
      const newCar = await carModel.create(carMockWithouId)
      expect(newCar).to.be.deep.equal(carWithIdMock)
    })

});