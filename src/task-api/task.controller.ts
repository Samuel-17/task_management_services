import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { JwtAuthGuard } from 'src/auth/guardtoken.jwt';
import ExtractToken from 'src/utils/extract.token';
import { SuccessResponse } from 'src/utils/type/SuccessResponse';

@Controller('task')
export class AppController {
  constructor(
    private readonly taskService: TaskService,
    private readonly extractToken: ExtractToken,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('list')
  list(): string {
    return this.taskService.list();
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  create(
    @Req() request: any,
    @Body('description') description: string,
    @Body('developerId') developerId: string,
    @Body('testerId') testerId: string,
    @Body('time') time: number,
  ): Promise<SuccessResponse> {
    return this.taskService
      .create(
        description,
        developerId,
        testerId,
        request.headers.authorization,
        time,
      )
      .then(() => ({
        message: 'Task created successfully',
        status: 'success',
      }));
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update/:id')
  update(
    @Param("id") id: string,
    @Req() request: any,
    @Body('description') description: string,
    @Body('developerId') developerId: string,
    @Body('testerId') testerId: string,
    @Body('time') time: number,
  ) {
    
    this.taskService.update(
      id,
      description,
      developerId,
      testerId,
      request.headers.authorization,
      time,
    );
  }
}
