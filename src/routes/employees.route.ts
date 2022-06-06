import { Router } from 'express';
import EmployeesController from '@controllers/employees.controller';
import { CreateEmployeeDto } from '@dtos/employees.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@middlewares/auth.middleware';

class EmployeesRoute implements Routes {
  public path = '/employees';
  public router = Router();
  public employeesController = new EmployeesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.employeesController.getEmployees);
    this.router.get(`${this.path}/:id(\\d+)`, authMiddleware, this.employeesController.getEmployeeById);
    this.router.post(`${this.path}`, [authMiddleware, validationMiddleware(CreateEmployeeDto, 'body')], this.employeesController.createEmployee);
    this.router.put(
      `${this.path}/:id(\\d+)`,
      [authMiddleware, validationMiddleware(CreateEmployeeDto, 'body', true)],
      this.employeesController.updateEmployee,
    );
    this.router.delete(`${this.path}/:id(\\d+)`, authMiddleware, this.employeesController.deleteEmployee);
  }
}

export default EmployeesRoute;
