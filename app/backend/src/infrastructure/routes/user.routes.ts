import { Router } from "express";
import { controller } from "../factories/UserFactory";

const userRoutes = Router();
userRoutes.post('/', controller.registerUser);
userRoutes.get('/', controller.findAllCPF);
userRoutes.get('/:cpf', controller.findUserByCPF);
userRoutes.delete('/:cpf', controller.removeCPF);
export default userRoutes;
