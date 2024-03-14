import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios, { AxiosError } from "axios";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  CardMedia,
  Box,
} from "@mui/material";
import { TPokemonData } from "./PokemonList";
import capitalize from "../util/capitalize";

export default function PokemonDetail() {
  const [pokemon, setPokemon] = useState<TPokemonData | undefined>();
  const [errorMessage, setErrorMessage] = useState("");
  const params = useParams();

  useEffect(() => {
    const getPokemonDetails = async () => {
      try {
        setErrorMessage("Loading...");
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${params?.pokemonId || ""}`
        );

        setPokemon(response.data);
      } catch (err) {
        const error = err as AxiosError;
        console.log({ ...error, stack: "" });
        setErrorMessage(`Data with pokemonId ${params?.pokemonId} not found`);
      }
    };
    getPokemonDetails();
  }, [params?.pokemonId]);

  if (!pokemon) return <Typography variant="h3">{errorMessage}</Typography>;

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

function ImagesCard({ pokemon }: { pokemon: TPokemonData }) {
  return (
    <Grid
      item
      xs={12}
      md={6}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <Card
        sx={{
          borderRadius: 5,
          p: 3,
          width: 500,
        }}
      >
        <CardMedia
          component="img"
          image={String(
            pokemon.sprites.other["official-artwork"].front_default
          )}
          alt={pokemon?.name}
        />
      </Card>
      <Card
        sx={{
          borderRadius: 5,
          p: 3,
          width: 500,
          display: "flex",
          mb: 4,
        }}
      >
        <Box sx={{ width: "50%" }}>
          <CardMedia
            component="img"
            image={String(pokemon.sprites.back_default)}
            alt={pokemon.name}
          />
          <CardMedia
            component="img"
            image={String(pokemon.sprites.back_shiny)}
            alt={pokemon.name}
          />
        </Box>
        <Box sx={{ width: "50%" }}>
          <CardMedia
            component="img"
            image={String(pokemon.sprites.front_default)}
            alt={pokemon.name}
          />
          <CardMedia
            component="img"
            image={String(pokemon.sprites.front_shiny)}
            alt={pokemon.name}
          />
        </Box>
      </Card>
    </Grid>
  );
}

function StatsCard({ pokemon }: { pokemon: TPokemonData }) {
  return (
    <Grid
      item
      xs={12}
      md={6}
      sx={{
        display: "flex",
        alignItems: "start",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          borderRadius: 5,
          p: 3,
          width: 500,
        }}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Pokedex ID: {pokemon.id}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Height: {pokemon.height}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Weight: {pokemon.weight}
          </Typography>
          <Typography gutterBottom variant="h5" component="div" sx={{ mt: 5 }}>
            Move:
          </Typography>
          {pokemon.moves.map((item: { move: { name: string } }, id: number) => (
            <Card sx={{ px: 1.4, mb: 0.5 }} key={id}>
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {item.move.name}
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </Grid>
  );
}
