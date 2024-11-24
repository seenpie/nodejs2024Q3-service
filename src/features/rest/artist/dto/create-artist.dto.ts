import { IsBoolean, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateArtistDto {
  @ApiProperty({ description: "Artist's name", example: "123" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: "Artist's grammy status", example: true })
  @IsBoolean()
  @IsNotEmpty()
  grammy: boolean;
}
