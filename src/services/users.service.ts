import { hash } from 'bcrypt';
import DB from '@databases';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import { isEmpty } from '@utils/util';

class UserService {
  public users = DB.Users;

  public async findAllUser(): Promise<User[]> {
    const allUser: User[] = await this.users.findAll();
    return allUser;
  }

  public async findUserById(userId: number): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, 'Empty content');

    const findUser: User = await this.users.findByPk(userId);
    if (!findUser) throw new HttpException(409, 'User does not exist');

    return findUser;
  }

  public async findUserByEmail(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'Empty content');

    const findUser: User = await this.users.findOne({ where: { email: userData.email } });
    if (!findUser) throw new HttpException(409, 'User does not exist');

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'Empty content');

    const findUser: User = await this.users.findOne({ where: { email: userData.email } });
    if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await this.users.create({ ...userData, password: hashedPassword });
    return createUserData;
  }

  public async updateUser(userId: number, userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'Empty content');

    const findUser: User = await this.users.findByPk(userId);
    if (!findUser) throw new HttpException(409, 'User does not exist');

    const hashedPassword = await hash(userData.password, 10);
    await this.users.update({ ...userData, password: hashedPassword }, { where: { id: userId } });

    const updateUser: User = await this.users.findByPk(userId);
    return updateUser;
  }

  public async deleteUser(userId: number): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, 'Empty content');

    const findUser: User = await this.users.findByPk(userId);
    if (!findUser) throw new HttpException(409, 'User does not exist');

    await this.users.destroy({ where: { id: userId } });

    return findUser;
  }

  public async changeToSuperUser(userId: number): Promise<String> {
    if (isEmpty(userId)) throw new HttpException(400, 'Empty content');

    const findUser: User = await this.users.findByPk(userId);
    if (!findUser) throw new HttpException(409, 'User does not exist');

    await this.users.update({ role: 1 }, { where: { id: userId } });

    return 'Now you can delete companies';
  }
}

export default UserService;
