import { SongsType } from "../types/global";
import Tracklist from "./tracklist";

type Props = {
  data: SongsType[];
  addTrack: (track: SongsType) => void;
  removeTrack: (track: SongsType) => void;
};

const SearchResults = ({ data, addTrack, removeTrack }: Props) => {
  return (
    <div className="search-results">
      <Tracklist
        removeTrack={removeTrack}
        data={data}
        addTrack={addTrack}
        isRemoval={false}
      />
    </div>
  );
};

export default SearchResults;
