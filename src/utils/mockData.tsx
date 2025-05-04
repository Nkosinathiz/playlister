import { Song, Playlist } from '../types';

// Sample cover art URLs from Pexels
const coverUrls = [
  'https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=300',
  'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=300',
  'https://images.pexels.com/photos/1021876/pexels-photo-1021876.jpeg?auto=compress&cs=tinysrgb&w=300',
  'https://images.pexels.com/photos/733767/pexels-photo-733767.jpeg?auto=compress&cs=tinysrgb&w=300',
  'https://images.pexels.com/photos/164693/pexels-photo-164693.jpeg?auto=compress&cs=tinysrgb&w=300',
  'https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=300',
  'https://images.pexels.com/photos/33597/guitar-classical-guitar-acoustic-guitar-electric-guitar.jpg?auto=compress&cs=tinysrgb&w=300',
  'https://images.pexels.com/photos/96380/pexels-photo-96380.jpeg?auto=compress&cs=tinysrgb&w=300',
];

// Sample preview URLs (these would normally link to actual audio previews)
const previewUrls = Array(8).fill('https://example.com/preview');

// Mock data for songs
const generateMockSongs = (query: string): Song[] => {
  const genres = ['Pop', 'Rock', 'Hip-Hop', 'R&B', 'Electronic', 'Jazz', 'Classical', 'Country'];
  const decades = ['80s', '90s', '00s', '10s', '20s'];
  const moods = ['upbeat', 'relaxing', 'energetic', 'chill', 'motivational', 'romantic', 'sad', 'happy'];
  
  // Simple keyword extraction from query
  const queryLower = query.toLowerCase();
  const matchedGenres = genres.filter(g => queryLower.includes(g.toLowerCase()));
  const matchedDecades = decades.filter(d => queryLower.includes(d.toLowerCase()));
  const matchedMoods = moods.filter(m => queryLower.includes(m.toLowerCase()));
  
  // Default to pop and current decade if no matches
  const genre = matchedGenres.length > 0 ? matchedGenres[0] : 'Pop';
  const decade = matchedDecades.length > 0 ? matchedDecades[0] : '20s';
  const mood = matchedMoods.length > 0 ? matchedMoods[0] : 'upbeat';
  
  // Artists by genre
  const artistsByGenre: Record<string, string[]> = {
    'Pop': ['Taylor Swift', 'Ed Sheeran', 'Ariana Grande', 'Justin Bieber', 'Dua Lipa'],
    'Rock': ['Foo Fighters', 'Arctic Monkeys', 'The Killers', 'Imagine Dragons', 'Twenty One Pilots'],
    'Hip-Hop': ['Kendrick Lamar', 'Drake', 'J. Cole', 'Megan Thee Stallion', 'Tyler, The Creator'],
    'R&B': ['The Weeknd', 'SZA', 'H.E.R.', 'Frank Ocean', 'Daniel Caesar'],
    'Electronic': ['Daft Punk', 'Calvin Harris', 'Disclosure', 'Flume', 'Kaytranada'],
    'Jazz': ['Kamasi Washington', 'Robert Glasper', 'Norah Jones', 'Gregory Porter', 'Esperanza Spalding'],
    'Classical': ['Ludovico Einaudi', 'Hans Zimmer', 'Max Richter', 'Yiruma', 'Olafur Arnalds'],
    'Country': ['Luke Combs', 'Kacey Musgraves', 'Chris Stapleton', 'Morgan Wallen', 'Maren Morris']
  };
  
  // Song themes based on mood
  const songThemesByMood: Record<string, string[]> = {
    'upbeat': ['Party', 'Summer', 'Dance', 'Celebration', 'Feel Good'],
    'relaxing': ['Calm', 'Sleep', 'Meditation', 'Peaceful', 'Serenity'],
    'energetic': ['Workout', 'Run', 'Gym', 'Power', 'Energy'],
    'chill': ['Lounge', 'Vibe', 'Mellow', 'Easy', 'Smooth'],
    'motivational': ['Inspire', 'Success', 'Rise', 'Dream', 'Achieve'],
    'romantic': ['Love', 'Heart', 'Romance', 'Forever', 'Together'],
    'sad': ['Blue', 'Rain', 'Tears', 'Heartbreak', 'Lonely'],
    'happy': ['Smile', 'Joy', 'Happy', 'Sunshine', 'Bright']
  };
  
  const artists = artistsByGenre[genre];
  const themes = songThemesByMood[mood];
  
  return Array.from({ length: 10 }, (_, i) => {
    const artist = artists[Math.floor(Math.random() * artists.length)];
    const theme = themes[Math.floor(Math.random() * themes.length)];
    const year = decade === '80s' ? 1980 + Math.floor(Math.random() * 10) :
                 decade === '90s' ? 1990 + Math.floor(Math.random() * 10) :
                 decade === '00s' ? 2000 + Math.floor(Math.random() * 10) :
                 decade === '10s' ? 2010 + Math.floor(Math.random() * 10) :
                 2020 + Math.floor(Math.random() * 4);
                 
    const minutes = 2 + Math.floor(Math.random() * 3);
    const seconds = Math.floor(Math.random() * 60);
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    
    return {
      id: `song-${i + 1}`,
      title: `${theme} ${i + 1}`,
      artist,
      album: `${artist} - ${genre} ${decade} Collection`,
      year,
      duration: `${minutes}:${formattedSeconds}`,
      genre,
      coverUrl: coverUrls[i % coverUrls.length],
      previewUrl: previewUrls[i % previewUrls.length]
    };
  });
};

// Generate a random playlist based on a query
export const generatePlaylist = (query: string): Promise<Playlist> => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      const songs = generateMockSongs(query);
      const playlist: Playlist = {
        id: `playlist-${Date.now()}`,
        title: query || 'My Awesome Playlist',
        description: query || 'A playlist generated based on your preferences',
        createdAt: new Date().toISOString(),
        songs
      };
      resolve(playlist);
    }, 2000); // 2 second delay to simulate API call
  });
};

// Generate random queries for the "Surprise Me" feature
export const getRandomQuery = (): string => {
  const queries = [
    'upbeat 90s rock for workouts',
    'relaxing acoustic covers for studying',
    'motivational hip-hop from the 2010s',
    'chill electronic music for coding',
    'romantic R&B for date night',
    'energetic pop songs for road trips',
    'classic jazz for dinner parties',
    'happy country music for summer bbqs'
  ];
  
  return queries[Math.floor(Math.random() * queries.length)];
};

// Sample saved playlists for history
export const samplePlaylists: Playlist[] = [
  {
    id: 'sample-1',
    title: 'Workout Motivation',
    description: 'High energy tracks for intense workouts',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    songs: generateMockSongs('energetic workout music')
  },
  {
    id: 'sample-2',
    title: 'Chill Study Session',
    description: 'Focus-enhancing ambient tracks',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    songs: generateMockSongs('relaxing study music')
  }
];