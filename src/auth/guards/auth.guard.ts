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
import { LoggingService } from "@/logging/logging.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly tokenService: TokenService,
    private readonly loggingService: LoggingService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    this.loggingService.logRequest(request);

    const isPublic = this.reflector.get(IS_PUBLIC, context.getHandler());
    if (isPublic) return true;

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
