import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import {ZodError} from 'zod'
import CarModel from '../../../models/carModel'
import CarService from '../../../services/carService'
import { carWithIdMock, carMockWithouId, carsWithIdArray } from '../../mocks/carMocks'

describe('Car service', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel)
  before(async () => {
    sinon.stub(carModel, 'create').resolves(carWithIdMock)
		sinon.stub(carModel, 'read').resolves(carsWithIdArray)
  });

  after(()=>{
    sinon.restore();
  })

  describe('cria um car', () => {
		it('Successo', async () => {
			const carCreated = await carService.create(carMockWithouId);

			expect(carCreated).to.be.deep.equal(carWithIdMock);
		});

		it('Falha', async () => {
			try {
				await carService.create({} as any);
			} catch (error) {
				expect(error).to.be.instanceOf(ZodError);
			}
		});
	});

	describe('Busca todos os carros no Bd', () => {
		it('Successo', async () => {
			const carCreated = await carService.read();

			expect(carCreated).to.be.deep.equal(carsWithIdArray);
		});
	});

});