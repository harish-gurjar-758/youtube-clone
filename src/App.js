import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MenuBar from './Componantes/Controller/MenuBar/MenuBar';
import Footer from './Componantes/Controller/Footer/Footer';
import './App.css'
import Home from './Componantes/Routes/Home/Home';
import VideoDetails from './Componantes/Pages/VideoDetails';
import Shorts from './Componantes/Routes/Shorts/Shorts';

function App() {
  return (
    <Router>
      <div className="Youtube">
        <MenuBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/shorts' element={<Shorts />} />
          <Route path="/video-details/:videoId" element={<VideoDetails />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
