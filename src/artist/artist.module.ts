import { Module } from "@nestjs/common";
import { ArtistService } from "./artist.service";
import { ArtistController } from "./artist.controller";
import { DbModule } from "@/db/db.module";
import { TrackModule } from "@/track/track.module";
import { AlbumModule } from "@/album/album.module";

@Module({
  imports: [DbModule, TrackModule, AlbumModule],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
