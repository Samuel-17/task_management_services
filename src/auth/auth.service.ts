import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthResponseDto } from './dto/auth.response.dto';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { promises } from 'dns';

@Injectable()
export class AuthService {
  private jwtExpirationTimeInSeconds: number;
  constructor(
    private readonly userServices: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtExpirationTimeInSeconds = +this.configService.get<number>(
      'JWT_EXPIRATION_TIME',
    );
  }

  async signIn(username: string, password: string): Promise<AuthResponseDto> {
    const foundedUser: any = await this.userServices.findByUserName(username);

    console.log('ENTER ', foundedUser);

    if (!foundedUser || !compareSync(password, foundedUser?.password)) {
      throw new UnauthorizedException();
    }

    const payload = { sub: foundedUser.id, username: foundedUser.username };

    const token = this.jwtService.sign(payload);

    return { token: token, expiresIn: this.jwtExpirationTimeInSeconds };
  }
}
