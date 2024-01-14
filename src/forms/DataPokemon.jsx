import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function DataPokemon({ pokemonData }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 100 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">
              <h3>
                <b>Base stat</b>
              </h3>
            </TableCell>
            <TableCell align="center">
              {" "}
              <h3>
                <b>Value</b>
              </h3>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pokemonData?.stats.map((stat, index) => (
            <TableRow key={stat.stat.name}>
              <TableCell component="th" scope="row" align="center">
                {stat.stat.name.toUpperCase()}
              </TableCell>
              <TableCell component="th" scope="row" align="center">
                {stat.base_stat}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default DataPokemon;
