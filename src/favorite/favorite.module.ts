import { Module } from "@nestjs/common";
import { FavoriteService } from "./favorite.service";
import { FavoriteController } from "./favorite.controller";
import { DbModule } from "@/db/db.module";
import { ArtistModule } from "@/artist/artist.module";
import { TrackModule } from "@/track/track.module";
import { AlbumModule } from "@/album/album.module";

@Module({
  imports: [DbModule, ArtistModule, TrackModule, AlbumModule],
  controllers: [FavoriteController],
  providers: [FavoriteService],
})
export class FavoriteModule {}
