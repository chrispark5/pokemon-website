const API_URL = "https://pokeapi.co/api/v2/type/";

export const fetchTypeData = async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data.results;
};

export const fetchTypeDetails = async (type) => {
  const response = await fetch(`${API_URL}${type}`);
  const data = await response.json();
  return data;
};

export const fetchPokemonByName = async (pokemonName) => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
  );
  const data = await response.json();
  return data;
};
