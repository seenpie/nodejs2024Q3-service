import { IAlbum } from "@/album/entities/album.interface";
import { generateId } from "@/utils/generateId";
import { ApiProperty } from "@nestjs/swagger";

export class Album implements IAlbum {
  @ApiProperty({
    description: "Album ID",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  public id = generateId();

  @ApiProperty({
    description: "Album name",
    example: "album",
  })
  public name: string;

  @ApiProperty({
    description: "Album year",
    example: 2000,
  })
  public year: number;

  @ApiProperty({
    description: "Artist ID",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  public artistId: string;

  constructor(name: string, year: number, artistId: string) {
    this.name = name;
    this.year = year;
    this.artistId = artistId ?? null;
  }
}
