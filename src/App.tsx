import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { PlaylistProvider } from './contexts/PlaylistContext';
import { SpotifyProvider } from './contexts/SpotifyContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import History from './pages/History';
import PlaylistDetail from './pages/PlaylistDetail';

function App() {
  return (
    <SpotifyProvider>
      <PlaylistProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-gradient-to-br from-primary-950 via-primary-900 to-secondary-900 text-white">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/history" element={<History />} />
                <Route path="/playlist/:id" element={<PlaylistDetail />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </PlaylistProvider>
    </SpotifyProvider>
  );
}

export default App;