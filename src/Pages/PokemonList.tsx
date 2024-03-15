import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import {
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Container,
} from "@mui/material";

import capitalize from "../util/capitalize";
import { IPokemonData } from "../Repository/Interface/IPokemonData";
import { PokemonCardProps } from "../Repository/Interface/PokemonCardProps";
import { getPokemonList } from "../Repository/Remote Repository";

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

function PokemonCard({ pokemon }: PokemonCardProps) {
  const navigate = useNavigate();
  function handleClick() {
    navigate(`/pokemonDetail/${pokemon.id}`);
  }

  return (
    <Container>
      <Card sx={{ width: 250, borderRadius: 3 }}>
        <CardMedia
          component="img"
          image={String(
            pokemon.sprites.other["official-artwork"].front_default
          )}
          alt={pokemon.name}
        />
      </Card>
      <Card sx={{ width: 250, borderRadius: 3, my: 1 }} onClick={handleClick}>
        <CardActionArea>
          <CardContent sx={{ display: "flex", justifyContent: "center" }}>
            <Typography gutterBottom variant="h4" component="div">
              {capitalize(pokemon.name)}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Container>
  );
}
