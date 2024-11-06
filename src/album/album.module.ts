import { Module } from "@nestjs/common";
import { AlbumService } from "./album.service";
import { AlbumController } from "./album.controller";
import { DbModule } from "@/db/db.module";
import { TrackModule } from "@/track/track.module";

@Module({
  imports: [DbModule, TrackModule],
  controllers: [AlbumController],
  providers: [AlbumService],
  exports: [AlbumService],
})
export class AlbumModule {}
