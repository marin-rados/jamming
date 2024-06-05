import { useState } from "react";

type Props = {
  search: (song: string) => void;
};

const SearchBar = ({ search }: Props) => {
  const [song, setSong] = useState<string>("");

  return (
    <div className="search-bar">
      <input
        className="search-bar__input"
        placeholder="Enter A Song, Album, or Artist"
        onChange={(e) => {
          setSong(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            search(song);
          }
        }}
      />
      <button className="search-bar__btn" onClick={() => search(song)}>
        SEARCH
      </button>
    </div>
  );
};

export default SearchBar;
