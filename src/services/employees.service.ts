import { Company } from '@/interfaces/companies.interface';
import DB from '@databases';
import { CreateEmployeeDto } from '@dtos/employees.dto';
import { HttpException } from '@exceptions/HttpException';
import { Employee } from '@interfaces/employees.interface';
import { isEmpty } from '@utils/util';

class EmployeeService {
  public employees = DB.Employees;
  public companies = DB.Companies;

  public async findAllEmployee(): Promise<Employee[]> {
    const allEmployee: Employee[] = await this.employees.findAll();
    return allEmployee;
  }

  public async findEmployeeById(employeeId: number): Promise<Employee> {
    if (isEmpty(employeeId)) throw new HttpException(400, 'Empty content');

    const findEmployee: Employee = await this.employees.findByPk(employeeId);
    if (!findEmployee) throw new HttpException(409, 'This employee does not exist');

    return findEmployee;
  }

  public async createEmployee(employeeData: CreateEmployeeDto): Promise<Employee> {
    if (isEmpty(employeeData)) throw new HttpException(400, 'Empty content');

    const findEmployee: Employee = await this.employees.findOne({ where: { firstName: employeeData.firstName, lastName: employeeData.lastName } });
    if (findEmployee) throw new HttpException(409, `The employee ${employeeData.firstName} ${employeeData.lastName} already exists`);

    const findCompany: Company = await this.companies.findOne({ where: { id: employeeData.companyId } });
    if (!findCompany) throw new HttpException(409, `The company ${employeeData.companyId} does not exist`);

    const createEmployeeData: Employee = await this.employees.create({ ...employeeData });
    return createEmployeeData;
  }

  public async updateEmployee(employeeId: number, employeeData: CreateEmployeeDto): Promise<Employee> {
    if (isEmpty(employeeData)) throw new HttpException(400, 'Empty content');

    const findEmployee: Employee = await this.employees.findByPk(employeeId);
    if (!findEmployee) throw new HttpException(409, 'This employee does not exist');

    if (employeeData.companyId) {
      const findCompany: Company = await this.companies.findOne({ where: { id: employeeData.companyId } });
      if (!findCompany) throw new HttpException(409, `The company ${employeeData.companyId} does not exist`);
    }

    await this.employees.update({ ...employeeData }, { where: { id: employeeId } });

    const updateUser: Employee = await this.employees.findByPk(employeeId);
    return updateUser;
  }

  public async deleteEmployee(employeeId: number): Promise<Employee> {
    if (isEmpty(employeeId)) throw new HttpException(400, 'Empty content');

    const findUser: Employee = await this.employees.findByPk(employeeId);
    if (!findUser) throw new HttpException(409, 'This employee does not exist');

    await this.employees.destroy({ where: { id: employeeId } });

    return findUser;
  }
}

export default EmployeeService;
