import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import {
  ApiOperationLogin,
  ApiOperationRefresh,
  ApiOperationSignup,
} from "@/common/decorators/api-operation.decorator";
import { Public } from "@/common/decorators/public.decorator";
import { CreateAuthDto } from "@/features/rest/auth/dto/create-auth.dto";
import { UpdateAuthDto } from "@/features/rest/auth/dto/update-auth.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  @Public()
  @ApiOperationSignup()
  signup(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.signup(createAuthDto);
  }

  @Post("login")
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperationLogin()
  login(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.login(createAuthDto);
  }

  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  @ApiOperationRefresh()
  refresh(@Body() updateAuthDto: UpdateAuthDto) {
    if (!updateAuthDto.refreshToken) {
      throw new UnauthorizedException("Refresh token is missing");
    }

    return this.authService.refresh(updateAuthDto);
  }
}
