import { generateId } from "@/utils/generateId";
import { ITrack } from "@/track/entities/track.interface";

export class Track implements ITrack {
  public id = generateId();

  constructor(
    public name: string,
    public artistId: string,
    public albumId: string,
    public duration: number,
  ) {
    this.artistId = artistId ?? null;
    this.albumId = albumId ?? null;
  }
}
