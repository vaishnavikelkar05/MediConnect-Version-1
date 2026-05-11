import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Hospitals from './pages/Hospitals';
import Doctors from './pages/Doctors';
import BloodBank from './pages/BloodBank';
import Recommend from './pages/Recommend';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hospitals" element={<Hospitals />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/blood-bank" element={<BloodBank />} />
            <Route path="/recommend" element={<Recommend />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
