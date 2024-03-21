import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AxiosError } from "axios";
import { Typography, Grid } from "@mui/material";
import { IPokemonData } from "../../Repository/Interface/IPokemonData";
import capitalize from "../../util/capitalize";
import { getPokemonDetails } from "../../Repository/RemoteRepository";
import { ImagesCard } from "./Components/ImagesCard";
import { StatsCard } from "./Components/StatsCard";

export default function PokemonDetail() {
  const [pokemon, setPokemon] = useState<IPokemonData | undefined>();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();

  useEffect(() => {
    if (!params.pokemonId) return;
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getPokemonDetails({ id: params.pokemonId });
        setPokemon(data);
      } catch (err) {
        const axiosError = err as AxiosError;
        console.log({ ...axiosError, stack: "" });
        setErrorMessage(
          `Pokemon with PokemonId ${params.pokemonId} not found!`
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [params?.pokemonId]);

  if (errorMessage) return <Typography variant="h3">{errorMessage}</Typography>;

  if (!pokemon || isLoading)
    return <Typography variant="h3">Loading...</Typography>;

  return (
    <>
      <Typography variant="h3" sx={{ my: 5 }}>
        {capitalize(pokemon.name)}
      </Typography>
      <Grid container spacing={5}>
        <ImagesCard pokemon={pokemon} />
        <StatsCard pokemon={pokemon} />
      </Grid>
    </>
  );
}
