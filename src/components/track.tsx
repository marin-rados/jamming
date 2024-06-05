import { SongsType } from "../types/global";

type Props = {
  data: SongsType;
  isRemoval: boolean | undefined;
  addTrack: (track: SongsType) => void;
  removeTrack: (track: SongsType) => void;
};

const Track = ({ data, addTrack, removeTrack, isRemoval }: Props) => {
  const renderAction = () => {
    if (isRemoval) {
      return (
        <button className="track__btn" onClick={passTrackToRemove}>
          -
        </button>
      );
    } else {
      return (
        <button className="track__btn" onClick={passTrack}>
          +
        </button>
      );
    }
  };

  const passTrack = () => {
    addTrack(data);
  };

  const passTrackToRemove = () => {
    removeTrack(data);
  };

  return (
    <>
      <div className="track">
        <a
          className="track__link"
          href={data.external_urls.spotify}
          target="_blank"
        >
          <img height={"75rem"} src={data.album.images[0].url} alt="" />
        </a>
        <div className="track__information">
          <h3 className="track__name">
            <a
              className="track__link"
              href={data.external_urls.spotify}
              target="_blank"
            >
              {data.name}
            </a>
          </h3>
          <p className="track__artist">
            <a
              href={data.artists[0].external_urls.spotify}
              className="track__link"
              target="_blank"
            >
              {data.artists[0].name}
            </a>{" "}
            |{" "}
            <a href={data.album.uri} className="track__link" target="_blank">
              {data.album.name}
            </a>{" "}
            | Release Date: {data.album.release_date}
          </p>
        </div>

        {renderAction()}
      </div>
      <hr />
    </>
  );
};

export default Track;
