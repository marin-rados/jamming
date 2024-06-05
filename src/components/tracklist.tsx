import { SongsType } from "../types/global";
import Track from "./track";

type Props = {
  data: SongsType[];
  isRemoval: boolean;
  addTrack: (track: SongsType) => void;
  removeTrack: (track: SongsType) => void;
};

const Tracklist = ({ data, isRemoval, addTrack, removeTrack }: Props) => {
  return (
    <div className="tracklist">
      {data.map((track) => {
        return (
          <Track
            key={track.id}
            data={track}
            isRemoval={isRemoval}
            addTrack={addTrack}
            removeTrack={removeTrack}
          />
        );
      })}
    </div>
  );
};

export default Tracklist;
