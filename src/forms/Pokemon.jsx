import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";

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

  return pokemonData ? (
    <Grid
      container
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      sx={{ padding: 1 }}
    >
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
            image={pokemonData?.sprites.other["official-artwork"].front_default}
            title="Pokemon Image"
          />
          <Grid item xs={6}>
            {" "}
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                (ID:{pokemonData?.id}) {pokemonData?.name.toUpperCase()}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ padding: 1 }}
              >
                {pokemonData?.types.map((type, index) => (
                  <Chip
                    key={index}
                    label={type.type.name.toUpperCase()}
                    color={
                      type.type.name.toLowerCase() === "fire"
                        ? "secondary"
                        : "primary"
                    }
                    style={{ marginRight: 8 }}
                  />
                ))}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Weight: {pokemonData?.weight}kg <br />
                Height: {pokemonData?.height}m
              </Typography>
            </CardContent>
          </Grid>
        </ItemImage>
      </Grid>

      <Grid item xs={6}>
        <Item>
          <CardMedia
            sx={{ height: 300, objectFit: "contain" }}
            image={pokemonData?.sprites.other["official-artwork"].front_default}
            title="Pokemon Image"
          />
        </Item>
      </Grid>
      <Grid item xs={6}>
        <Item>
          {" "}
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              (ID:{pokemonData?.id}) {pokemonData?.name.toUpperCase()}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {pokemonData?.types
                .map((type) => type.type.name)
                .join(", ")
                .toUpperCase()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Weight: {pokemonData?.weight}kg <br />
              Height: {pokemonData?.height}m
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {pokemonData?.stats.map((stat, index) => (
                <React.Fragment key={index}>
                  {`${stat.stat.name}: ${stat.base_stat}`}
                  <br />
                </React.Fragment>
              ))}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Item>
      </Grid>
    </Grid>
  ) : null;
}

export default Pokemon;
