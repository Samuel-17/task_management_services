import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;

    if (!token || !token.startsWith('Bearer ')) {
      return false;
    }

    const jwtToken = token.split(' ')[1];

    try {
      const decoded = this.jwtService.verify(jwtToken);
      request.user = decoded; // Adiciona o usuário decodificado ao objeto de solicitação
      return true;
    } catch (error) {
      return false;
    }
  }
}
