import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateTrackDto {
  @ApiProperty({ description: "Track's name", example: "123" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: "Track's duration", example: "123" })
  @IsNumber()
  @IsNotEmpty()
  duration: number;

  @ApiProperty({
    description: "Track's artist id",
    example: "0a35dd62-e09f-444b-a628-f4e7c6954f57",
    nullable: true,
  })
  @IsUUID()
  @IsOptional()
  artistId: string | null;

  @ApiProperty({
    description: "Track's album id",
    example: "0a35dd62-e09f-444b-a628-f4e7c6954f57",
    nullable: true,
  })
  @IsUUID()
  @IsOptional()
  albumId: string | null;
}
