import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export default class ExtractToken {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    public async getUserIdFromToken(bearerToken: string): Promise<any> {
        console.log("TOKEN ", bearerToken)
        const [_, token] = bearerToken.split(' ');
        if (!token) {
          throw new Error('Invalid authorization header format');
        }
        return await this.jwtService.verify(token, this.configService.get('JWT_SECRET'));
    }
}
