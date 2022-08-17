import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import {ZodError} from 'zod'
import CarModel from '../../../models/carModel'
import CarService from '../../../services/carService'
import { carWithIdMock, carMockWithouId, carsWithIdArray } from '../../mocks/carMocks'

describe('Testa a camada service de car', () => {
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

	describe('Busca carro pelo Id', () => {
		it('encontra o carro buscado', async () => {
			sinon.stub(carModel, 'readOne').resolves(carWithIdMock)
			const car = await carService.readOne('62cf1fc6498565d94eba52cd');
			sinon.restore()

			expect(car).to.be.deep.equal(carWithIdMock);
		});

		it('retorna um erro se o Id for inválido', async () => {
			try {
				await carService.readOne('123errado');
			} catch (error: any) {
				expect(error.message).to.be.eq('InvalidMongoId')
			}
		});

		it('retorna um erro se não encontrar um carro', async () => {
			sinon.stub(carModel, 'readOne').resolves(null)
			try {
				await carService.readOne('62cf1fc6498565d94eba52cd');
			} catch (error: any) {
				expect(error.message).to.be.eq('EntityNotFound')
			}
			sinon.restore()
		});
	});
	describe('Atualiza um carro no BD', () => {
		it('retorna um erro se o Id for inválido', async () => {
			try {
				await carService.update('123errado', carMockWithouId);
			} catch (error: any) {
				expect(error.message).to.be.eq('InvalidMongoId')
			}
		});
		it('retorna um erro se não encontrar um carro', async () => {
			sinon.stub(carModel, 'readOne').resolves(null)
			try {
				await carService.update('62cf1fc6498565d94eba52cd', carMockWithouId);
			} catch (error: any) {
				expect(error.message).to.be.eq('EntityNotFound')
			}
			sinon.restore()
		});
		it('retorna um erro se o objeto for vazio', async () => {
			try {
				await carService.update('62cf1fc6498565d94eba52cd',{} as any);
			} catch (error) {
				expect(error).to.be.instanceOf(ZodError);
			}
		});
		it('atualiza com sucesso', async () => {
			sinon.stub(carModel, 'readOne').resolves(carWithIdMock);
			sinon.stub(carModel, 'update').resolves(carWithIdMock);
			const car = await carService.update('62cf1fc6498565d94eba52cd', carMockWithouId);
			expect(car).to.be.deep.equal(carWithIdMock);
			sinon.restore()
		});
	});

});