import { NextFunction, Request, Response } from 'express';
import { CreateCompanyDto } from '@dtos/companies.dto';
import { Company } from '@interfaces/companies.interface';
import CompanyService from '@services/companies.service';

class CompaniesController {
  public companyService = new CompanyService();

  public getCompanies = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllCompaniesData: Company[] = await this.companyService.findAllCompany();

      res.status(200).json({ data: findAllCompaniesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getCompanyById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const companyId = Number(req.params.id);
      const findOneCompanyData: Company = await this.companyService.findCompanyById(companyId);

      res.status(200).json({ data: findOneCompanyData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createCompany = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const companyData: CreateCompanyDto = req.body;
      const createCompanyData: Company = await this.companyService.createCompany(companyData);

      res.status(201).json({ data: createCompanyData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateCompany = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const companyId = Number(req.params.id);
      const companyData: CreateCompanyDto = req.body;
      const updateCompanyData: Company = await this.companyService.updateCompany(companyId, companyData);

      res.status(200).json({ data: updateCompanyData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteCompany = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const companyId = Number(req.params.id);
      const deleteCompanyData: Company = await this.companyService.deleteCompany(companyId);

      res.status(200).json({ data: deleteCompanyData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default CompaniesController;
