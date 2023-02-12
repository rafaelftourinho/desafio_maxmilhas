import { UserUseCase } from '../../src/domain/usercase/UserUsecase';
import { UserRepository } from '../../src/domain/repository/UserRepository';
import { HTTPError } from '../../src/infrastructure/utils/HTTPError';

describe('UserUseCase', () => {
  let userUseCase: UserUseCase;
  let userRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    userRepository = {
      registerUser: jest.fn().mockResolvedValue({}),
      findUserByCPF: jest.fn().mockResolvedValue(null),
      findAllCPF: jest.fn().mockResolvedValue([]),
      removeCPF: jest.fn().mockResolvedValue(undefined),
    } as unknown as jest.Mocked<UserRepository>;
    userUseCase = new UserUseCase(userRepository);
  });

  describe('registerUser', () => {
    it('should return a user', async () => {
      const result = await userUseCase.registerUser({ cpf: '64852893055' });
      expect(result).toEqual({});
    });

    it('should throw an error if the user already exists', async () => {
      userRepository.findUserByCPF.mockResolvedValue('64852893055');
      await expect(userUseCase.registerUser({ cpf: '64852893055' })).rejects.toThrow(
        new HTTPError(400, 'ExistsCpfException', 'CPF already exists'),
      );
    });

    it('should throw an error if the cpf is invalid', async () => {
      await expect(userUseCase.registerUser({ cpf: '123456789' })).rejects.toThrow(
        new HTTPError(400, 'InvalidCpfException', 'CPF is not valid'),
      );
    });

    it('should throw an error if the cpf is not valid', async () => {
      userUseCase.isValidCPF = jest.fn().mockResolvedValue(false);
      await expect(userUseCase.registerUser({ cpf: '123456789011' })).rejects.toThrow(
        new HTTPError(404, 'InvalidCpfException', 'CPF is not valid'),
      );
    });
  });

  describe('findUserByCPF', () => {
    it('should return a user', async () => {
      userRepository.findUserByCPF.mockResolvedValue('64852893055');
      const result = await userUseCase.findUserByCPF('64852893055');
      expect(result).toEqual('64852893055');
    });

    it('should return null if the user does not exist', async () => {
      const result = await userUseCase.findUserByCPF('64852893055');
      expect(result).toEqual(null);
    });
  });

  describe('removeCPF', () => {
    it('should remove the CPF', async () => {
      userRepository.findUserByCPF.mockResolvedValueOnce('64852893055');
      await userUseCase.removeCPF('64852893055');
      expect(userRepository.removeCPF).toHaveBeenCalledWith('64852893055');
    });
  
    it('should throw an error if the CPF is not found', async () => {
      userRepository.removeCPF.mockRejectedValue(new Error());
      await expect(userUseCase.removeCPF('64852893055')).rejects.toThrow(
        new HTTPError(404, 'NotFoundException', 'CPF not found'),
      );
    });
  });

  describe('findAllCPF', () => {
    it('should return a list of users', async () => {
      userRepository.findAllCPF.mockResolvedValue([{ cpf: '64852893055', createdAt: '', },{ cpf: '64852893056', createdAt: '', }]);
      const result = await userUseCase.findAllCPF();
      expect(result).toEqual([{ cpf: '64852893055', createdAt: '' }, { cpf: '64852893056', createdAt: '' }]);
    });
  
    it('should return an empty list if no users are found', async () => {
      const result = await userUseCase.findAllCPF();
      expect(result).toEqual([]);
    });
  });

  describe('isValidCPF', () => {
    it('should return false if the type of cpf is not a string', async () => {
      const result = await userUseCase.isValidCPF(1234567890);
      expect(result).toBe(false);
    });

    it('should return false if the length of cpf is not 11', async () => {
      const result = await userUseCase.isValidCPF('123456789');
      expect(result).toBe(false);
    });

    it('should return false if all digits of cpf are the same', async () => {
      const result = await userUseCase.isValidCPF('11111111111');
      expect(result).toBe(false);
    });

    it('should return true if cpf is valid', async () => {
      const result = await userUseCase.isValidCPF('12345678909');
      expect(result).toBe(true);
    });
  });
});
