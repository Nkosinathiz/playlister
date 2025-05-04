import React from 'react';
import { Music } from 'lucide-react';
import { useSpotify } from '../contexts/SpotifyContext';
import { Playlist } from '../types';

interface SpotifyPlaylistButtonProps {
  playlist: Playlist;
}

const SpotifyPlaylistButton: React.FC<SpotifyPlaylistButtonProps> = ({ playlist }) => {
  const { sdk, isAuthenticated, login } = useSpotify();
  const [isSaving, setIsSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const saveToSpotify = async () => {
    if (!sdk || !isAuthenticated) {
      login();
      return;
    }

    try {
      setIsSaving(true);
      setError(null);

      // Create a new playlist
      const user = await sdk.currentUser.profile();
      const newPlaylist = await sdk.playlists.createPlaylist(user.id, {
        name: playlist.title,
        description: playlist.description,
        public: false
      });

      // Search for and add tracks
      const trackUris = await Promise.all(
        playlist.songs.map(async (song) => {
          const query = `track:${song.title} artist:${song.artist}`;
          const results = await sdk.search(query, ['track']);
          return results.tracks.items[0]?.uri;
        })
      );

      const validTrackUris = trackUris.filter((uri): uri is string => uri !== undefined);
      
      if (validTrackUris.length > 0) {
        await sdk.playlists.addItems(newPlaylist.id, validTrackUris);
      }

      setIsSaving(false);
    } catch (err) {
      setError('Failed to save playlist to Spotify');
      setIsSaving(false);
    }
  };

  return (
    <button
      onClick={saveToSpotify}
      disabled={isSaving}
      className={`
        flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-200
        ${isSaving 
          ? 'bg-secondary-700 cursor-not-allowed' 
          : 'bg-[#1DB954] hover:bg-[#1ed760] transform hover:scale-105'
        }
        text-white shadow-lg
      `}
    >
      <Music size={20} />
      <span>{isSaving ? 'Saving to Spotify...' : 'Save to Spotify'}</span>
    </button>
  );
};

export default SpotifyPlaylistButton;