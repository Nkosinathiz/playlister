import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { PlaylistState, PlaylistAction, Playlist } from '../types';
import { samplePlaylists } from '../utils/mockData';

const initialState: PlaylistState = {
  playlists: [],
  history: [...samplePlaylists],
  currentPlaylist: null,
  isGenerating: false,
  error: null
};

const PlaylistContext = createContext<{
  state: PlaylistState;
  dispatch: React.Dispatch<PlaylistAction>;
}>({
  state: initialState,
  dispatch: () => null
});

const playlistReducer = (state: PlaylistState, action: PlaylistAction): PlaylistState => {
  switch (action.type) {
    case 'SET_CURRENT_PLAYLIST':
      return {
        ...state,
        currentPlaylist: action.payload,
        isGenerating: false
      };
    case 'ADD_TO_HISTORY':
      // Add to history only if not already present
      const exists = state.history.some(p => p.id === action.payload.id);
      if (exists) {
        return state;
      }
      return {
        ...state,
        history: [action.payload, ...state.history]
      };
    case 'START_GENERATING':
      return {
        ...state,
        isGenerating: true,
        error: null
      };
    case 'FINISH_GENERATING':
      return {
        ...state,
        isGenerating: false
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isGenerating: false
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    case 'SAVE_PLAYLIST':
      // Only save if not already in playlists
      if (state.playlists.some(p => p.id === action.payload.id)) {
        return state;
      }
      return {
        ...state,
        playlists: [action.payload, ...state.playlists]
      };
    case 'CLEAR_CURRENT_PLAYLIST':
      return {
        ...state,
        currentPlaylist: null
      };
    default:
      return state;
  }
};

export const PlaylistProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(playlistReducer, initialState);

  return (
    <PlaylistContext.Provider value={{ state, dispatch }}>
      {children}
    </PlaylistContext.Provider>
  );
};

export const usePlaylistContext = () => useContext(PlaylistContext);