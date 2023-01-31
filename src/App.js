import { Route, Routes } from 'react-router-dom';
import NavbarComp from './components/NavbarComp';
import Card from './pages/Card';
import Drugs from './pages/Drugs';
import Home from './pages/Home';
function App() {
  return (
    <div>
      <NavbarComp />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/drugs" element={<Drugs />} />
        <Route path='/card/:_id' element={<Card />} />
      </Routes>
    </div>
  );
}

export default App;
