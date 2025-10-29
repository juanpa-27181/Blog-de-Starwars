import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import People from "./pages/People";
import Vehicles from "./pages/Vehicles";
import Planets from "./pages/Planets";
import Details from "./pages/Details";

const Layout = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/people" element={<People />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/planets" element={<Planets />} />
        <Route path="/:type/:uid" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Layout;
