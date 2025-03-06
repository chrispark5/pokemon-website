import { Divider } from "@mantine/core";
import { TextInput, Container } from "@mantine/core";
import { IconSearch, IconPokeball } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import PokemonImage from "../components/PokemonImage";
import PokemonList from "../components/PokemonList";
export default function Search() {
  const icon = <IconSearch size={16}></IconSearch>;
  const Poke = <IconPokeball size={26} />;

  const [searchTerm, setSearchTerm] = useState("");
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [initialState, setInitialState] = useState(true);
  const searchForPokemon = () => {
    console.log("Searching for ", searchTerm);
    setFilteredPokemon(
      pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    console.log(filteredPokemon);
    // setSearchTerm("");
    setInitialState(false);
  };
  useEffect(() => {
    // Fetch the list of Pokémon names using fetch
    fetch("https://pokeapi.co/api/v2/pokemon?limit=1025")
      .then((response) => response.json())
      .then((data) => {
        setPokemonList(data.results);
      })
      .catch((error) => {
        console.error("Error fetching Pokémon data:", error);
      });
  }, []);

  return (
    // <div className="pokeSearch">
    <div>
      <Container>
        <div style={{ display: "flex", alignItems: "center" }}>
          <h1 style={{ fontFamily: "pokemon" }}>Search for Pokemon</h1>

          {Poke}
        </div>
        <TextInput
          className="mt-4"
          radius="xl"
          placeholder="Search for a pokemon"
          rightSection={
            <button
              type="button"
              className="btn btn-success"
              onClick={() => searchForPokemon()}
            >
              {icon}
            </button>
          }
          styles={{
            input: {
              fontFamily: "pokemon-classic, sans-serif",
            },
          }}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              searchForPokemon();
            }
          }}
        />{" "}
        {!initialState && <PokemonList pokemon={filteredPokemon} />}
      </Container>
    </div>
  );
}
