import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import LoginPokedex from "./components/LoginPokedex.jsx";
import NotFound from "./components/NotFound.jsx";
import ProtectedRoutes from "./components/ProtectedRoutes.jsx";
import PokemonDetails from "./components/PokemonDetails";
import Pokedex from "./components/Pokedex";

function App() {
  return (
    <div className="App" >
      <header className="App__pokeball">
        <img
          src="https://i.postimg.cc/QxzPDTD0/pokedex-pokeball.png"
          alt="pokeball"
        />
      </header>
      <HashRouter>
        <Routes>
          <Route path="/" element={<LoginPokedex />} />
          <Route path="*" element={<NotFound />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/pokedex" element={<Pokedex />} />
            <Route path="/pokedex/:pokemonName" element={<PokemonDetails />} />
          </Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
