import request from 'supertest';
import App from '@/app';
import { CreateCompanyDto } from '@dtos/companies.dto';
import { CreateUserDto } from '@dtos/users.dto';
import CompanyRoute from '@routes/companies.route';
import AuthService from '@services/auth.service';
import UserService from '@services/users.service';

let token = null;
let companyId = null;

beforeAll(async () => {
  const userData: CreateUserDto = {
    email: 'test@test.com',
    password: '12345',
  };
  const authService = new AuthService();
  const usersService = new UserService();
  const findUser = await usersService.findUserByEmail(userData);
  await usersService.changeToSuperUser(findUser.id);
  const auth = await authService.login(userData);
  token = auth.tokenData.token;
});

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('[POST] /companies', () => {
  it('response Create company', async () => {
    const companyData: CreateCompanyDto = {
      name: 'CompanyTEST',
      email: 'email@email.com',
      phone: '4345345',
      website: 'www.mywebsite.com',
    };

    const companiesRoute = new CompanyRoute();

    const app = new App([companiesRoute]);
    const result = await request(app.getServer()).post(`${companiesRoute.path}`).send(companyData).set('Authorization', `Bearer ${token}`);
    companyId = result.body.data.id;

    return expect(result.status).toBe(201);
  });
});

describe('[GET] /companies', () => {
  it('response findAll companies', async () => {
    const companiesRoute = new CompanyRoute();

    const app = new App([companiesRoute]);
    return request(app.getServer()).get(`${companiesRoute.path}`).set('Authorization', `Bearer ${token}`).expect(200);
  });

  describe('[GET] /companies/:id', () => {
    it('response findOne company', async () => {
      const companiesRoute = new CompanyRoute();

      const app = new App([companiesRoute]);
      return request(app.getServer()).get(`${companiesRoute.path}/${companyId}`).set('Authorization', `Bearer ${token}`).expect(200);
    });
  });

  describe('[PUT] /companies/:id', () => {
    it('response Update company', async () => {
      const companyData: CreateCompanyDto = {
        name: 'CompanyTEST',
        email: 'email2323@email.com',
        phone: '4345345323',
        website: 'www.mywebsite23.com',
      };

      const companiesRoute = new CompanyRoute();

      const app = new App([companiesRoute]);
      return request(app.getServer())
        .put(`${companiesRoute.path}/${companyId}`)
        .send(companyData)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
    });
  });

  describe('[DELETE] /companies/:id', () => {
    it('response Delete company', async () => {
      const companiesRoute = new CompanyRoute();

      const app = new App([companiesRoute]);
      return request(app.getServer()).delete(`${companiesRoute.path}/${companyId}`).set('Authorization', `Bearer ${token}`).expect(200);
    });
  });
});
