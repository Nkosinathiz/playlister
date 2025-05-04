import { useState } from 'react';
import { usePlaylistContext } from '../contexts/PlaylistContext';
import { generatePlaylist, getRandomQuery } from '../utils/mockData';
import { Playlist } from '../types';

export const usePlaylistGenerator = () => {
  const { state, dispatch } = usePlaylistContext();
  const [query, setQuery] = useState('');

  const generatePlaylistFromQuery = async (inputQuery?: string) => {
    const finalQuery = inputQuery || query;
    
    if (!finalQuery && !inputQuery) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: 'Please enter a description for your playlist' 
      });
      return;
    }

    try {
      dispatch({ type: 'START_GENERATING' });
      const playlist = await generatePlaylist(finalQuery);
      
      dispatch({ type: 'SET_CURRENT_PLAYLIST', payload: playlist });
      dispatch({ type: 'ADD_TO_HISTORY', payload: playlist });
      
      // Clear input after successful generation
      if (!inputQuery) {
        setQuery('');
      }
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: 'Failed to generate playlist. Please try again.' 
      });
    }
  };

  const generateRandomPlaylist = async () => {
    const randomQuery = getRandomQuery();
    await generatePlaylistFromQuery(randomQuery);
  };

  const saveCurrentPlaylist = () => {
    if (state.currentPlaylist) {
      dispatch({ type: 'SAVE_PLAYLIST', payload: state.currentPlaylist });
    }
  };

  const clearCurrentPlaylist = () => {
    dispatch({ type: 'CLEAR_CURRENT_PLAYLIST' });
  };

  return {
    query,
    setQuery,
    isGenerating: state.isGenerating,
    error: state.error,
    currentPlaylist: state.currentPlaylist,
    generatePlaylist: generatePlaylistFromQuery,
    generateRandomPlaylist,
    saveCurrentPlaylist,
    clearCurrentPlaylist
  };
};