import React from "react";
import logo from "./logo.png";
import "./App.css";
import SearchForm from "./forms/SearchForm";
import Pokemon from "./forms/Pokemon";
import pokemonImage from "./pokemon.png";
import Swal from "sweetalert2";

function App() {
  const [listOfPokemons, setListOfPokemons] = React.useState([]);
  const [pokemon, setPokemon] = React.useState("");
  const [pokemonData, setPokemonData] = React.useState(null);

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
  React.useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=1302&offset=0`)
      .then((response) => response.json())
      .then((data) => {
        const pokemonNames = data.results.map((pokemon) => pokemon.name);
        console.log("pokemonNames:", pokemonNames);
        setListOfPokemons(pokemonNames);
      })
      .catch((err) => {
        console.log("error", err.message);
      });
  }, []);

  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="Welcome">CHOOSE YOUR POKEMON</p>
        <SearchForm
          handleSearch={handleSearch}
          pokemon={pokemon}
          setPokemon={setPokemon}
          listOfPokemons={listOfPokemons}
        />
      </div>
      <div className="App-header-pokemon Welcome">
        {!pokemonData ? (
          <img src={pokemonImage} alt="logo" width={380} />
        ) : (
          <Pokemon pokemonData={pokemonData} listOfPokemons={listOfPokemons} />
        )}
      </div>
    </div>
  );
}

export default App;
