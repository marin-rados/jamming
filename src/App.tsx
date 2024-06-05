import { useEffect, useState } from "react";
import Playlist from "./components/playlist";
import SearchResults from "./components/search-results";
import SearchBar from "./components/searchbar";
import "./styles/style.scss";
import { SongsType } from "./types/global";

const clientId = "8bbb60ec6cac4cad98e0f5fa9aa94a30";
const redirectUri = "http://localhost:5173/";
let accessToken: string | undefined;

const App = () => {
  //states
  const [data, setData] = useState<SongsType[]>([
    {
      album: {
        id: "id test",
        name: " album name test",
        release_date: "album release date test",
        uri: "album uri test",
        images: [
          {
            url: "url test",
          },
        ],
      },
      artists: [
        {
          external_urls: {
            spotify: "artists spotify test",
          },
          name: "artists name test",
        },
      ],
      name: "song name test",
      id: "song name test",
      uri: "song uri test",
      external_urls: {
        spotify: "external urls spotify test",
      },
    },
    {
      album: {
        id: "id2 test",
        name: " album2 name test",
        release_date: "album2 release date test",
        uri: "album2 uri test",
        images: [
          {
            url: "url2 test",
          },
        ],
      },
      artists: [
        {
          external_urls: {
            spotify: "artists2 spotify test",
          },
          name: "artists2 name test",
        },
      ],
      name: "song2 name test",
      id: "song2 name test",
      uri: "song2 uri test",
      external_urls: {
        spotify: "external urls2 spotify test",
      },
    },
  ]);
  const [playlistName, setPlaylistName] = useState<string>("New Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([
    {
      album: {
        id: "123",
        name: "Album",
        release_date: "6-5-2020",
        uri: "test",
        images: [
          {
            url: "test",
          },
        ],
      },
      artists: [
        {
          external_urls: {
            spotify: "spotify",
          },
          name: "Artist",
        },
      ],
      name: "Example Name",
      id: "id123",
      uri: "track test uri",
      external_urls: {
        spotify: "test",
      },
    },
  ]);

  //functions
  const getAccessToken = () => {
    // First check for the access token
    if (accessToken) return accessToken;

    const tokenInURL = window.location.href.match(/access_token=([^&]*)/);
    const expireTime = window.location.href.match(/expires_in=([^&]*)/);

    // Second check for the access token
    if (tokenInURL && expireTime) {
      // setting access token and expiry time variables
      accessToken = tokenInURL[1];
      const expiresIn = Number(expireTime[1]);

      // Setting the access token to expire at the value for expiration time
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      // clearing the url after the access token expires
      window.history.pushState("Access token", "", "/");
      return accessToken;
    }

    // Third check for the access token if the first and second check are both false
    const redirect = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
    window.location.href = redirect;
  };

  const search = async (term: string) => {
    accessToken = getAccessToken();
    const api = await fetch(
      `https://api.spotify.com/v1/search?type=track&q=${term}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    const data = await api.json();
    if (!data.tracks || !Array.isArray(data.tracks.items)) {
      console.error("Invalid response format from Spotify API:", data);
      return; // Don't update song state if response is invalid
    }

    setData(data.tracks.items);
    console.log("Songs retrieved from Spotify API:", data.tracks.items);
  };

  const addTrack = (track: SongsType) => {
    const existingTrack = playlistTracks.find((item) => item.id === track.id);
    const newTrack = playlistTracks.concat(track);
    if (existingTrack) {
      console.log("Track already exists");
    } else {
      setPlaylistTracks(newTrack);
    }
  };

  const removeTrack = (track: SongsType) => {
    const existingTrack = playlistTracks.filter((t) => t.id !== track.id);
    setPlaylistTracks(existingTrack);
  };

  const updatePlaylistName = (name: string) => {
    setPlaylistName(name);
  };

  const saveSongs = (name: string, trackUris: string[]) => {
    if (!name || !trackUris) return;
    const aToken = getAccessToken();
    const header = { Authorization: `Bearer ${aToken}` };
    let userId;
    return fetch(`https://api.spotify.com/v1/me`, { headers: header })
      .then((response) => response.json())
      .then((jsonResponse) => {
        userId = jsonResponse.id;
        let playlistId;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          headers: header,
          method: "POST",
          body: JSON.stringify({ name: name }),
        })
          .then((response) => response.json())
          .then((jsonResponse) => {
            playlistId = jsonResponse.id;
            return fetch(
              `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
              {
                headers: header,
                method: "POST",
                body: JSON.stringify({ uris: trackUris }),
              }
            );
          });
      });
  };

  const savePlaylist = (playlistName: string) => {
    const songUris = playlistTracks.map((t) => {
      return t.uri;
    });
    saveSongs(playlistName, songUris);
    updatePlaylistName(playlistName);
    setPlaylistTracks([]);
  };

  useEffect(() => {
    getAccessToken();
  }, []);

  return (
    <>
      <div>
        <h1 className="title">
          Ja<span className="title__highlight">mmm</span>ing
        </h1>
        <div className="app">
          <SearchBar search={search} />
          <div className="app__playlist">
            <SearchResults
              removeTrack={removeTrack}
              data={data}
              addTrack={addTrack}
            />
            <Playlist
              playlistTracks={playlistTracks}
              addTrack={addTrack}
              removeTrack={removeTrack}
              playlistName={playlistName}
              setPlaylistName={setPlaylistName}
              savePlaylist={savePlaylist}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
