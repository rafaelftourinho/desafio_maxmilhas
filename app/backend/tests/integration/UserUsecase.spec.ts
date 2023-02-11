import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { HTTPError } from '../../src/infrastructure/utils/HTTPError';
import { UserUseCase } from '../../src/domain/usercase/UserUsecase';
import { User } from '../../src/domain/entities/User';
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

  afterEach(() => {
    sinon.restore();
  });

  describe('registerUser', () => {
    it('should throw an error if CPF already exists', async () => {
      userRepository.findUserByCPF.resolves({ cpf: '64852893055' });

      try {
        await userUseCase.registerUser({ cpf: '64852893055' });
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
        expect(err.status).to.equal(404);
      }
    });

    it('should throw an error if CPF is not valid', async () => {
      sinon.stub(userUseCase, 'isValidCPF').resolves(false);

      try {
        await userUseCase.registerUser({ cpf: '11111111112' });
        throw new Error('should have thrown an error');
      } catch (err: any) {
        expect(err).to.be.an.instanceOf(HTTPError);
        expect(err.message).to.equal('CPF is not valid');
        expect(err.status).to.equal(404);
      }
    });

    it('should register the user if CPF is valid', async () => {
      sinon.stub(userUseCase, 'isValidCPF').resolves(true);
      await userUseCase.registerUser({ cpf: '13581058997' });
      expect(userRepository.registerUser.calledOnce).to.be.true;
    });
  });

  describe('findUserByCPF', () => {
    it('should return user when it exists', async () => {
      const cpf = '64852893055';
      const user = { cpf, createdAt: '' } as Omit<User, 'id'>;
      sinon.stub(userUseCase, 'findUserByCPF').resolves(user);

      const result = await userUseCase.findUserByCPF(user);
      expect(result).to.deep.equal(user);
      expect(userUseCase.findUserByCPF).to.have.been.calledWith(user);
    });

    it('should return the user information if the CPF is valid', async () => {
      sinon.stub(userUseCase, 'isValidCPF').returns(true);
      sinon.stub(userUseCase, 'findUserByCPF').returns({ cpf: '13581058997' });
      const result = await userUseCase.findUserByCPF({ cpf: '13581058997' });
      expect(result).to.deep.equal({ cpf: '13581058997' });
    });

    it('should return null when user does not exist', async () => {
      const cpf = '12345678901';
      const user = { cpf, createdAt: '' } as Omit<User, 'id'>;
      sinon.stub(userUseCase, 'findUserByCPF').resolves(null);

      const result = await userUseCase.findUserByCPF(user);
      expect(result).to.be.null;
      expect(userUseCase.findUserByCPF).to.have.been.calledWith(user);
    });

    it('should throw an error if the CPF is not valid', async () => {
      sinon.stub(userUseCase, 'isValidCPF').returns(false);
      try {
        await userUseCase.findUserByCPF({ cpf: '11111111111', createdAt: new Date() });
        expect.fail('Should have thrown an error');
      } catch (error: any) {
        expect(error).to.be.an.instanceof(HTTPError);
        expect(error.statusCode).to.equal(undefined);
        expect(error.message).to.equal('CPF is not valid');
      }
    });

    it('should throw an error when cpf is not valid', async () => {
      const cpf = '11111111111';
      const user = { cpf, createdAt: '' } as Omit<User, 'id'>;

      try {
        await userUseCase.findUserByCPF(user);
        throw new Error('This test should have thrown an error');
      } catch (error: any) {
        expect(error).to.be.instanceOf(HTTPError);
        expect(error.message).to.equal('CPF is not valid');
      }
    });
  });

  describe('isValidCPF', () => {
    it('should return true if the CPF is valid', async () => {
      const result = await userUseCase.isValidCPF('64852893055');
      expect(result).to.be.true;
    });

    it('should return false if the CPF is not valid', async () => {
      const result = await userUseCase.isValidCPF('13581058998');
      expect(result).to.be.false;
    });
  });

  describe('findAllCPF', () => {
    it('should return an array of all users', async () => {
      const users: User[] = [
        { id: 1, cpf: '11111111111', createdAt: '' },
        { id: 2, cpf: '22222222222', createdAt: '' }
      ];
      sinon.stub(userUseCase, 'findAllCPF').resolves(users);

      const result = await userUseCase.findAllCPF();

      expect(result).to.be.an('array');
      expect(result).to.deep.equal(users);
      expect(userUseCase.findAllCPF.calledOnce).to.be.true;
    });

    it('should return an empty array if there are no users', async () => {
      sinon.stub(userUseCase, 'findAllCPF').resolves([]);

      const result = await userUseCase.findAllCPF();

      expect(result).to.be.an('array');
      expect(result).to.deep.equal([]);
      expect(userUseCase.findAllCPF.calledOnce).to.be.true;
    });
  })
  // describe('removeCPF', () => {
  //   it('should throw an error if the CPF is not found', async () => {
  //     const findUserByCPFStub = sinon.stub(userUseCase, 'findUserByCPF').resolves(null);
  //     const removeCPF = userUseCase.removeCPF('1234567890');

  //     return removeCPF.catch((error: any) => {
  //       expect(error).to.be.an.instanceof(HTTPError);
  //       expect(error.statusCode).to.equal(400);
  //       expect(error.code).to.equal('NotFoundCpfException');
  //       expect(error.message).to.equal('CPF not found');
  //       findUserByCPFStub.restore();
  //     });
  //   });

  //   it('should throw an error if the CPF is not valid', async () => {
  //     const findUserByCPFStub = sinon.stub(userUseCase, 'findUserByCPF').resolves({ cpf: '12345678901', createdAt: '' });
  //     const isValidCPFStub = sinon.stub(userUseCase, 'isValidCPF').resolves(false);
  //     const removeCPF = userUseCase.removeCPF('12345678901');

  //     return removeCPF.catch((error: any) => {
  //       expect(error).to.be.an.instanceof(HTTPError);
  //       expect(error.statusCode).to.equal(404);
  //       expect(error.code).to.equal('InvalidCpfException');
  //       expect(error.message).to.equal('CPF is not valid');
  //       findUserByCPFStub.restore();
  //       isValidCPFStub.restore();
  //     });
  //   });
  //   it('should throw an error if CPF is not valid', async () => {
  //     const cpf = '12345678901';
  //     const findUserByCPFStub = sinon.stub(userUseCase, 'findUserByCPF').resolves({});
  //     sinon.stub(userUseCase, 'isValidCPF').resolves(false);

  //     try {
  //       await userUseCase.removeCPF(cpf);
  //       expect.fail('Expected to throw an error');
  //     } catch (error: any) {
  //       expect(error).to.be.an.instanceof(HTTPError);
  //       expect(error.code).to.be.equal(404);
  //       expect(error.name).to.be.equal('InvalidCpfException');
  //       expect(error.message).to.be.equal('CPF is not valid');
  //     }

  //     sinon.assert.calledOnce(findUserByCPFStub);
  //     sinon.assert.called
  //   });
  //   it("should throw error if cpf is not found", async () => {
  //     const findUserByCPFStub = sinon.stub(userUseCase, "findUserByCPF").resolves(null);
  //     const removeCPFStub = sinon.stub(userRepository, "removeCPF").resolves();
  
  //     try {
  //       await userUseCase.removeCPF("12345678910");
  //     } catch (error: any) {
  //       expect(error).to.be.an.instanceOf(HTTPError);
  //       expect(error.statusCode).to.equal(400);
  //       expect(error.error).to.equal("NotFoundCpfException");
  //       expect(error.message).to.equal("CPF not found");
  //     }
  
  //     findUserByCPFStub.restore();
  //     removeCPFStub.restore();
  //   });
  
  //   it("should throw error if cpf is not valid", async () => {
  //     const findUserByCPFStub = sinon.stub(userUseCase, "findUserByCPF").resolves({ cpf: "12345678910" });
  //     const isValidCPFStub = sinon.stub(userUseCase, "isValidCPF").returns(false);
  //     const removeCPFStub = sinon.stub(userRepository, "removeCPF").resolves();
  
  //     try {
  //       await userUseCase.removeCPF("12345678910");
  //     } catch (error: any) {
  //       expect(error).to.be.an.instanceOf(HTTPError);
  //       expect(error.statusCode).to.equal(404);
  //       expect(error.error).to.equal("InvalidCpfException");
  //       expect(error.message).to.equal("CPF is not valid");
  //     }
  
  //     findUserByCPFStub.restore();
  //     isValidCPFStub.restore();
  //     removeCPFStub.restore();
  //   });
  // });
});
