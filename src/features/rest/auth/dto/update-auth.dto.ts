import { IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateAuthDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: "refresh token",
    example: "0a35dd62e09f444ba628f4e7c6954f57",
    required: true,
  })
  refreshToken?: string;
}
