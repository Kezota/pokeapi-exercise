import { Typography, Card, CardContent, Grid } from "@mui/material";
import { IPokemonData } from "../../../Repository/Interface/IPokemonData";

export function StatsCard({ pokemon }: { pokemon: IPokemonData }) {
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
