import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "../pages/Home";
import ProductListing from "../pages/ProductListing";
import ProductDetail from "../pages/ProductDetail";
import BreadCrumbs from "../component/BreadCrumbs";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <h1>RoadsideCoder Store</h1>
        <BreadCrumbs />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductListing />} />
          <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
