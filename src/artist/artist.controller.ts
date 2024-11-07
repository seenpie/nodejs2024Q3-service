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
import { ArtistService } from "./artist.service";
import { CreateArtistDto } from "./dto/create-artist.dto";
import { UpdateArtistDto } from "./dto/update-artist.dto";
import {
  ApiOperationDeleteById,
  ApiOperationGetAll,
  ApiOperationGetById,
  ApiOperationPost,
  ApiOperationPutById,
} from "@/utils/swagger/ApiOperationDecs";
import { Artist } from "@/artist/entities/artist.entity";

@Controller("artist")
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  @ApiOperationPost("artist")
  create(@Body(new ValidationPipe()) createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  @ApiOperationGetAll("artist")
  findAll() {
    return this.artistService.findAll();
  }

  @Get(":id")
  @ApiOperationGetById("artist", Artist)
  findOne(@Param("id", ParseUUIDPipe) id: string) {
    return this.artistService.findOne(id);
  }

  @Put(":id")
  @ApiOperationPutById("artist")
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    return this.artistService.update(id, updateArtistDto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperationDeleteById("artist")
  remove(@Param("id", ParseUUIDPipe) id: string) {
    return this.artistService.remove(id);
  }
}
