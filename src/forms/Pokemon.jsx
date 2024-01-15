import * as React from "react";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";

import DataPokemon from "./DataPokemon";
import AbilityPokemon from "./AbilityPokemon";
import SpecialPower from "./SpecialPower";

import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

function Pokemon({ pokemonData }) {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  const ItemImage = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const [isShiny, setIsShiny] = React.useState(false);

  return pokemonData ? (
    <Grid
      container
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      sx={{ padding: 3 }}
    >
      <Grid item xs={12}>
        <FormControlLabel
          control={<Switch />}
          label="Switch to shiny"
          labelPlacement="top"
          checked={isShiny}
          onChange={() => setIsShiny(!isShiny)}
        />
      </Grid>

      <Grid item xs={12}>
        <ItemImage
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CardMedia
            sx={{
              width: 180,
              height: 180,
              objectFit: "cover",
            }}
            image={
              isShiny
                ? pokemonData?.sprites?.other["official-artwork"]?.front_shiny
                : pokemonData?.sprites?.other["official-artwork"]?.front_default
            }
            title="Pokemon Image"
          />

          <Grid item xs={6}>
            {" "}
            <CardContent>
              <Typography gutterBottom variant="h4">
                (ID: {pokemonData?.id}) {pokemonData?.name?.toUpperCase()}
              </Typography>

              {pokemonData?.types.map((type, index) => (
                <Chip
                  key={index}
                  label={type.type.name.toUpperCase()}
                  color={
                    type.type.name.toLowerCase() === "fire"
                      ? "error"
                      : type.type.name.toLowerCase() === "electric"
                      ? "warning"
                      : type.type.name.toLowerCase() === "psyhic"
                      ? "secondary"
                      : type.type.name.toLowerCase() === "fighting"
                      ? "success"
                      : type.type.name.toLowerCase() === "grass"
                      ? "success"
                      : "primary"
                  }
                  style={{ marginRight: 8 }}
                />
              ))}
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ padding: 2 }}
              >
                Weight: {pokemonData?.weight}kg <br />
                Height: {pokemonData?.height}m
              </Typography>
            </CardContent>
          </Grid>
        </ItemImage>
      </Grid>

      <Grid item xs={6}>
        <Item>
          <AbilityPokemon isShiny={isShiny} pokemonData={pokemonData} />
        </Item>
      </Grid>
      <Grid item xs={6}>
        <Item>
          <DataPokemon pokemonData={pokemonData} />
        </Item>
      </Grid>
      <Grid item xs={12}>
        <Item>
          <SpecialPower pokemonData={pokemonData} />
        </Item>
      </Grid>
    </Grid>
  ) : null;
}

export default Pokemon;
