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

@Injectable()
export class UserService {
  constructor(private readonly dbService: DbService) {}

  private _serialize(data: IUser) {
    const { password: _, updatedAt, createdAt, ...other } = data;
    return {
      ...other,
      updatedAt: updatedAt.getTime(),
      createdAt: createdAt.getTime(),
    };
  }

  async create({ login, password }: CreateUserDto) {
    const user = new User(login, password);
    const result = await this.dbService.user.create({
      data: user,
    });

    return this._serialize(result);
  }

  findAll() {
    return this.dbService.user.findMany();
  }

  async findOne(id: string) {
    const user = await this.dbService.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    if (user.password !== updateUserDto.oldPassword) {
      throw new ForbiddenException("Incorrect old password");
    }

    const updatedUser = new User(
      user.login,
      updateUserDto.newPassword,
      id,
      user.createdAt,
      user.version + 1,
    );

    const result = await this.dbService.user.update({
      where: { id: id },
      data: updatedUser,
    });

    return this._serialize(result);
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.dbService.user.delete({ where: { id } });
  }
}
