import { UserRepository } from "../../domain/repository/UserRepository";
import { UserUseCase } from "../../domain/usercase/UserUsecase";
import { IUserPersistence } from "../../domain/repository/IUserPersistence";
import { UserPersistence } from "../persistence/UserPersistence";
import UserController from "../controllers/UserController";

const iPersistence: IUserPersistence = new UserPersistence();
const userRepository = new UserRepository(iPersistence);
const usercase = new UserUseCase(userRepository);
const controller = new UserController(usercase);

export { controller };
