import { NextFunction, Request, Response } from "express";
import { User } from "../../domain/entities/User";
import { UserUseCase } from "../../domain/usercase/UserUsecase";

class UserController {
  constructor(private userUseCase: UserUseCase) {}

  public registerUser = async (req: Request, res: Response, next: NextFunction) => {
    const { cpf } = req.body;
    const user: Pick<User, "cpf"> = { cpf };

    try {
      const userCpf = await this.userUseCase.registerUser(user);
      res.status(201).json(userCpf);
    } catch (error) {
      next(error);
    }
  }

  public findUserByCPF = async (req: Request, res: Response, next: NextFunction) => {
    const { cpf } = req.params;

    try {
      const userCpf = await this.userUseCase.findUserByCPF(cpf);
      if (!userCpf) {
        return res.status(404).json({ type: 'NotFoundCpfException', message: 'CPF is not valid' });
      }
      res.status(200).json({
        cpf,
        createdAt: new Date(),
      });
    } catch (error) {
      next(error);
    }
  }

  public findAllCPF = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const userCpf = await this.userUseCase.findAllCPF();

      res.status(200).json(userCpf);
    } catch (error) {
      next(error);
    }
  }

  public removeCPF = async (req: Request, res: Response, next: NextFunction) => {
    const { cpf } = req.params;

    try {
      await this.userUseCase.removeCPF(cpf);
      res.status(200).end();
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
