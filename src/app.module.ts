import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "@/app.controller";
import { AppService } from "@/app.service";
import { UserModule } from "./user/user.module";
import { DbModule } from "@/db/db.module";
import { ArtistModule } from "./artist/artist.module";
import { TrackModule } from "./track/track.module";
import { AlbumModule } from "./album/album.module";
import { FavoriteModule } from "./favorite/favorite.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    DbModule,
    ArtistModule,
    TrackModule,
    AlbumModule,
    FavoriteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
