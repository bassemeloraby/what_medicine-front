import { Route, Routes } from 'react-router-dom';
import NavbarComp from './components/NavbarComp';
import Card from './pages/Card';
import ScientificName from './pages/ScientificName'
import Home from './pages/Home';
import Medicine from './pages/Medicine';
import AllScientificName from './pages/AllScientificName';
function App() {
  return (
    <div>
      <NavbarComp />

      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/card/:_id" element={<Card />} />
        <Route path="/ScientificName/:ScientificName" element={<ScientificName />} />
        <Route path="/medicine" element={<Medicine />} />
        <Route path="/AllScientificName" element={<AllScientificName />} />
      </Routes>
    </div>
  );
}

export default App;
