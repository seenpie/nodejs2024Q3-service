import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  ValidationPipe,
  HttpCode,
  Put,
  HttpStatus,
} from "@nestjs/common";
import { AlbumService } from "./album.service";
import { CreateAlbumDto } from "./dto/create-album.dto";
import { UpdateAlbumDto } from "./dto/update-album.dto";
import {
  ApiOperationDeleteById,
  ApiOperationGetAll,
  ApiOperationGetById,
  ApiOperationPost,
  ApiOperationPutById,
} from "@/decorators/api-operation.decorator";
import { Album } from "@/album/entities/album.entity";

@Controller("album")
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @ApiOperationPost("album")
  create(@Body(new ValidationPipe()) createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  @ApiOperationGetAll("album")
  findAll() {
    return this.albumService.findAll();
  }

  @Get(":id")
  @ApiOperationGetById("album", Album)
  findOne(@Param("id", ParseUUIDPipe) id: string) {
    return this.albumService.findOne(id);
  }

  @Put(":id")
  @ApiOperationPutById("album")
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return this.albumService.update(id, updateAlbumDto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperationDeleteById("album")
  remove(@Param("id", ParseUUIDPipe) id: string) {
    return this.albumService.remove(id);
  }
}
