import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import { NextFunction, Request, Response } from 'express';
import CarModel from '../../../models/carModel'
import CarService from '../../../services/carService'
import { carWithIdMock, carMockWithouId, carsWithIdArray } from '../../mocks/carMocks'
import CarControler from '../../../controllers/carController'

describe('Car controller', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel)
  const carController = new CarControler(carService)
  const req = {} as Request;
  const res = {} as Response;
  before(async () => {
    sinon.stub(carService, 'create').resolves(carWithIdMock)
    sinon.stub(carService, 'read').resolves(carsWithIdArray)
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(()=>{
    sinon.restore();
  })

  describe('cria um car', () => {
    it('Successo', async () => {
      req.body = carMockWithouId;
      await carController.create(req, res);
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carWithIdMock)).to.be.true;
    });
  });

  describe('Busca todos os carros no BD', () => {
    it('Successo', async () => {
      await carController.read(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carsWithIdArray)).to.be.true;
    });
  });

});