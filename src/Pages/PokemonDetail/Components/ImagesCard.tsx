import { Card, Grid, CardMedia, Box } from "@mui/material";
import { IPokemonData } from "../../../Repository/Interface/IPokemonData";

export function ImagesCard({ pokemon }: { pokemon: IPokemonData }) {
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
