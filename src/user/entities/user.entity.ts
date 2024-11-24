import { IUser } from "@/user/entities/user.interface";
import { generateId } from "@/utils/generate-Id";
import { ApiProperty } from "@nestjs/swagger";

export class User implements IUser {
  @ApiProperty({
    description: "User ID",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  public id = generateId();

  @ApiProperty({ description: "User login", example: "user123" })
  public login: string;

  public password: string;

  @ApiProperty({
    description: "Date when the user was created",
    example: new Date().toISOString(),
  })
  public createdAt = new Date();

  @ApiProperty({
    description: "Date when the user was last updated",
    example: new Date().toISOString(),
  })
  public updatedAt = new Date();

  @ApiProperty({ description: "User data version", example: 1 })
  public version = 1;

  constructor(login: string, password: string) {
    this.login = login;
    this.password = password;
  }
}
