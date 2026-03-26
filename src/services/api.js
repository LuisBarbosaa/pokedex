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
