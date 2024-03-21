import axios, { AxiosError } from "axios";
import { IPokemonResponse } from "../Interface/IPokemonResponse";
import { IPokemonData } from "../Interface/IPokemonData";

export const getPokemonDetails = async ({
  url,
  id,
}: {
  url?: string;
  id?: string;
}): Promise<IPokemonData | null> => {
  try {
    const response = await axios.get(
      url || `${import.meta.env.VITE_REACT_APP_BASE_URL}${id || ""}`
    );
    return response.data;
  } catch (err) {
    const axiosError = err as AxiosError;
    console.log({ ...axiosError, stack: "" });
    return null;
  }
};

export async function getPokemonList(): Promise<IPokemonData[]> {
  try {
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
  } catch (err) {
    const axiosError = err as AxiosError;
    console.log({ ...axiosError, stack: "" });

    return [];
  }
}
