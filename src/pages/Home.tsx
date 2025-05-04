import React from 'react';
import PlaylistGenerator from '../components/PlaylistGenerator';
import PlaylistDisplay from '../components/PlaylistDisplay';
import { usePlaylistContext } from '../contexts/PlaylistContext';
import { usePlaylistGenerator } from '../hooks/usePlaylistGenerator';

const Home: React.FC = () => {
  const { state } = usePlaylistContext();
  const { saveCurrentPlaylist, clearCurrentPlaylist } = usePlaylistGenerator();

  return (
    <div className="container mx-auto px-4 py-8">
      <PlaylistGenerator />
      
      {state.currentPlaylist && (
        <PlaylistDisplay 
          playlist={state.currentPlaylist} 
          onSave={saveCurrentPlaylist}
          onClear={clearCurrentPlaylist}
        />
      )}
      
      {!state.currentPlaylist && !state.isGenerating && (
        <div className="mt-16 text-center text-secondary-400">
          <p>No playlist generated yet. Describe the kind of music you'd like to hear above.</p>
        </div>
      )}
    </div>
  );
};

export default Home;