import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from "@nestjs/common";
import { DbService } from "@/features/db/db.service";

@Injectable()
export class FavoriteService {
  constructor(private readonly dbService: DbService) {}

  private async _addTrack(trackId: string) {
    try {
      const { id } = await this.findFirst();

      return await this.dbService.favorite.update({
        where: { id },
        data: { tracks: { connect: { id: trackId } } },
        include: { tracks: true },
      });
    } catch (_error) {
      throw new UnprocessableEntityException("Invalid data");
    }
  }

  private async _removeTrack(trackId: string) {
    try {
      const { id } = await this.dbService.favorite.findFirstOrThrow({
        where: { tracks: { some: { id: trackId } } },
      });

      return await this.dbService.favorite.update({
        where: { id },
        data: { tracks: { disconnect: { id: trackId } } },
      });
    } catch (_error) {
      throw new NotFoundException("Track is not in favorite");
    }
  }

  private async _addAlbum(albumId: string) {
    try {
      const { id } = await this.findFirst();

      return await this.dbService.favorite.update({
        where: { id },
        data: { albums: { connect: { id: albumId } } },
        include: { albums: true },
      });
    } catch (_error) {
      throw new UnprocessableEntityException("Invalid data");
    }
  }

  private async _removeAlbum(albumId: string) {
    try {
      const { id } = await this.dbService.favorite.findFirstOrThrow({
        where: { albums: { some: { id: albumId } } },
      });

      return this.dbService.favorite.update({
        where: { id },
        data: { albums: { disconnect: { id: albumId } } },
      });
    } catch (_error) {
      throw new NotFoundException("Track is not in favorite");
    }
  }

  private async _addArtist(artistId: string) {
    try {
      const { id } = await this.findFirst();

      return await this.dbService.favorite.update({
        where: { id },
        data: { artists: { connect: { id: artistId } } },
        include: { artists: true },
      });
    } catch (_error) {
      throw new UnprocessableEntityException("Invalid data");
    }
  }

  private async _removeArtist(artistId: string) {
    try {
      const { id } = await this.dbService.favorite.findFirstOrThrow({
        where: { artists: { some: { id: artistId } } },
      });

      return this.dbService.favorite.update({
        where: { id },
        data: { artists: { disconnect: { id: artistId } } },
      });
    } catch (_error) {
      throw new NotFoundException("Track is not in favorite");
    }
  }

  async findFirst() {
    return this.dbService.favorite.findFirst({
      include: { albums: true, artists: true, tracks: true },
    });
  }

  remove(endpoint: string, id: string) {
    switch (endpoint) {
      case "track":
        return this._removeTrack(id);
      case "album":
        return this._removeAlbum(id);
      case "artist":
        return this._removeArtist(id);
      default:
        throw new NotFoundException("endpoint not found");
    }
  }

  add(endpoint: string, id: string) {
    switch (endpoint) {
      case "track":
        return this._addTrack(id);
      case "album":
        return this._addAlbum(id);
      case "artist":
        return this._addArtist(id);
      default:
        throw new NotFoundException("endpoint not found");
    }
  }
}
