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
  const response = await axios.get(
    url || `${import.meta.env.VITE_REACT_APP_BASE_URL}${id || ""}`
  );
  return response.data;
};

export async function getPokemonList(): Promise<IPokemonData[]> {
  const response = await axios.get<IPokemonResponse>(
    import.meta.env.VITE_REACT_APP_BASE_URL
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
        return null;
      }
    }
  );

  return pokemonWithDetails as IPokemonData[];
}
