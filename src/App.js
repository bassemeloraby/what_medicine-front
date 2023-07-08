import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import NavbarComp from './components/NavbarComp';
import Card from "./pages/Card";
import ScientificName from "./pages/ScientificName";
import Home from "./pages/Home";
import AllScientificName from "./pages/AllScientificName";
import Medicine from "./pages/Medicine";
import Company from "./pages/Company";
import Products from "./pages/Products";
import Header from "./components/Header";
import Insurance from "./pages/Insurance";
import UpdateProducts from "./components/UpdateProducts";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/card/:_id" element={<Card />} />
        <Route
          path="/ScientificName/:ScientificName"
          element={<ScientificName />}
        />
        <Route path="/medicine" element={<Medicine />} />
        <Route path="/companies" element={<Company />} />
        <Route path="/products" element={<Products />} />
        <Route path="/update-product" element={<UpdateProducts />} />

        <Route path="/AllScientificName" element={<AllScientificName />} />
        <Route path="/insurance" element={<Insurance />} />
      </Routes>
    </div>
  );
}

export default App;
