import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateArtistDto } from "./dto/create-artist.dto";
import { UpdateArtistDto } from "./dto/update-artist.dto";
import { DbService } from "@/db/db.service";
import { Artist } from "@/artist/entities/artist.entity";

@Injectable()
export class ArtistService {
  constructor(private readonly dbService: DbService) {}

  create({ name, grammy }: CreateArtistDto) {
    const artist = new Artist(name, grammy);
    return this.dbService.artist.create({ data: artist });
  }

  findAll() {
    return this.dbService.artist.findMany();
  }

  async findOne(id: string) {
    const artist = await this.dbService.artist.findUnique({ where: { id } });

    if (!artist) {
      throw new NotFoundException("Artist not found");
    }

    return artist;
  }

  async update(id: string, { name, grammy }: UpdateArtistDto) {
    await this.findOne(id);

    return this.dbService.artist.update({
      where: { id },
      data: { grammy, name },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.dbService.artist.delete({ where: { id } });
  }
}
