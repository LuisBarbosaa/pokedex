import { useEffect, useState } from 'react';
import PokemonCard from '../components/PokemonCard';
import Loading from '../components/Loading';
import { getPokemonList } from '../services/api';
import './Home.css';

function Home() {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getPokemonList();
        setPokemonList(data);
        setFilteredList(data);
      } catch {
        setError('Nao foi possivel carregar os Pokemon. Tente novamente.');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    const lower = search.toLowerCase();
    setFilteredList(pokemonList.filter((pokemon) => pokemon.name.includes(lower)));
  }, [search, pokemonList]);

  if (loading) return <Loading />;
  if (error) return <p className='error'>{error}</p>;

  return (
    <main className='home'>
      <input
        className='search'
        type='text'
        placeholder='Buscar Pokemon...'
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      <div className='grid'>
        {filteredList.map((pokemon) => (
          <PokemonCard key={pokemon.name} name={pokemon.name} url={pokemon.url} />
        ))}
      </div>
    </main>
  );
}

export default Home;
