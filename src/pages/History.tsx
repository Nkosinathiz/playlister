import React from 'react';
import { usePlaylistContext } from '../contexts/PlaylistContext';
import { useNavigate } from 'react-router-dom';
import { Clock, Music } from 'lucide-react';

const History: React.FC = () => {
  const { state } = usePlaylistContext();
  const navigate = useNavigate();

  if (state.history.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center text-secondary-400">
          <Clock size={48} className="mx-auto mb-4 opacity-50" />
          <h2 className="text-2xl font-bold text-white mb-2">No History Yet</h2>
          <p>Generate playlists to see your history here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Clock size={24} className="text-secondary-400 mr-3" />
        <h1 className="text-2xl font-bold text-white">Your Playlist History</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {state.history.map((playlist) => (
          <div 
            key={playlist.id}
            onClick={() => navigate(`/playlist/${playlist.id}`)}
            className="bg-gradient-to-b from-primary-800/50 to-primary-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-accent-400/50 transition-all duration-200 cursor-pointer hover:shadow-lg hover:shadow-accent-500/10"
          >
            <div className="flex p-4 items-center border-b border-white/10">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-primary-700 to-secondary-700 text-white mr-4">
                <Music size={20} />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-medium text-white truncate">{playlist.title}</h3>
                <p className="text-sm text-secondary-400">
                  {playlist.songs.length} songs • {new Date(playlist.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <div className="p-4">
              <div className="text-sm text-secondary-300 line-clamp-2 mb-4">
                {playlist.description}
              </div>
              
              <div className="flex flex-wrap gap-2 text-xs">
                {Array.from(new Set(playlist.songs.map(song => song.genre))).slice(0, 3).map((genre) => (
                  <span 
                    key={genre} 
                    className="px-2 py-1 rounded-full bg-white/10 text-secondary-300"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;