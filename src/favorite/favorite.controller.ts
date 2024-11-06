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

  @Post(":endpoint/:id")
  add(
    @Param("endpoint") endpoint: string,
    @Param("id", ParseUUIDPipe) id: string,
  ) {
    return this.favoriteService.add(endpoint, id);
  }

  @Delete(":endpoint/:id")
  @HttpCode(204)
  remove(
    @Param("endpoint") endpoint: string,
    @Param("id", ParseUUIDPipe) id: string,
  ) {
    return this.favoriteService.remove(endpoint, id);
  }
}
