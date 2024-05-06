import { Injectable } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import ExtractToken from 'src/utils/extract.token';

@Injectable()
export class TaskService {
  constructor(
    private readonly prisma: TaskRepository,
    private readonly extractToken: ExtractToken,
  ) {}

  list(): any {
    return this.prisma.task.findMany();
  }

  async create(description, developerId, testerId, token, time) {
    const { sub }: any = await this.extractToken.getUserIdFromToken(token);
    try {

      await this.prisma.user.findUnique({
        where: {
          id: sub,
        },
      }).catch(()=>{
        throw new Error('User not found')
      });

      await this.prisma.user.findUnique({
        where: {
          id: developerId,
        },
      }).catch(()=>{
        throw new Error('Developer not found')
      });

      await this.prisma.user.findUnique({
        where: {
          id: testerId,
        },
      }).catch(()=>{
        throw new Error('Tester not found')
      });

      return await this.prisma.task.create({
        data: {
          description,
          createdBy: {
            connect: { id: sub },
          },
          developer: { connect: { id: developerId } },
          tester: { connect: { id: testerId } },
          time: time,
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id ,description, developerId, testerId, token ,time) {
    const { sub }: any = await this.extractToken.getUserIdFromToken(token);

    console.log(`update ${id} ${description} `);

    return await this.prisma.task.update({
      where: {
        id: id
      },
      data: {
        description: description,
        developer: { connect: { id: developerId } },
        tester: { connect: { id: testerId } },
        time: time,
        updatedAt: new Date(),
      }
    })

  }
}
