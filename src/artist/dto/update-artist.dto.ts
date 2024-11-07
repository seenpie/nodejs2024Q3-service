import { PartialType } from "@nestjs/mapped-types";
import { CreateArtistDto } from "./create-artist.dto";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateArtistDto extends PartialType(CreateArtistDto) {
  @ApiProperty({
    description: "Artist's name",
    example: "123",
    required: false,
  })
  name?: string;

  @ApiProperty({
    description: "Artist's grammy status",
    example: true,
    required: false,
  })
  grammy?: boolean;
}
