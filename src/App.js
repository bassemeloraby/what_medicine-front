import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "./pages/medicine/Card";
import ScientificName from "./pages/ScientificName";
import Home from "./pages/Home";
import AllScientificName from "./pages/medicine/AllScientificName";
import Medicine from "./pages/medicine/Medicine";
import MedCalc from "./pages/MedCalc";
import Company from "./pages/Company";
import Products from "./pages/Products";
import Header from "./components/Header";
import Insurance from "./pages/Insurance";
import UpdateProducts from "./components/UpdateProducts";
import FoodSupplement from "./pages/medicine/FoodSupplement";

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
        <Route path="/foodSupplement" element={<FoodSupplement />} />
        <Route path="/medCalc" element={<MedCalc />} />
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
