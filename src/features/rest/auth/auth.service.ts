import { Injectable } from "@nestjs/common";
import { UserService } from "@/features/rest/user/user.service";
import { TokenService } from "@/features/token/token.service";
import { CreateAuthDto } from "@/features/rest/auth/dto/create-auth.dto";
import { UpdateAuthDto } from "@/features/rest/auth/dto/update-auth.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  signup(createAuthDto: CreateAuthDto) {
    return this.userService.create(createAuthDto);
  }

  async login(createAuthDto: CreateAuthDto) {
    const { id, login } = await this.userService.findOneByDto(createAuthDto);
    return this.tokenService.getToken({ userId: id, login });
  }

  async refresh({ refreshToken }: UpdateAuthDto) {
    return await this.tokenService.refreshToken(refreshToken);
  }
}
