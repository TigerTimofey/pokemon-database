import React from "react";
import logo from "./logo.png";
import "./App.css";
import SearchForm from "./forms/SearchForm";
import Pokemon from "./forms/Pokemon";
import Swal from "sweetalert2";

function App() {
  const [pokemon, setPokemon] = React.useState("");
  const [pokemonData, setPokemonData] = React.useState("");

  const handleSearch = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
      .then((response) => response.json())
      .then((pokemonData) => {
        console.log("pokemonData:", pokemonData);
        setPokemonData(pokemonData);
      })
      .catch((err) => {
        console.log(err.message);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `There is no such Pokemon as ${pokemon}`,
          footer: '<a href="#">See list of all Pokemons</a>',
        });
      });
  };

  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="Welcome">CHOOSE YOUR POKEMON</p>
        <SearchForm
          handleSearch={handleSearch}
          pokemon={pokemon}
          setPokemon={setPokemon}
        />
      </div>
      <div className="App-header-pokemon Welcome">
        <Pokemon pokemonData={pokemonData} />
      </div>
    </div>
  );
}

export default App;
