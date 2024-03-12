import { Typography, Card, CardContent, Grid, CardMedia } from "@mui/material";
import { PokemonData } from "../App";
import capitalize from "../util/capitalize";

export type PokemonDetailPageProps = {
  pokemon: PokemonData;
};

export default function PokemonDetail({ pokemon }: PokemonDetailPageProps) {
  return (
    <>
      <Typography variant="h3" sx={{ my: 5 }}>
        {capitalize(pokemon.name)}
      </Typography>
      <Grid container spacing={2}>
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <Card
            sx={{
              borderRadius: 5,
              p: 3,
              width: 400,
            }}
          >
            <CardMedia
              component="img"
              image={String(
                pokemon.sprites.other["official-artwork"].front_default
              )}
              alt={pokemon.name}
            />
          </Card>
          <Card
            sx={{
              borderRadius: 5,
              p: 3,
              width: 400,
              display: "flex",
            }}
          >
            <div style={{ width: "50%" }}>
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
            </div>
            <div style={{ width: "50%" }}>
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
            </div>
          </Card>
        </Grid>
        <Grid
          item
          xs={6}
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
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ mt: 5 }}
              >
                Move:
              </Typography>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                {pokemon.moves.map(
                  (item: { move: { name: string } }, id: number) => (
                    <Grid item xs={6}>
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
                    </Grid>
                  )
                )}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
