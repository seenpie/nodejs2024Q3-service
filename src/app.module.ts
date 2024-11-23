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
import { AuthModule } from "./auth/auth.module";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "@/auth/guards/auth.guard";
import { TokenModule } from "@/token/token.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    DbModule,
    ArtistModule,
    TrackModule,
    AlbumModule,
    FavoriteModule,
    TokenModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: AuthGuard }],
})
export class AppModule {}
