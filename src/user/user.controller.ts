import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("list")
  get(): string {
    return this.userService.list();
  }

  @Post('create')
  create(
    @Body("username") username: string,
    @Body("name") name: string,
    @Body("password") password: string,
    @Body("userType") userType: "ADMIN" | "DEVELOPER" | "TESTER" | "NORMAL",
  ): Promise<any> {
    return this.userService.create({username, name, userType, password});
  }

}
