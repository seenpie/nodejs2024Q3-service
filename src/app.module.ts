import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "@/app.controller";
import { AppService } from "@/app.service";
import { UserModule } from "@/features/rest/user/user.module";
import { DbModule } from "@/features/db/db.module";
import { ArtistModule } from "@/features/rest/artist/artist.module";
import { TrackModule } from "@/features/rest/track/track.module";
import { AlbumModule } from "@/features/rest/album/album.module";
import { FavoriteModule } from "@/features/rest/favorite/favorite.module";
import { AuthModule } from "@/features/rest/auth/auth.module";
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { AuthGuard } from "@/features/rest/auth/guards/auth.guard";
import { TokenModule } from "@/features/token/token.module";
import { LoggingModule } from "@/features/logging/logging.module";
import { LoggingInterceptor } from "@/features/logging/logging.interceptor";
import { ExceptionFilterModule } from "@/features/exception-filter/exception-filter.module";
import { ExceptionFilterService } from "@/features/exception-filter/exception-filter.service";

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
    LoggingModule,
    ExceptionFilterModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    { provide: APP_FILTER, useClass: ExceptionFilterService },
  ],
})
export class AppModule {}
