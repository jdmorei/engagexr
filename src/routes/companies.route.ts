import { Router } from 'express';
import CompaniesController from '@controllers/companies.controller';
import { CreateCompanyDto } from '@dtos/companies.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@middlewares/auth.middleware';
import isAdminMiddleware from '@middlewares/isAdmin.middleware';

class CompaniesRoute implements Routes {
  public path = '/companies';
  public router = Router();
  public companiesController = new CompaniesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.companiesController.getCompanies);
    this.router.get(`${this.path}/:id(\\d+)`, authMiddleware, this.companiesController.getCompanyById);
    this.router.post(`${this.path}`, authMiddleware, validationMiddleware(CreateCompanyDto, 'body'), this.companiesController.createCompany);
    this.router.put(
      `${this.path}/:id(\\d+)`,
      [authMiddleware, validationMiddleware(CreateCompanyDto, 'body', true)],
      this.companiesController.updateCompany,
    );
    this.router.delete(`${this.path}/:id(\\d+)`, [authMiddleware, isAdminMiddleware], this.companiesController.deleteCompany);
  }
}

export default CompaniesRoute;
