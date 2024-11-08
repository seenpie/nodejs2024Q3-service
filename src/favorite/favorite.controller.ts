import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
} from "@nestjs/common";
import { FavoriteService } from "./favorite.service";

@Controller("favs")
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get()
  findFirst() {
    return this.favoriteService.findFirst();
  }

  @Post("album/:id")
  addAlbum(@Param("id", ParseUUIDPipe) id: string) {
    return this.favoriteService.add("album", id);
  }

  @Post("artist/:id")
  addArtist(@Param("id", ParseUUIDPipe) id: string) {
    return this.favoriteService.add("artist", id);
  }

  @Post("track/:id")
  addTrack(@Param("id", ParseUUIDPipe) id: string) {
    return this.favoriteService.add("track", id);
  }

  @Delete("album/:id")
  @HttpCode(204)
  removeAlbum(@Param("id", ParseUUIDPipe) id: string) {
    return this.favoriteService.remove("album", id);
  }

  @Delete("artist/:id")
  @HttpCode(204)
  removeArtist(@Param("id", ParseUUIDPipe) id: string) {
    return this.favoriteService.remove("artist", id);
  }

  @Delete("track/:id")
  @HttpCode(204)
  removeTrack(@Param("id", ParseUUIDPipe) id: string) {
    return this.favoriteService.remove("track", id);
  }
}
