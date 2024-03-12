import { useEffect, useState } from "react";
import { Container } from "@mui/material";
import axios, { AxiosError } from "axios";
import PokemonDetail from "./Pages/PokemonDetail";
import PokemonList from "./Pages/PokemonList";

import { BrowserRouter, Route, Routes } from "react-router-dom";

export type PokemonData = {
  id: number;
  name: string;
  height: number;
  weight: number;
  moves: { move: { name: string } }[];
  sprites: {
    back_default: string | null;
    back_shiny: string | null;
    front_default: string | null;
    front_shiny: string | null;
    other: {
      "official-artwork": {
        front_default: string | null;
      };
    };
  };
};

type TPokemonResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
};

export default function App() {
  const [pokemons, setPokemons] = useState<PokemonData[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonData | null>(
    null
  );

  useEffect(() => {
    const getPokemonDetails = async (URL: string) => {
      try {
        const response = await axios.get(URL);

        return response.data;
      } catch (err) {
        const error = err as AxiosError;
        console.log({ ...error, stack: "" });
      }
    };

    const getPokemon = async () => {
      try {
        const response = await axios.get<TPokemonResponse>(
          "https://pokeapi.co/api/v2/pokemon/"
        );
        const pokemonList = response.data.results;

        const pokemonWithDetailsResponse = await Promise.allSettled(
          pokemonList.map((pokemon) => getPokemonDetails(pokemon.url))
        );

        const pokemonWithDetails = pokemonWithDetailsResponse.map(
          (pokemonDetails) => {
            if (pokemonDetails.status === "fulfilled") {
              return pokemonDetails.value;
            } else {
              console.error(pokemonDetails.reason);
              return null;
            }
          }
        );

        setPokemons(pokemonWithDetails);
      } catch (err) {
        const error = err as AxiosError;
        console.log({ ...error, stack: "" });
      }
    };
    getPokemon();
  }, []);

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
          <Route
            index
            path="/"
            element={
              <PokemonList
                pokemons={pokemons}
                setSelectedPokemon={setSelectedPokemon}
              />
            }
          />
          <Route
            path="/pokemonDetail"
            element={
              selectedPokemon && <PokemonDetail pokemon={selectedPokemon} />
            }
          />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}
