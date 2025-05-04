import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SpotifyApi } from '@spotify/web-api-ts-sdk';

interface SpotifyContextType {
  sdk: SpotifyApi | null;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const SpotifyContext = createContext<SpotifyContextType>({
  sdk: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const SpotifyProvider = ({ children }: { children: ReactNode }) => {
  const [sdk, setSdk] = useState<SpotifyApi | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const redirectUri = `${window.location.origin}/callback`;
    
    const spotify = SpotifyApi.withUserAuthorization(
      clientId,
      redirectUri,
      ['playlist-modify-public', 'playlist-modify-private']
    );

    spotify.authenticate().then(() => {
      setSdk(spotify);
      setIsAuthenticated(true);
    }).catch(() => {
      setIsAuthenticated(false);
    });
  }, []);

  const login = () => {
    if (sdk) {
      sdk.authenticate();
    }
  };

  const logout = () => {
    if (sdk) {
      sdk.logOut();
      setIsAuthenticated(false);
    }
  };

  return (
    <SpotifyContext.Provider value={{ sdk, isAuthenticated, login, logout }}>
      {children}
    </SpotifyContext.Provider>
  );
};

export const useSpotify = () => useContext(SpotifyContext);