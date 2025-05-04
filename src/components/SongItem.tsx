import React, { useState } from 'react';
import { Play, Pause, Share2, Plus } from 'lucide-react';
import { Song } from '../types';

interface SongItemProps {
  song: Song;
  index: number;
}

const SongItem: React.FC<SongItemProps> = ({ song, index }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // In a real app, this would actually play the preview audio
  };

  return (
    <div 
      className="group flex items-center p-3 rounded-lg hover:bg-white/5 transition-all duration-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-12 text-center text-secondary-400 font-medium mr-4">
        {!isHovered ? (
          <span>{index + 1}</span>
        ) : (
          <button 
            onClick={togglePlay}
            className="text-white hover:text-accent-300 transition-colors duration-200"
            aria-label={isPlaying ? "Pause song" : "Play song"}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>
        )}
      </div>
      
      <div className="flex items-center flex-1">
        <img 
          src={song.coverUrl} 
          alt={`${song.album} cover`} 
          className="w-10 h-10 rounded object-cover mr-3" 
        />
        
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-medium truncate">{song.title}</h3>
          <p className="text-secondary-400 text-sm truncate">{song.artist}</p>
        </div>
      </div>
      
      <div className="text-secondary-400 text-sm hidden md:block">
        {song.album}
      </div>
      
      <div className="ml-4 md:ml-6 text-secondary-400 text-sm">
        {song.duration}
      </div>
      
      <div className="ml-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button 
          className="text-secondary-400 hover:text-white transition-colors duration-200"
          aria-label="Add to playlist"
        >
          <Plus size={18} />
        </button>
        <button 
          className="text-secondary-400 hover:text-white transition-colors duration-200"
          aria-label="Share song"
        >
          <Share2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default SongItem;