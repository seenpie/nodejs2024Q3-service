import { IArtist } from "@/artist/entities/artist.interface";
import { generateId } from "@/utils/generateId";

export class Artist implements IArtist {
  public id: string;

  constructor(public name: string, public grammy: boolean, id?: string) {
    this.id = id ?? generateId();
  }
}
