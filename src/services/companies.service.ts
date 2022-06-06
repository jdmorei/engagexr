import DB from '@databases';
import { CreateCompanyDto } from '@dtos/companies.dto';
import { HttpException } from '@exceptions/HttpException';
import { Company } from '@interfaces/companies.interface';
import { isEmpty } from '@utils/util';
import { Transaction } from 'sequelize';

class CompanyService {
  public companies = DB.Companies;
  public employees = DB.Employees;

  public async findAllCompany(): Promise<Company[]> {
    const allCompanies: Company[] = await this.companies.findAll();
    return allCompanies;
  }

  public async findCompanyById(companyId: number): Promise<Company> {
    if (isEmpty(companyId)) throw new HttpException(400, 'Empty content');

    const findCompany: Company = await this.companies.findByPk(companyId);
    if (!findCompany) throw new HttpException(409, 'This company does not exist');

    return findCompany;
  }

  public async createCompany(CompanyData: CreateCompanyDto): Promise<Company> {
    if (isEmpty(CompanyData)) throw new HttpException(400, 'Empty content');

    const findCompany: Company = await this.companies.findOne({ where: { name: CompanyData.name } });
    if (findCompany) throw new HttpException(409, `This company ${CompanyData.name} already exists`);

    const createCompanyData: Company = await this.companies.create({ ...CompanyData });
    return createCompanyData;
  }

  public async updateCompany(companyId: number, companyData: CreateCompanyDto): Promise<Company> {
    if (isEmpty(companyData)) throw new HttpException(400, 'Empty content');

    const findCompany: Company = await this.companies.findByPk(companyId);
    if (!findCompany) throw new HttpException(409, 'This company does not exist');

    await this.companies.update({ ...companyData }, { where: { id: companyId } });

    const updateCompany: Company = await this.companies.findByPk(companyId);
    return updateCompany;
  }

  public async deleteCompany(companyId: number): Promise<Company> {
    if (isEmpty(companyId)) throw new HttpException(400, 'Empty content');

    const findCompany: Company = await this.companies.findByPk(companyId);
    if (!findCompany) throw new HttpException(409, 'This company does not exist');

    const hasEmployees = await this.employees.findAll({ where: { companyId } });

    if (hasEmployees.length > 0) {
      await DB.sequelize.transaction((t: Transaction) => {
        return this.employees.destroy({ where: { companyId }, transaction: t }).then(() => {
          return this.companies.destroy({ where: { id: companyId }, transaction: t });
        });
      });
    }

    await this.companies.destroy({ where: { id: companyId } });

    return findCompany;
  }
}

export default CompanyService;
