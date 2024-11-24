import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ description: "User's login", example: "john_doe" })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({ description: "User's password", example: "1234" })
  @IsString()
  @IsNotEmpty()
  password: string;
}
