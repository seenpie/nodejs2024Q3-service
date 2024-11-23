import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { TokenService } from "@/token/token.service";
import { IS_PUBLIC } from "@/common/constants/public.constant";
import { AUTH_SCHEMA } from "@/auth/constants/auth.constant";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly tokenService: TokenService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get(IS_PUBLIC, context.getHandler());
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();

    if (request.method === "POST" && request.url === "/auth/refresh") {
      return true;
    }

    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException("Authorization header is missing");
    }

    const [authSchema, accessToken] = authHeader.split(" ");
    if (authSchema !== AUTH_SCHEMA || !accessToken) {
      throw new UnauthorizedException("Authorization header is incorrect");
    }

    await this.tokenService.verifyToken(accessToken);

    return true;
  }
}
