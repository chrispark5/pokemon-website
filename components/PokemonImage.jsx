import React from "react";

function PokemonImage({ url }) {
  const extractIdFromUrl = (url) => {
    const parts = url.split("/");
    return parts[parts.length - 2];
  };

  const pokemonId = extractIdFromUrl(url);

  return (
    <img
      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
      alt={`Image of Pokémon with ID ${pokemonId}`}
    />
  );
}

export default PokemonImage;
