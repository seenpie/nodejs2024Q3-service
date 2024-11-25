import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ValidationPipe,
  ParseUUIDPipe,
  HttpCode,
  Put,
  HttpStatus,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiResponse } from "@nestjs/swagger";
import { User } from "@/features/rest/user/entities/user.entity";
import {
  ApiOperationDeleteById,
  ApiOperationGetAll,
  ApiOperationGetById,
  ApiOperationPost,
  ApiOperationPutById,
} from "@/common/decorators/api-operation.decorator";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperationPost("user")
  create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperationGetAll("user")
  findAll() {
    return this.userService.findAll();
  }

  @Get(":id")
  @ApiOperationGetById("user", User)
  findOne(@Param("id", ParseUUIDPipe) id: string) {
    return this.userService.findOne(id);
  }

  @Put(":id")
  @ApiOperationPutById("user")
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: "oldPassword is wrong",
  })
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body(new ValidationPipe()) updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperationDeleteById("user")
  remove(@Param("id", ParseUUIDPipe) id: string) {
    return this.userService.remove(id);
  }
}
