import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTrackDto } from "./dto/create-track.dto";
import { UpdateTrackDto } from "./dto/update-track.dto";
import { DbService } from "@/db/db.service";
import { Track } from "@/track/entities/track.entity";

@Injectable()
export class TrackService {
  constructor(private readonly dbService: DbService) {}

  create({ name, duration, artistId, albumId }: CreateTrackDto) {
    const track = new Track(name, artistId, albumId, duration);
    return this.dbService.track.create({ data: track });
  }

  findAll() {
    return this.dbService.track.findMany();
  }

  async findOne(id: string) {
    const track = await this.dbService.track.findUnique({ where: { id } });

    if (!track) {
      throw new NotFoundException("Track not found");
    }

    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    await this.findOne(id);

    return this.dbService.track.update({
      where: { id },
      data: updateTrackDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.dbService.track.delete({ where: { id } });
  }

  async cleanAlbumId(albumId: string) {
    const trackList = await this.dbService.track.findMany({
      where: { albumId },
    });

    for (const track of trackList) {
      await this.update(track.id, { albumId: null });
    }
  }

  async cleanArtistId(artistId: string) {
    const trackList = await this.dbService.track.findMany({
      where: { artistId },
    });

    for (const track of trackList) {
      await this.update(track.id, { artistId: null });
    }
  }
}
