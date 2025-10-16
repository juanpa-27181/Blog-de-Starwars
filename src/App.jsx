import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import People from "./pages/People";
import Planets from "./pages/Planets";
import Vehicles from "./pages/Vehicles";
import Details from "./pages/Details";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<People />} />
        <Route path="/people" element={<People />} />
        <Route path="/planets" element={<Planets />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/details/:type/:uid" element={<Details />} />
        <Route path="/:type/:id" element={<Details />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
