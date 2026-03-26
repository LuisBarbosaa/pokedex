import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2';

export async function getPokemonList(limit = 151) {
  const response = await axios.get(`${BASE_URL}/pokemon?limit=${limit}&offset=0`);
  return response.data.results;
}

export async function getPokemonDetail(nameOrId) {
  const response = await axios.get(`${BASE_URL}/pokemon/${nameOrId}`);
  return response.data;
}

export async function getPokemonTypes() {
  const response = await axios.get(`${BASE_URL}/type`);
  return response.data.results
    .map((typeItem) => typeItem.name)
    .filter((typeName) => typeName !== 'unknown' && typeName !== 'shadow');
}

export async function getPokemonByType(typeName) {
  const response = await axios.get(`${BASE_URL}/type/${typeName}`);
  return response.data.pokemon;
}
