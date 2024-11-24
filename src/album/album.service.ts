import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateAlbumDto } from "./dto/create-album.dto";
import { UpdateAlbumDto } from "./dto/update-album.dto";
import { DbService } from "@/db/db.service";
import { Album } from "@/album/entities/album.entity";
import { TrackService } from "@/track/track.service";
import { handleError } from "@/utils/handle-error";

@Injectable()
export class AlbumService {
  constructor(
    private readonly dbService: DbService,
    private readonly trackService: TrackService,
  ) {}

  async create({ name, year, artistId }: CreateAlbumDto) {
    const album = new Album(name, year, artistId);

    try {
      return await this.dbService.album.create({ data: album });
    } catch (error) {
      return handleError(error);
    }
  }

  findAll() {
    return this.dbService.album.findMany();
  }

  async findOne(id: string) {
    const album = await this.dbService.album.findUnique({ where: { id } });

    if (!album) {
      throw new NotFoundException("Album not found");
    }

    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    await this.findOne(id);

    return this.dbService.album.update({ where: { id }, data: updateAlbumDto });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.trackService.cleanAlbumId(id);
    return this.dbService.album.delete({ where: { id } });
  }

  async cleanArtistId(artistId: string) {
    const albumList = await this.dbService.album.findMany({
      where: { artistId },
    });

    for (const album of albumList) {
      await this.update(album.id, { artistId: null });
    }
  }
}
