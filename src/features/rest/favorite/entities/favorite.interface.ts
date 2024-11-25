import { IAlbum } from "@/features/rest/album/entities/album.interface";
import { ITrack } from "@/features/rest/track/entities/track.interface";
import { IArtist } from "@/features/rest/artist/entities/artist.interface";

export interface IFavorite {
  albums: IAlbum[];
  tracks: ITrack[];
  artists: IArtist[];
}
