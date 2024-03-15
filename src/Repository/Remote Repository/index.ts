import axios from "axios";
import { IPokemonResponse } from "../Interface/IPokemonResponse";
import { IPokemonData } from "../Interface/IPokemonData";

export const getPokemonDetails = async ({
  url,
  id,
}: {
  url?: string;
  id?: string;
}) => {
  // const response = await axios.get(URL);
  const response = await axios.get(
    url || `https://pokeapi.co/api/v2/pokemon/${id || ""}`
  );
  return response.data;
};

console.log(import.meta.env.VITE_REACT_APP_BASE_URL);

export async function getPokemonList(): Promise<IPokemonData[]> {
  const response = await axios.get<IPokemonResponse>(
    // process.env.REACT_APP_BASE_URL as string
    "https://pokeapi.co/api/v2/pokemon/"
    // import.meta.env.REACT_APP_BASE_URL
  );

  const pokemonList = response.data.results;

  const pokemonWithDetailsResponse = await Promise.allSettled(
    pokemonList.map((pokemon) => getPokemonDetails({ url: pokemon.url }))
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

  return pokemonWithDetails as IPokemonData[];
}
