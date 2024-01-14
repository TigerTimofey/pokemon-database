import * as React from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function SearchForm({ handleSearch, pokemon, setPokemon }) {
  return (
    <Stack direction="row" spacing={2}>
      <TextField
        id="outlined-controlled"
        value={pokemon}
        color="success"
        onChange={(event) => {
          setPokemon(event.target.value);
        }}
      />
      <Button variant="contained" color="success" onClick={handleSearch}>
        Catch
      </Button>
    </Stack>
  );
}

export default SearchForm;
