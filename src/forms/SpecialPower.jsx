import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function SpecialPower({ pokemonData }) {
  const [specialAbility, setSpecialAbility] = React.useState(null);

  React.useEffect(() => {
    fetch(pokemonData?.abilities[0]?.ability.url)
      .then((response) => response.json())
      .then((pokemonAbility) => {
        console.log("pokemonAbility:", pokemonAbility);
        setSpecialAbility(pokemonAbility);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [pokemonData]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 10 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <h3>
                <b>Super power</b>
              </h3>
            </TableCell>
            <TableCell align="left">
              {" "}
              <h3>
                <b>Hidden power </b>
              </h3>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            {specialAbility !== null && (
              <>
                <TableCell component="th" scope="row">
                  {specialAbility?.effect_entries[0]?.effect}
                </TableCell>
                <TableCell component="th" scope="row">
                  {specialAbility?.effect_entries[0]?.short_effect}
                </TableCell>
              </>
            )}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default SpecialPower;
