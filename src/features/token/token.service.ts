import { ForbiddenException, Injectable } from "@nestjs/common";
import { Token } from "@/features/token/entities/token.entity";
import { JwtService, JwtSignOptions } from "@nestjs/jwt";
import { CreateTokenDto } from "./dto/create-token.dto";
import { ConfigService } from "@nestjs/config";
import { EnvAliases } from "@/common/enums/env-alliases.enum";

enum OptionKeys {
  SECRET = "secret",
  EXPIRES_IN = "expiresIn",
}

type OptionArg = {
  key: OptionKeys;
  value: string;
};

@Injectable()
export class TokenService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  private _createOption(...args: OptionArg[]): JwtSignOptions {
    return args.reduce((acc, { key, value }) => {
      acc[key] = value;
      return acc;
    }, {});
  }

  private _createAccessToken(createTokenDto: CreateTokenDto) {
    const option = this._createOption(
      {
        key: OptionKeys.SECRET,
        value: this.configService.get(EnvAliases.JWT_SECRET_KEY),
      },
      {
        key: OptionKeys.EXPIRES_IN,
        value: this.configService.get(EnvAliases.TOKEN_EXPIRE_TIME),
      },
    );

    return this._createToken(createTokenDto, option);
  }

  private _createRefreshToken(createTokenDto: CreateTokenDto) {
    const option = this._createOption(
      {
        key: OptionKeys.SECRET,
        value: this.configService.get(EnvAliases.JWT_SECRET_REFRESH_KEY),
      },
      {
        key: OptionKeys.EXPIRES_IN,
        value: this.configService.get(EnvAliases.TOKEN_REFRESH_EXPIRE_TIME),
      },
    );

    return this._createToken(createTokenDto, option);
  }

  private _createToken(
    createTokenDto: CreateTokenDto,
    options: JwtSignOptions,
  ) {
    return this.jwtService.sign(createTokenDto, options);
  }

  async verifyToken(
    token: string,
    value = this.configService.get(EnvAliases.JWT_SECRET_KEY),
  ) {
    const option = this._createOption({
      key: OptionKeys.SECRET,
      value,
    });

    try {
      return await this.jwtService.verify(token, option);
    } catch (_error) {
      throw new ForbiddenException("Token is invalid");
    }
  }

  async refreshToken(refreshToken: string) {
    const payload = await this.verifyToken(
      refreshToken,
      this.configService.get(EnvAliases.JWT_SECRET_REFRESH_KEY),
    );

    return this.getToken({ login: payload.login, userId: payload.userId });
  }

  getToken(createTokenDto: CreateTokenDto) {
    const accessToken = this._createAccessToken(createTokenDto);
    const refreshToken = this._createRefreshToken(createTokenDto);
    return new Token(accessToken, refreshToken);
  }
}
