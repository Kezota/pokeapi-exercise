import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { Typography, Grid } from "@mui/material";

import { IPokemonData } from "../../Repository/Interface/IPokemonData";
import { getPokemonList } from "../../Repository/RemoteRepository";
import { PokemonCard } from "./Components/PokemonCard";

export default function PokemonList() {
  const [pokemons, setPokemons] = useState<IPokemonData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPokemonList();
        setPokemons(data);
      } catch (err) {
        const axiosError = err as AxiosError;
        console.log({ ...axiosError, stack: "" });
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Typography variant="h3" sx={{ my: 5 }}>
        List Pokemon
      </Typography>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}
      >
        {pokemons.map((poke: IPokemonData) => (
          <Grid
            item
            xs={6}
            sm={4}
            lg={3}
            key={poke.id}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <PokemonCard pokemon={poke} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
