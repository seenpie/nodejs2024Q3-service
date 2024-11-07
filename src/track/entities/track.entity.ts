import { generateId } from "@/utils/generateId";
import { ITrack } from "@/track/entities/track.interface";
import { ApiProperty } from "@nestjs/swagger";

export class Track implements ITrack {
  @ApiProperty({
    description: "Track ID",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  public id = generateId();

  @ApiProperty({
    description: "Track name",
    example: "name",
  })
  public name: string;

  @ApiProperty({
    description: "Track's artist ID",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  public artistId: string;

  @ApiProperty({
    description: "Track's albumId ID",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  public albumId: string;

  @ApiProperty({
    description: "Track's duration",
    example: "1",
  })
  public duration: number;

  constructor(
    name: string,
    artistId: string,
    albumId: string,
    duration: number,
  ) {
    this.name = name;
    this.artistId = artistId ?? null;
    this.albumId = albumId ?? null;
    this.duration = duration;
  }
}
