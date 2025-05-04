import React from 'react';
import { Share2, Download, Save, Trash2 } from 'lucide-react';
import SongItem from './SongItem';
import SpotifyPlaylistButton from './SpotifyPlaylistButton';
import { Playlist } from '../types';

interface PlaylistDisplayProps {
  playlist: Playlist;
  onSave?: () => void;
  onClear?: () => void;
}

const PlaylistDisplay: React.FC<PlaylistDisplayProps> = ({
  playlist,
  onSave,
  onClear
}) => {
  return (
    <div className="bg-gradient-to-b from-primary-800/50 to-primary-900/50 rounded-xl p-6 mt-6 backdrop-blur-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl font-bold text-white mb-2">{playlist.title}</h2>
          <p className="text-secondary-300">{playlist.description}</p>
          <p className="text-sm text-secondary-400 mt-1">
            {playlist.songs.length} songs • Created {new Date(playlist.createdAt).toLocaleDateString()}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <SpotifyPlaylistButton playlist={playlist} />
          
          {onSave && (
            <button 
              onClick={onSave}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500 hover:bg-accent-600 text-primary-900 font-medium transition-colors duration-200"
              aria-label="Save playlist"
            >
              <Save size={18} />
              <span>Save</span>
            </button>
          )}
          
          <button 
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-200"
            aria-label="Share playlist"
          >
            <Share2 size={18} />
            <span className="hidden md:inline">Share</span>
          </button>
          
          <button 
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-200"
            aria-label="Download playlist"
          >
            <Download size={18} />
            <span className="hidden md:inline">Export</span>
          </button>
          
          {onClear && (
            <button 
              onClick={onClear}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-red-500/80 text-white transition-colors duration-200"
              aria-label="Clear playlist"
            >
              <Trash2 size={18} />
              <span className="hidden md:inline">Clear</span>
            </button>
          )}
        </div>
      </div>
      
      <div className="mt-8">
        <div className="grid grid-cols-[auto_1fr_auto] md:grid-cols-[auto_1fr_1fr_auto_auto] gap-4 text-sm text-secondary-400 px-3 py-2 border-b border-white/10">
          <div className="w-12 text-center">#</div>
          <div>Track</div>
          <div className="hidden md:block">Album</div>
          <div>Time</div>
          <div className="w-20"></div>
        </div>
        
        <div className="mt-2">
          {playlist.songs.map((song, index) => (
            <SongItem key={song.id} song={song} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlaylistDisplay;