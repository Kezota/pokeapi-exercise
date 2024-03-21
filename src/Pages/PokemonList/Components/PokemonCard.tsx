import { useNavigate } from "react-router-dom";
import {
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Container,
} from "@mui/material";
import capitalize from "../../../util/capitalize";
import { PokemonCardProps } from "../../../Repository/Interface/PokemonCardProps";

export function PokemonCard({ pokemon }: PokemonCardProps) {
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
