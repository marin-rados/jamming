export type ImagesType = {
  url: string;
};

export type AlbumType = {
  id: string;
  name: string;
  release_date: string;
  uri: string;
  images: ImagesType[];
};

export type ArtistsType = {
  external_urls: {
    spotify: string;
  };
  name: string;
};

export type SongsType = {
  album: AlbumType;
  artists: ArtistsType[];
  name: string;
  id: string;
  uri: string;
  external_urls: {
    spotify: string;
  };
};

export type DataType = {
  data: SongsType[];
};

// export type ComponentTypes = {
//   playlistTracks?: SongsType[];
//   removeTrack: (track: SongsType) => void;
//   addTrack: (track: SongsType) => void;
//   playlistName?: string;
//   setPlaylistName?: (newValue: string) => void;
//   savePlaylist?: (name: "New Playlist" | string) => void;
//   data: SongsType[];
//   search?: (song: string) => void | undefined;
//   isRemoval?: boolean | undefined;
//   track?: SongsType;
// };
