import { SongsType } from "../types/global";
import Tracklist from "./tracklist";

type Props = {
  playlistTracks: SongsType[];
  removeTrack: (track: SongsType) => void;
  addTrack: (track: SongsType) => void;
  playlistName: string;
  setPlaylistName: (newValue: string) => void;
  savePlaylist: (name: "New Playlist" | string) => void;
};

const Playlist = ({
  playlistTracks,
  removeTrack,
  addTrack,
  playlistName,
  setPlaylistName,
  savePlaylist,
}: Props) => {
  return (
    <div className="playlist">
      <input
        defaultValue={playlistName}
        onChange={(e) => {
          setPlaylistName(e.target.value);
        }}
        className="playlist__input"
      />
      <hr />
      <Tracklist
        addTrack={addTrack}
        data={playlistTracks}
        isRemoval={true}
        removeTrack={removeTrack}
      />
      <button
        className="playlist__btn"
        onClick={() => {
          savePlaylist(playlistName);
          console.log("Playlist sucessfully saved!");
          alert("Playlist sucessfully saved");
        }}
      >
        SAVE TO SPOTIFY
      </button>
    </div>
  );
};

export default Playlist;
