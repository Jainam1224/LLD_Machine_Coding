import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "../pages/Home";
import About from "../pages/About";
import Blog from "../pages/Blog";
import Navbar from "../component/NavBar";
import { ThemeProvider } from "../context/themeContext";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
