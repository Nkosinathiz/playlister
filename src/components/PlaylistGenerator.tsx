import React, { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { usePlaylistGenerator } from '../hooks/usePlaylistGenerator';

const PlaylistGenerator: React.FC = () => {
  const { 
    query, 
    setQuery, 
    isGenerating, 
    generatePlaylist, 
    generateRandomPlaylist,
    error 
  } = usePlaylistGenerator();
  
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generatePlaylist();
  };

  return (
    <div className="relative">
      <div className={`
        absolute inset-0 bg-gradient-to-r from-primary-600/20 to-secondary-600/20 
        rounded-xl blur-xl transition-opacity duration-300
        ${isFocused ? 'opacity-100' : 'opacity-0'}
      `} />
      
      <div className="relative bg-gradient-to-r from-primary-800/50 to-primary-900/50 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-white/10">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
          <span className="bg-gradient-to-r from-white to-accent-200 text-transparent bg-clip-text">
            Discover Your Perfect Playlist
          </span>
        </h1>
        
        <p className="text-secondary-300 text-center max-w-2xl mx-auto mb-8">
          Tell us what kind of music you're in the mood for, and our AI will create a personalized playlist just for you.
        </p>
        
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="e.g., upbeat workout songs from the 90s"
              className="w-full py-4 px-6 pr-32 bg-white/5 border border-white/20 focus:border-accent-400 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-accent-400/50 transition-all duration-300"
              disabled={isGenerating}
            />
            
            <button
              type="submit"
              disabled={isGenerating}
              className={`
                absolute right-2 top-2 h-10 px-5 rounded-full 
                ${isGenerating ? 'bg-secondary-700' : 'bg-gradient-to-r from-accent-400 to-accent-500 hover:from-accent-500 hover:to-accent-600'} 
                text-primary-900 font-medium transition-all duration-200 flex items-center gap-2
              `}
            >
              {isGenerating ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Creating...</span>
                </>
              ) : (
                <span>Generate</span>
              )}
            </button>
          </div>
          
          {error && (
            <p className="text-red-400 mt-2 text-center">{error}</p>
          )}
          
          <div className="mt-4 flex justify-center">
            <button
              type="button"
              onClick={generateRandomPlaylist}
              disabled={isGenerating}
              className="flex items-center gap-2 text-secondary-300 hover:text-accent-300 transition-colors duration-200"
            >
              <Sparkles size={16} />
              <span>Surprise Me</span>
            </button>
          </div>
        </form>
      </div>
      
      {isGenerating && (
        <div className="mt-8 flex flex-col items-center">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full bg-accent-500/20 animate-ping" />
            <div className="absolute inset-2 rounded-full bg-accent-500/30 animate-pulse" />
            <div className="absolute inset-4 rounded-full bg-accent-500/40 animate-pulse" style={{ animationDelay: '0.2s' }} />
            <div className="absolute inset-6 rounded-full bg-accent-500" />
          </div>
          <p className="mt-4 text-secondary-300">Analyzing your music preferences...</p>
        </div>
      )}
    </div>
  );
};

export default PlaylistGenerator;