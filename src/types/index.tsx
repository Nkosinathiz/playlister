export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  year: number;
  duration: string;
  genre: string;
  coverUrl: string;
  previewUrl: string;
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  songs: Song[];
}

export interface PlaylistState {
  playlists: Playlist[];
  history: Playlist[];
  currentPlaylist: Playlist | null;
  isGenerating: boolean;
  error: string | null;
}

export type PlaylistAction =
  | { type: "SET_CURRENT_PLAYLIST"; payload: Playlist }
  | { type: "ADD_TO_HISTORY"; payload: Playlist }
  | { type: "START_GENERATING" }
  | { type: "FINISH_GENERATING" }
  | { type: "SET_ERROR"; payload: string }
  | { type: "CLEAR_ERROR" }
  | { type: "SAVE_PLAYLIST"; payload: Playlist }
  | { type: "CLEAR_CURRENT_PLAYLIST" };
