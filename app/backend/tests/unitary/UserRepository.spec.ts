import { UserRepository } from '../../src/domain/repository/UserRepository';

describe('UserRepository', () => {
  let userRepository: UserRepository;
  let mockPersistence: any;

  beforeEach(() => {
    mockPersistence = {
      registerUser: jest.fn(),
      findUserByCPF: jest.fn(),
      findAllCPF: jest.fn(),
      removeCPF: jest.fn(),
    };

    userRepository = new UserRepository(mockPersistence);
  });

  describe('registerUser', () => {
    it('should call the registerUser method of the persistence with the correct parameters', async () => {
      const user = { cpf: '123456' };
      const registeredUser = { ...user, id: '1' };

      mockPersistence.registerUser.mockResolvedValue(registeredUser);

      const result = await userRepository.registerUser(user);

      expect(result).toEqual(registeredUser);
      expect(mockPersistence.registerUser).toHaveBeenCalledWith(user);
    });
  });

  describe('findUserByCPF', () => {
    it('should call the findUserByCPF method of the persistence with the correct parameters', async () => {
      const user = { cpf: '123456' };
      const foundUser = { ...user, id: '1' };

      mockPersistence.findUserByCPF.mockResolvedValue(foundUser);

      const result = await userRepository.findUserByCPF(user as any);

      expect(result).toEqual(foundUser);
      expect(mockPersistence.findUserByCPF).toHaveBeenCalledWith(user);
    });
  });

  describe('findAllCPF', () => {
    it('should call the findAllCPF method of the persistence', async () => {
      const users = [{ cpf: '123456' }, { cpf: '654321' }];

      mockPersistence.findAllCPF.mockResolvedValue(users);

      const result = await userRepository.findAllCPF();

      expect(result).toEqual(users);
      expect(mockPersistence.findAllCPF).toHaveBeenCalled();
    });
  });

  describe('removeCPF', () => {
    it('should call the removeCPF method of the persistence with the correct parameters', async () => {
      const cpf = '123456';

      mockPersistence.removeCPF.mockResolvedValue();

      await userRepository.removeCPF(cpf);

      expect(mockPersistence.removeCPF).toHaveBeenCalledWith(cpf);
    });
  });
});
