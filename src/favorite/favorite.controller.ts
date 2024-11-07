import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { FavoriteService } from "./favorite.service";
import {
  ApiOperationDeleteById,
  ApiOperationGetById,
  ApiOperationPost,
} from "@/utils/swagger/ApiOperationDecs";
import { Favorite } from "@/favorite/entities/favorite.entity";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

@Controller("favs")
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get()
  @ApiOperation({ summary: "get favorite" })
  @ApiResponse({ status: 200, type: Favorite })
  @ApiOperationGetById("favorite", Favorite)
  findFirst() {
    return this.favoriteService.findFirst();
  }

  @Post("album/:id")
  @ApiOperationPost("favorite", "album")
  addAlbum(@Param("id", ParseUUIDPipe) id: string) {
    return this.favoriteService.add("album", id);
  }

  @Post("artist/:id")
  @ApiOperationPost("favorite", "artist")
  addArtist(@Param("id", ParseUUIDPipe) id: string) {
    return this.favoriteService.add("artist", id);
  }

  @Post("track/:id")
  @ApiOperationPost("favorite", "track")
  addTrack(@Param("id", ParseUUIDPipe) id: string) {
    return this.favoriteService.add("track", id);
  }

  @Delete("album/:id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperationDeleteById("favorite", "album")
  removeAlbum(@Param("id", ParseUUIDPipe) id: string) {
    return this.favoriteService.remove("album", id);
  }

  @Delete("artist/:id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperationDeleteById("favorite", "artist")
  removeArtist(@Param("id", ParseUUIDPipe) id: string) {
    return this.favoriteService.remove("artist", id);
  }

  @Delete("track/:id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperationDeleteById("favorite", "track")
  removeTrack(@Param("id", ParseUUIDPipe) id: string) {
    return this.favoriteService.remove("track", id);
  }
}
