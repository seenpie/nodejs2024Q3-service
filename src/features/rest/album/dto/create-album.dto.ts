import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateAlbumDto {
  @ApiProperty({ description: "Album's name", example: "123" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: "Artist's year", example: "2000" })
  @IsNumber()
  @IsNotEmpty()
  year: number;

  @ApiProperty({
    description: "Album's artist id",
    example: "0a35dd62-e09f-444b-a628-f4e7c6954f57",
  })
  @IsString()
  @IsOptional()
  artistId: string | null;
}
