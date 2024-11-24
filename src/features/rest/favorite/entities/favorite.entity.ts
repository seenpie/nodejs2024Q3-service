import { IFavorite } from "@/features/rest/favorite/entities/favorite.interface";
import { ApiProperty } from "@nestjs/swagger";
import { Album } from "@/features/rest/album/entities/album.entity";
import { Track } from "@/features/rest/track/entities/track.entity";
import { Artist } from "@/features/rest/artist/entities/artist.entity";

export class Favorite implements IFavorite {
  @ApiProperty({
    description: "albums list",
    type: Album,
  })
  public albums = [];

  @ApiProperty({
    description: "tracks list",
    type: Track,
  })
  public tracks = [];

  @ApiProperty({
    description: "artists list",
    type: Artist,
  })
  public artists = [];
}
