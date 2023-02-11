import { Request, Response } from "express";
import { controller } from "../../src/infrastructure/factories/UserFactory";

describe("User Routes", () => {
  const req = { body: { cpf: "64852893055" } } as Request;
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  } as unknown as Response;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 201 and the registered user with CPF", async () => {
    const next = jest.fn();
    await controller.registerUser(req, res, next);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ cpf: "64852893055"});
  });

  it("should return 200 and an array of all registered users", async () => {
    const next = jest.fn();
    await controller.findAllCPF(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.any(Array));
  });

  it("should return 200 and the found user with CPF", async () => {
    req.params = { cpf: "64852893055" };
    const next = jest.fn();
    await controller.findUserByCPF(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ cpf: "64852893055", createdAt: expect.any(Date), id: undefined });
  });

  it("should return 404 if the user with CPF was not found", async () => {
    req.params = { cpf: "00000000000" };
    const next = jest.fn();
    await controller.findUserByCPF(req, res, next);
    expect(next).toBeCalled();
  });

  it("should return 200 and remove the user with CPF", async () => {
    req.params = { cpf: "64852893055" };
    const next = jest.fn();
    await controller.removeCPF(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});
