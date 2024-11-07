import { IAlbum } from "@/album/entities/album.interface";
import { ITrack } from "@/track/entities/track.interface";
import { IArtist } from "@/artist/entities/artist.interface";

export interface IFavorite {
  albums: IAlbum[];
  tracks: ITrack[];
  artists: IArtist[];
}
