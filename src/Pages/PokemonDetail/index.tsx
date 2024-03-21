import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Grid, CircularProgress } from "@mui/material";
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
      setIsLoading(true);
      const data = await getPokemonDetails({ id: params.pokemonId });
      setIsLoading(false);

      if (data) {
        setPokemon(data);
      } else {
        setErrorMessage(
          `Pokemon with PokemonId ${params.pokemonId} not found!`
        );
      }
    };

    fetchData();
  }, [params.pokemonId]);

  if (errorMessage) {
    return <Typography variant="h3">{errorMessage}</Typography>;
  }

  if (!pokemon || isLoading) {
    return <CircularProgress />;
  }

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
