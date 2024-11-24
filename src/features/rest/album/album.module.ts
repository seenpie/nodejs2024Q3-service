import { Module } from "@nestjs/common";
import { AlbumService } from "./album.service";
import { AlbumController } from "./album.controller";
import { DbModule } from "@/features/db/db.module";
import { TrackModule } from "@/features/rest/track/track.module";

@Module({
  imports: [DbModule, TrackModule],
  controllers: [AlbumController],
  providers: [AlbumService],
  exports: [AlbumService],
})
export class AlbumModule {}
