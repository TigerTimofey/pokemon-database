import * as React from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";

function SearchForm({ handleSearch, pokemon, setPokemon, listOfPokemons }) {
  return (
    <Stack direction="row" spacing={2}>
      <Autocomplete
        id="pokemon-autocomplete"
        options={listOfPokemons}
        freeSolo
        value={pokemon}
        onChange={(event, newValue) => {
          setPokemon(newValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search for a Pokemon..."
            color="success"
            variant="outlined"
            sx={{ width: 230 }}
            onChange={(event) => {
              setPokemon(event.target.value);
            }}
          />
        )}
      />
      <Button variant="contained" color="success" onClick={handleSearch}>
        Catch
      </Button>
    </Stack>
  );
}

export default SearchForm;
