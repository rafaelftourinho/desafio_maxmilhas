import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { HTTPError } from '../../src/infrastructure/utils/HTTPError';
import { UserUseCase } from '../../src/domain/usercase/UserUsecase';
const { expect } = chai;
chai.use(sinonChai);

describe('UserUseCase', () => {
  let userUseCase: any;
  let userRepository: any;

  beforeEach(() => {
    userRepository = {
      registerUser: sinon.stub().resolves(),
      findUserByCPF: sinon.stub().resolves(),
      isValidCPF: sinon.stub().resolves(),
    };
    userUseCase = new UserUseCase(userRepository);
  });

  describe('registerUser', () => {
    it('should throw an error if CPF already exists', async () => {
      userRepository.findUserByCPF.resolves({ cpf: '11111111112' });

      try {
        await userUseCase.registerUser({ cpf: '11111111112' });
        throw new Error('should have thrown an error');
      } catch (err: any) {
        expect(err).to.be.an.instanceOf(HTTPError);
        expect(err.message).to.equal('CPF already exists');
        expect(err.status).to.equal(400);
      }
    });

    it('should throw an error if CPF length is not 11', async () => {
      try {
        await userUseCase.registerUser({ cpf: '1111111112' });
        throw new Error('should have thrown an error');
      } catch (err: any) {
        expect(err).to.be.an.instanceOf(HTTPError);
        expect(err.message).to.equal('CPF is not valid');
        expect(err.status).to.equal(400);
      }
    });

    it('should throw an error if CPF is not valid', async () => {
      sinon.stub(userUseCase, 'isValidCPF').resolves(true);

      try {
        await userUseCase.registerUser({ cpf: '11111111111' });
          throw new Error('should have thrown an error');
      } catch (err: any) {
        expect(err).to.be.an.instanceOf(HTTPError);
        expect(err.message).to.equal('CPF is not valid');
        expect(err.status).to.equal(404);
      }
    });

    it('should register the user if CPF is valid', async () => {
      sinon.stub(userUseCase, 'isValidCPF').resolves(false);
      await userUseCase.registerUser({ cpf: '11111111112' });
      expect(userRepository.registerUser.calledOnce).to.be.true;
    });
  });
});
