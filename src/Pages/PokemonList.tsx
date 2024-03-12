import React from "react";
import {
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from "@mui/material";
import { PokemonData } from "../App";
import capitalize from "../util/capitalize";
import { useNavigate } from "react-router-dom";

type PokemonListPageProps = {
  pokemons: PokemonData[];
  setSelectedPokemon: React.Dispatch<React.SetStateAction<PokemonData | null>>;
};

export default function PokemonList({
  pokemons,
  setSelectedPokemon,
}: PokemonListPageProps) {
  const navigate = useNavigate();

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
        {pokemons.map((poke: PokemonData) => (
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
            <PokemonCard
              pokemon={poke}
              setSelectedPokemon={setSelectedPokemon}
              navigate={navigate}
              key={poke.id}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export type PokemonCardProps = {
  pokemon: PokemonData;
  setSelectedPokemon: React.Dispatch<React.SetStateAction<PokemonData | null>>;
  navigate: ReturnType<typeof useNavigate>;
};

function PokemonCard({
  pokemon,
  setSelectedPokemon,
  navigate,
}: PokemonCardProps) {
  function handleClick() {
    setSelectedPokemon(pokemon);
    navigate("/pokemonDetail");
  }

  return (
    <Card sx={{ width: 250, borderRadius: 5 }} onClick={handleClick}>
      <CardActionArea>
        <CardMedia
          component="img"
          image={String(
            pokemon.sprites.other["official-artwork"].front_default
          )}
          alt={pokemon.name}
        />
        <CardContent sx={{ display: "flex", justifyContent: "center" }}>
          <Typography gutterBottom variant="h4" component="div">
            {capitalize(pokemon.name)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
