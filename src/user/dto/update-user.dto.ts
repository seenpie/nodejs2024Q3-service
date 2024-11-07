import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";
import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ description: "User's old password" })
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({ description: "User's new password" })
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
