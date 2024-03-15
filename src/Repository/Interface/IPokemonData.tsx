export interface IPokemonData {
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
}
