import { Route, Routes } from 'react-router-dom';
import NavbarComp from './components/NavbarComp';
import Card from './pages/Card';

import Home from './pages/Home';
import Medicine from './pages/Medicine';
function App() {
  return (
    <div>
      <NavbarComp />

      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/card/:_id" element={<Card />} />
        <Route path="/medicine" element={<Medicine />} />
      </Routes>
    </div>
  );
}

export default App;
