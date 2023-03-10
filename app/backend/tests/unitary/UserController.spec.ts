import UserController from '../../src/infrastructure/controllers/UserController';
import { Response, Request } from 'express';

describe('UserController', () => {
  let userController: UserController;

  const userUsecase = {
    registerUser: jest.fn(),
    findUserByCPF: jest.fn(),
    findAllCPF: jest.fn(),
    removeCPF: jest.fn(),
  }

  beforeEach(() => {
    userController = new UserController(userUsecase as any);
  });

  describe('registerUser', () => {
    it('should return 201 and the registered user with CPF', async () => {
      userUsecase.registerUser.mockResolvedValueOnce({ cpf: '64852893055', createdAt: new Date() });
      const req = { body: { cpf: '64852893055' } } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      const next = jest.fn();

      await userController.registerUser(req, res, next);

      expect(userUsecase.registerUser).toBeCalledWith({ cpf: '64852893055' });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ cpf: '64852893055', createdAt: expect.any(Date) });
    });

    it('should call next with the error when registering the user fails', async () => {
      const req = { body: { cpf: '12345678901' } } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown as Response;
      const next = jest.fn();

      userUsecase.registerUser = jest.fn().mockRejectedValue(new Error('Failed to register user'));

      await userController.registerUser(req, res, next);

      expect(next).toHaveBeenCalledWith(new Error('Failed to register user'));
    });
  });

  describe('findUserByCPF', () => {
    it('should return 200 and the user with CPF', async () => {
      const req = { params: { cpf: '12345678901' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown as Response;
      const next = jest.fn();

      userUsecase.findUserByCPF = jest.fn().mockResolvedValue('12345678901');

      await userController.findUserByCPF(req as any, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ cpf: '12345678901', createdAt: expect.any(Date), id: undefined });
    });
  });

  describe('removeCPF', () => {
    it('should remove CPF successfully', async () => {
      const cpf = '12345678901';
      const removeCPFSpy = jest.spyOn(userUsecase, 'removeCPF');
      const req = {
        params: {
          cpf
        }
      };
      const res = {
        status: jest.fn().mockReturnValue({
          end: jest.fn()
        })
      };
      const next = jest.fn();

      await userController.removeCPF(req as any, res as any, next);
      expect(await userController.removeCPF(req as any, res as any, next)).toBeUndefined();
      expect(removeCPFSpy).toHaveBeenCalledTimes(2);
      expect(removeCPFSpy).toHaveBeenCalledWith(cpf);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.status().end).toHaveBeenCalled();
    });

    it('should call next with error when removing CPF fails', async () => {
      const cpf = '123.456.789-10';
      const error = new Error('Removing CPF failed');
      jest.spyOn(userUsecase, 'removeCPF').mockRejectedValue(error);
      const req = {
        params: {
          cpf
        }
      };
      const res = {};
      const next = jest.fn();

      await userController.removeCPF(req as any, res as any, next);
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("findAllCPF", () => {
    it("should return all CPF numbers in the database", async () => {
      const mockData = [
        { cpf: "11111111120", id: 1, createdAt: expect.any(Date)  },
        { cpf: "12345678910", id: 2, createdAt: expect.any(Date) },
        { cpf: "13581054689", id: 3, createdAt: expect.any(Date) },
      ];

      jest.spyOn(userUsecase, "findAllCPF").mockResolvedValue(mockData);

      const mockResponse = {
        status: jest.fn().mockReturnValue({ json: jest.fn() }),
      };

      await userController.findAllCPF({} as any, mockResponse as any, {} as any);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.status().json).toHaveBeenCalledWith(
        mockData.map((user) => ({ ...user }))
      );
    });

    it("should return an error if an exception is thrown", async () => {
      jest.spyOn(userUsecase, "findAllCPF").mockRejectedValue(new Error("Test error"));

      const mockResponse = {
        status: jest.fn().mockReturnValue({ json: jest.fn() }),
      };

      const mockNext = jest.fn();

      await userController.findAllCPF({} as any, mockResponse as any, mockNext);

      expect(mockNext).toHaveBeenCalledWith(new Error("Test error"));
    });
  });
})
