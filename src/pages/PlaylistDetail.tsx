import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePlaylistContext } from '../contexts/PlaylistContext';
import PlaylistDisplay from '../components/PlaylistDisplay';
import { ChevronLeft } from 'lucide-react';
import { Playlist } from '../types';

const PlaylistDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { state } = usePlaylistContext();
  const navigate = useNavigate();
  const [playlist, setPlaylist] = useState<Playlist | null>(null);

  useEffect(() => {
    // Find playlist in either history or saved playlists
    const foundPlaylist = [...state.history, ...state.playlists].find(p => p.id === id);
    
    if (foundPlaylist) {
      setPlaylist(foundPlaylist);
    }
  }, [id, state.history, state.playlists]);

  if (!playlist) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center text-secondary-400">
          <h2 className="text-2xl font-bold text-white mb-2">Playlist Not Found</h2>
          <p>This playlist doesn't exist or has been removed.</p>
          <button 
            onClick={() => navigate('/')}
            className="mt-4 px-4 py-2 bg-accent-500 hover:bg-accent-600 text-primary-900 rounded-full font-medium transition-colors duration-200"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-secondary-400 hover:text-white mb-6 transition-colors duration-200"
      >
        <ChevronLeft size={20} />
        <span>Back</span>
      </button>
      
      <PlaylistDisplay playlist={playlist} />
    </div>
  );
};

export default PlaylistDetail;