import { useEffect, useState } from "react";
import Link from "next/link";
import CustomNavbar from "../components/MyNavbar";
import { Card } from "@mantine/core";

export default function Pokemon() {
  const [pokemon, setPokemon] = useState("");
  const [pokemonData, setPokemonData] = useState([]);
  const [filter, setFilter] = useState("");
  const allTypes = [
    "all",
    "normal",
    "fire",
    "water",
    "electric",
    "grass",
    "ice",
    "fighting",
    "poison",
    "ground",
    "flying",
    "psychic",
    "bug",
    "rock",
    "ghost",
    "dark",
    "dragon",
    "steel",
    "fairy",
  ];

  const [sortBy, setSortBy] = useState("name");

  const handleTypeChange = (event) => {
    setFilter(event.target.value);
    filterByType();
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  const sortPokemonData = (data) => {
    switch (sortBy) {
      case "name":
        return data.sort((a, b) => a.name.localeCompare(b.name));
      case "weight":
        return data.sort((a, b) => a.weight - b.weight);
      case "height":
        return data.sort((a, b) => a.height - b.height);
      default:
        return data;
    }
  };

  const sortedPokemonData = sortPokemonData(pokemonData);

  const updatePokemon = async () => {
    try {
      const response = await fetch(`http://localhost:8080/pokemon`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      // Assuming jsonData.results is an array containing Pokémon data
      setPokemonData(jsonData);
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
    }
  };

  useEffect(() => {
    updatePokemon();
    console.log("running");
  }, []); // Run when pokemonData changes

  const filterByType = () => {
    if (filter === "all") {
      return sortedPokemonData;
    }
    return sortedPokemonData.filter((pokemon) =>
      pokemon.types.some((t) =>
        t.type.name.toLowerCase().includes(filter.toLowerCase())
      )
    );
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/pokemon/${pokemon}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      console.log(jsonData);
      setPokemonData([...pokemonData, jsonData]);
      // console.log(pokemonData)
      return;
    } catch (error) {
      console.log(error);
    }
  };
  function addPokemon() {
    setPokemon("");
    fetchData();
  }
  const deletePokemon = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/pokemon/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      updatePokemon();
      console.log("DELETE request successful");
    } catch (error) {
      console.error("Error deleting to-do:", error);
    }
  };

  return (
    <div className="min-h-screen">
      <h1 className="text-3xl text-center m-4 font-bold">Favorite Pokémon</h1>
      <CustomNavbar />
      <div className="text-center mt-6">
        <select
          value={filter}
          onChange={handleTypeChange}
          className="mb-4 p-2 mx-2 border border-gray-300 rounded"
        >
          {allTypes.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>

        <label htmlFor="sortBy">Sort by:</label>
        <select
          className="mb-5 mx-2 p-2 border border-gray-300 rounded"
          id="sortBy"
          value={sortBy}
          onChange={handleSortByChange}
        >
          <option value="name">Name</option>
          <option value="height">Height</option>
          <option value="weight">Weight</option>
          {/* Add more options for other sorting criteria */}
        </select>
      </div>

      <ul className="grid grid-cols-4">
        {filterByType().map((pokemon) => {
          console.log(pokemon);
          return (
            <Card
              shadow="xl"
              padding="xl"
              style={{ backgroundColor: "#f9f9f9", marginTop: "1rem" }}
              withBorder
              m={"md"}
            >
              <button
                style={{ float: "right" }}
                onClick={() => deletePokemon(pokemon.id)}
              >
                <p className="hover:text-red-400">X</p>
              </button>
              <Link href={`/pokedex/${pokemon.id}`}>
                <li>
                  {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                </li>
                <div className="flex justify-center items-center">
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                    alt=""
                  />
                </div>
              </Link>
            </Card>
          );
        })}
      </ul>
      <div className="text-center">
        <input
          type="text"
          value={pokemon}
          onChange={(e) => setPokemon(e.target.value)}
          className="p-2 rounded bg-blue-200 placeholder-white"
          placeholder="Enter Pokemon"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addPokemon();
            }
          }}
        />
        <button
          onClick={addPokemon}
          className="bg-green-200 hover:bg-green-400 rounded p-2 m-2"
        >
          Add to Favorites
        </button>
      </div>
    </div>
  );
}
