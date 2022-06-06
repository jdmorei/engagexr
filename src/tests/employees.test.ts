import request from 'supertest';
import App from '@/app';
import { CreateEmployeeDto } from '@dtos/employees.dto';
import { CreateCompanyDto } from '@dtos/companies.dto';
import { CreateUserDto } from '@dtos/users.dto';
import EmployeeRoute from '@routes/employees.route';
import AuthService from '@services/auth.service';
import CompanyService from '@services/companies.service';

let token = null;
let companyId = null;
let employeeId = null;
const companyService = new CompanyService();

beforeAll(async () => {
  const employeeData: CreateUserDto = {
    email: 'test@test.com',
    password: '12345',
  };

  const companyData: CreateCompanyDto = {
    name: 'companyTESTEmployee',
    email: 'email@email.com',
    phone: '4345345',
    website: 'www.mywebsite.com',
  };

  const authService = new AuthService();

  const auth = await authService.login(employeeData);
  token = auth.tokenData.token;

  const company = await companyService.createCompany(companyData);
  companyId = company.id;
});

afterAll(async () => {
  await companyService.deleteCompany(companyId);
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('[POST] /employees', () => {
  it('response Create employee', async () => {
    const employeeData: CreateEmployeeDto = {
      firstName: 'testUser@test.com',
      lastName: '12345',
      email: 'email@email.es',
      phone: '32323',
      companyId: companyId.toString(),
    };

    const employeeRoute = new EmployeeRoute();

    const app = new App([employeeRoute]);
    const result = await request(app.getServer()).post(`${employeeRoute.path}`).send(employeeData).set('Authorization', `Bearer ${token}`);
    employeeId = result.body.data.id;

    return expect(result.status).toBe(201);
  });
});

describe('Testing Users', () => {
  describe('[GET] /users', () => {
    it('response findAll users', async () => {
      const employeesRoute = new EmployeeRoute();

      const app = new App([employeesRoute]);
      return request(app.getServer()).get(`${employeesRoute.path}`).set('Authorization', `Bearer ${token}`).expect(200);
    });
  });

  describe('[GET] /users/:id', () => {
    it('response findOne user', async () => {
      const employeesRoute = new EmployeeRoute();

      const app = new App([employeesRoute]);
      return request(app.getServer()).get(`${employeesRoute.path}/${employeeId}`).set('Authorization', `Bearer ${token}`).expect(200);
    });
  });

  describe('[PUT] /users/:id', () => {
    it('response Update user', async () => {
      const employeeData: CreateEmployeeDto = {
        firstName: 'testUser@testUPDATED.com',
        lastName: '12345UPDATED',
        email: 'email@emailUPDATED.es',
        phone: '32323UPDATED',
        companyId: companyId.toString(),
      };

      const employeesRoute = new EmployeeRoute();

      const app = new App([employeesRoute]);
      return request(app.getServer())
        .put(`${employeesRoute.path}/${employeeId}`)
        .send(employeeData)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
    });
  });

  describe('[DELETE] /users/:id', () => {
    it('response Delete user', async () => {
      const employeesRoute = new EmployeeRoute();

      const app = new App([employeesRoute]);
      return request(app.getServer()).delete(`${employeesRoute.path}/${employeeId}`).set('Authorization', `Bearer ${token}`).expect(200);
    });
  });
});
