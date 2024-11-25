import { Module } from "@nestjs/common";
import { ArtistService } from "./artist.service";
import { ArtistController } from "./artist.controller";
import { DbModule } from "@/features/db/db.module";
import { TrackModule } from "@/features/rest/track/track.module";
import { AlbumModule } from "@/features/rest/album/album.module";

@Module({
  imports: [DbModule, TrackModule, AlbumModule],
  controllers: [ArtistController],
  providers: [ArtistService],
  exports: [ArtistService],
})
export class ArtistModule {}
