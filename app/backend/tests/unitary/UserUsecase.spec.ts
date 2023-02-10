// import { UserUseCase } from '../../src/domain/usercase/UserUsecase';
// import { UserRepository } from '../../src/domain/repository/UserRepository';
// import { HTTPError } from '../../src/infrastructure/utils/HTTPError';

// describe('UserUseCase', () => {
//   let userUseCase: UserUseCase;
//   let userRepository: jest.Mocked<UserRepository>;

//   beforeEach(() => {
//     userRepository = {
//       registerUser: jest.fn().mockResolvedValue({}),
//       findUserByCPF: jest.fn().mockResolvedValue(null),
//       findAllCPF: jest.fn().mockResolvedValue([]),
//       removeCPF: jest.fn().mockResolvedValue(undefined),
//     };
//     userUseCase = new UserUseCase(userRepository);
//   });

//   describe('registerUser', () => {
//     it('should return a user', async () => {
//       const result = await userUseCase.registerUser({ cpf: '12345678901' });
//       expect(result).toEqual({});
//     });

//     it('should throw an error if the user already exists', async () => {
//       userRepository.findUserByCPF.mockResolvedValue({ cpf: '12345678901', createdAt: '' });
//       await expect(userUseCase.registerUser({ cpf: '12345678901' })).rejects.toThrow(
//         new HTTPError(400, 'ExistsCpfException', 'CPF already exists'),
//       );
//     });

//     it('should throw an error if the cpf is invalid', async () => {
//       await expect(userUseCase.registerUser({ cpf: '123456789' })).rejects.toThrow(
//         new HTTPError(400, 'InvalidCpfException', 'CPF is not valid'),
//       );
//     });

//     it('should throw an error if the cpf is not valid', async () => {
//       userUseCase.isValidCPF = jest.fn().mockResolvedValue(false);
//       await expect(userUseCase.registerUser({ cpf: '12345678901' })).rejects.toThrow(
//         new HTTPError(404, 'InvalidCpfException', 'CPF is not valid'),
//       );
//     });
//   });

//   describe('findUserByCPF', () => {
//     it('should return a user', async () => {
//       userRepository.findUserByCPF.mockResolvedValue({ cpf: '12345678901', createdAt: '' });
//       const result = await userUseCase.findUserByCPF({ cpf: '12345678901', createdAt: '' });
//       expect(result).toEqual({ cpf: '12345678901', createdAt: '' });
//     });

//     it('should return null if the user does not exist', async () => {
//       const result = await userUseCase.findUserByCPF({ cpf: '12345678901', createdAt: '' });
//       expect(result).toEqual(null);
//     });
//   });
// });
