import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";

import PokemonDetail from "./Pages/PokemonDetail/PokemonDetail";
import PokemonList from "./Pages/PokemonList/PokemonList";

export default function App() {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<PokemonList />} />
          <Route path="/pokemonDetail/:pokemonId" element={<PokemonDetail />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}
