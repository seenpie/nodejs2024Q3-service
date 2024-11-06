import { IAlbum } from "@/album/entities/album.interface";
import { generateId } from "@/utils/generateId";

export class Album implements IAlbum {
  public id = generateId();

  constructor(
    public name: string,
    public year: number,
    public artistId: string,
  ) {
    this.artistId = artistId ?? null;
  }
}
