import { DbService } from "@/db/db.service";
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "@/user/entities/user.entity";
import { IUser } from "@/user/entities/user.interface";
import { checkEqualHashAndPlainValues, hashByBcrypt } from "@/utils/hash";
import { ConfigService } from "@nestjs/config";
import { EnvAliases } from "@/common/enums/env-alliases.enum";

@Injectable()
export class UserService {
  constructor(
    private readonly dbService: DbService,
    private readonly configService: ConfigService,
  ) {}

  private _serialize(data: IUser) {
    const { password: _, updatedAt, createdAt, ...other } = data;
    return {
      ...other,
      updatedAt: updatedAt.getTime(),
      createdAt: createdAt.getTime(),
    };
  }

  private async _comparePasswords(
    oldPassword: string,
    currentPassword: string,
  ): Promise<boolean> {
    return await checkEqualHashAndPlainValues(oldPassword, currentPassword);
  }

  private async _generatePassword(password: string): Promise<string> {
    return await hashByBcrypt(
      password,
      +this.configService.get(EnvAliases.CRYPT_SALT),
    );
  }

  async create({ login, password }: CreateUserDto) {
    const generatedPassword = await this._generatePassword(password);
    const user = new User(login, generatedPassword);
    const result = await this.dbService.user.create({
      data: user,
    });

    return this._serialize(result);
  }

  async findAll() {
    const users = await this.dbService.user.findMany();
    return users.map((user) => this._serialize(user));
  }

  async findOne(id: string) {
    const user = await this.dbService.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
  }

  async findManyByLogin(login: string) {
    return this.dbService.user.findMany({ where: { login } });
  }

  async findOneByDto({ login, password }: CreateUserDto) {
    const users = await this.findManyByLogin(login);

    if (users.length < 1) {
      throw new ForbiddenException("Incorrect login");
    }

    let foundUser: IUser | null = null;

    for (const user of users) {
      const isPasswordValid = await this._comparePasswords(
        password,
        user.password,
      );
      if (isPasswordValid) {
        foundUser = user;
        break;
      }
    }

    if (!foundUser) {
      throw new ForbiddenException("Incorrect password");
    }

    return this._serialize(foundUser);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    const isPasswordValid = await this._comparePasswords(
      updateUserDto.oldPassword,
      user.password,
    );

    if (!isPasswordValid) {
      throw new ForbiddenException("Incorrect old password");
    }

    const newPassword = await this._generatePassword(updateUserDto.newPassword);

    const result = await this.dbService.user.update({
      where: { id: id },
      data: {
        password: newPassword,
        createdAt: user.createdAt,
        version: user.version + 1,
      },
    });

    return this._serialize(result);
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.dbService.user.delete({ where: { id } });
  }
}
