export type TrackType = {
  id: string;
  name: string;
  artists: [
    {
      name: string;
    }
  ];
  album: {
    album: string;
  };
  uri: string;
};
