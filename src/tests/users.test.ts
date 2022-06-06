import request from 'supertest';
import App from '@/app';
import { CreateUserDto } from '@dtos/users.dto';
import UserRoute from '@routes/users.route';
import AuthService from '@services/auth.service';

let token = null;
let userId = null;

beforeAll(async () => {
  const userData: CreateUserDto = {
    email: 'test@test.com',
    password: '12345',
  };
  const authService = new AuthService();
  const auth = await authService.login(userData);
  token = auth.tokenData.token;
});

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Users', () => {
  describe('[POST] /users', () => {
    it('response Create user', async () => {
      const userData: CreateUserDto = {
        email: 'testUser@test.com',
        password: '12345',
      };

      const usersRoute = new UserRoute();

      const app = new App([usersRoute]);
      const result = await request(app.getServer()).post(`${usersRoute.path}`).send(userData).set('Authorization', `Bearer ${token}`);
      userId = result.body.data.id;

      return expect(result.status).toBe(201);
    });
  });

  describe('[GET] /users', () => {
    it('response findAll users', async () => {
      const usersRoute = new UserRoute();

      const app = new App([usersRoute]);
      return request(app.getServer()).get(`${usersRoute.path}`).set('Authorization', `Bearer ${token}`).expect(200);
    });
  });

  describe('[GET] /users/:id', () => {
    it('response findOne user', async () => {
      const usersRoute = new UserRoute();

      const app = new App([usersRoute]);
      return request(app.getServer()).get(`${usersRoute.path}/${userId}`).set('Authorization', `Bearer ${token}`).expect(200);
    });
  });

  describe('[PUT] /users/:id', () => {
    it('response Update user', async () => {
      const userData: CreateUserDto = {
        email: 'test@testUPDATE.com',
        password: '12345Update',
      };

      const usersRoute = new UserRoute();

      const app = new App([usersRoute]);
      return request(app.getServer()).put(`${usersRoute.path}/${userId}`).send(userData).set('Authorization', `Bearer ${token}`).expect(200);
    });
  });

  describe('[DELETE] /users/:id', () => {
    it('response Delete user', async () => {
      const usersRoute = new UserRoute();

      const app = new App([usersRoute]);
      return request(app.getServer()).delete(`${usersRoute.path}/${userId}`).set('Authorization', `Bearer ${token}`).expect(200);
    });
  });
});
