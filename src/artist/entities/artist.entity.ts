import { IArtist } from "@/artist/entities/artist.interface";
import { generateId } from "@/utils/generateId";
import { ApiProperty } from "@nestjs/swagger";

export class Artist implements IArtist {
  @ApiProperty({
    description: "Artist ID",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  public id = generateId();

  @ApiProperty({
    description: "Artist name",
    example: "potter",
  })
  public name: string;

  @ApiProperty({
    description: "artist grammy status",
    example: true,
  })
  public grammy: boolean;

  constructor(name: string, grammy: boolean) {
    this.name = name;
    this.grammy = grammy;
  }
}
