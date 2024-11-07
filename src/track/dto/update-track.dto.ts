import { PartialType } from "@nestjs/mapped-types";
import { CreateTrackDto } from "./create-track.dto";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateTrackDto extends PartialType(CreateTrackDto) {
  @ApiProperty({ description: "Track's name", example: "123", required: false })
  name?: string;

  @ApiProperty({
    description: "Track's duration",
    example: 123,
    required: false,
  })
  duration?: number;

  @ApiProperty({
    description: "Track's artist id",
    example: "0a35dd62-e09f-444b-a628-f4e7c6954f57",
    nullable: true,
    required: false,
  })
  artistId?: string | null;

  @ApiProperty({
    description: "Track's album id",
    example: "0a35dd62-e09f-444b-a628-f4e7c6954f57",
    nullable: true,
    required: false,
  })
  albumId?: string | null;
}
