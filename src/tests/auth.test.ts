import request from 'supertest';
import App from '@/app';
import { CreateUserDto } from '@dtos/users.dto';
import AuthRoute from '@routes/auth.route';
import UserService from '@services/users.service';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Auth', () => {
  describe('[POST] /signup', () => {
    it('response should have the Create userData', async () => {
      const userData: CreateUserDto = {
        email: 'test@test.com',
        password: '12345',
      };

      const userService = new UserService();
      try {
        const findUser = await userService.findUserByEmail(userData);

        if (findUser) {
          await userService.deleteUser(findUser.id);
        }
      } catch (e) {}
      const authRoute = new AuthRoute();

      const app = new App([authRoute]);
      return request(app.getServer()).post(`${authRoute.path}signup`).send(userData).expect(201);
    });
  });

  describe('[POST] /login', () => {
    it('response should have the Set-Cookie header with the Authorization token', async () => {
      const userData: CreateUserDto = {
        email: 'test@test.com',
        password: '12345',
      };

      const authRoute = new AuthRoute();

      const app = new App([authRoute]);
      return request(app.getServer())
        .post(`${authRoute.path}login`)
        .send(userData)
        .expect('Set-Cookie', /^Authorization=.+/);
    });
  });
});
