import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  ValidationPipe,
  Put,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { TrackService } from "./track.service";
import { CreateTrackDto } from "./dto/create-track.dto";
import { UpdateTrackDto } from "./dto/update-track.dto";
import { Track } from "@/features/rest/track/entities/track.entity";
import {
  ApiOperationDeleteById,
  ApiOperationGetAll,
  ApiOperationGetById,
  ApiOperationPost,
  ApiOperationPutById,
} from "@/common/decorators/api-operation.decorator";

@Controller("track")
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @ApiOperationPost("track")
  create(@Body(new ValidationPipe()) createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  @ApiOperationGetAll("track")
  findAll() {
    return this.trackService.findAll();
  }

  @Get(":id")
  @ApiOperationGetById("track", Track)
  findOne(@Param("id", ParseUUIDPipe) id: string) {
    return this.trackService.findOne(id);
  }

  @Put(":id")
  @ApiOperationPutById("track")
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    return this.trackService.update(id, updateTrackDto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperationDeleteById("track")
  remove(@Param("id", ParseUUIDPipe) id: string) {
    return this.trackService.remove(id);
  }
}
