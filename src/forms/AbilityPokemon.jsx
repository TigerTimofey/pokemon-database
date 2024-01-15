import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";

function AbilityPokemon({ pokemonData }) {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 10 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <h3>
                  <b>Ability</b>
                </h3>
              </TableCell>
              <TableCell align="center">
                {" "}
                <h3>
                  <b>Hidden attack </b>
                </h3>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pokemonData?.abilities.map((ability, index) => (
              <TableRow key={ability.ability.name}>
                <TableCell
                  component="th"
                  scope="row"
                  align="center"
                  sx={{ padding: 2 }}
                >
                  {ability.ability?.name.toUpperCase()}
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                  {ability.is_hidden === true ? "Yes" : "No"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{ padding: 0 }}
      >
        <Grid item xs={6}>
          <CardMedia
            sx={{
              width: 180,
              height: 180,
              objectFit: "cover",
            }}
            image={pokemonData?.sprites.back_default}
            title="Pokemon Image"
          />
        </Grid>

        <Grid item xs={6}>
          <CardMedia
            sx={{
              width: 180,
              height: 180,
              objectFit: "cover",
            }}
            image={pokemonData?.sprites.front_default}
            title="Pokemon Image"
          />
        </Grid>
      </Grid>
    </>
  );
}
export default AbilityPokemon;
