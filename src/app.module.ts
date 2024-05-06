// app.module.ts

import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from "./task-api/task.module"

@Module({
  imports: [UserModule, AuthModule, TaskModule],
})
export class AppModule {}
