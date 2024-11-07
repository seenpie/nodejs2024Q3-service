import { IFavorite } from "@/favorite/entities/favorite.interface";
import { ApiProperty } from "@nestjs/swagger";
import { Album } from "@/album/entities/album.entity";
import { Track } from "@/track/entities/track.entity";
import { Artist } from "@/artist/entities/artist.entity";

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
