import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import {
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from "@mui/material";
import capitalize from "../util/capitalize";

export type TPokemonData = {
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

export default function PokemonList() {
  const navigate = useNavigate();

  const [pokemons, setPokemons] = useState<TPokemonData[]>([]);

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
    <>
      <Typography variant="h3" sx={{ my: 5 }}>
        List Pokemon
      </Typography>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}
      >
        {pokemons.map((poke: TPokemonData) => (
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
            <PokemonCard pokemon={poke} navigate={navigate} key={poke.id} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export type PokemonCardProps = {
  pokemon: TPokemonData;
  navigate: ReturnType<typeof useNavigate>;
};

function PokemonCard({ pokemon, navigate }: PokemonCardProps) {
  function handleClick() {
    navigate(`/pokemonDetail/${pokemon.id}`);
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
