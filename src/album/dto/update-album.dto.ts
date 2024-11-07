import { PartialType } from "@nestjs/mapped-types";
import { CreateAlbumDto } from "./create-album.dto";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {
  @ApiProperty({ description: "Album's name", example: "123", required: false })
  name?: string;

  @ApiProperty({
    description: "Artist's year",
    example: "2000",
    required: false,
  })
  year?: number;

  @ApiProperty({
    description: "Album's artist id",
    example: "0a35dd62-e09f-444b-a628-f4e7c6954f57",
    nullable: true,
    required: false,
  })
  artistId?: string | null;
}
