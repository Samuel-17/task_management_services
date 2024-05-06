import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { hash } from 'bcrypt';

interface IUser {
  username: string;
  name: string;
  password: string;
  userType: 'ADMIN' | 'DEVELOPER' | 'TESTER' | 'NORMAL';
}

@Injectable()
export class UserService {
  private readonly users: any[] = [];
  constructor(private readonly prisma: UserRepository) {}

  list(): any {
    return this.prisma.task.findMany();
  }

  async findByUserName(username: string): Promise<any> {
    return await this.prisma.user.findFirst({
      where: {
        username,
      },
    });
  }

  async create({ username, name, password, userType }: IUser) {
    const hashPass = await hash(password, 8);
    return await this.prisma.user.create({
      data: {
        username: username,
        name: name,
        password: hashPass,
        userType: userType,
      },
    });
  }
}
