import { useEffect, useMemo, useState } from 'react';
import PokemonCard from '../components/PokemonCard';
import Loading from '../components/Loading';
import { getPokemonByType, getPokemonList, getPokemonTypes } from '../services/api';
import './Home.css';

const TYPE_TRANSLATIONS = {
  normal: 'Normal',
  fire: 'Fogo',
  water: 'Água',
  electric: 'Elétrico',
  grass: 'Planta',
  ice: 'Gelo',
  fighting: 'Lutador',
  poison: 'Veneno',
  ground: 'Terra',
  flying: 'Voador',
  psychic: 'Psíquico',
  bug: 'Inseto',
  rock: 'Pedra',
  ghost: 'Fantasma',
  dragon: 'Dragão',
  dark: 'Sombrio',
  steel: 'Aço',
  fairy: 'Fada',
};

function translateTypeName(typeName) {
  return TYPE_TRANSLATIONS[typeName] || typeName;
}

function getPokemonIdFromUrl(url) {
  return Number(url.split('/').filter(Boolean).pop());
}

function Home() {
  const [pokemonList, setPokemonList] = useState([]);
  const [typeList, setTypeList] = useState([]);
  const [selectedType, setSelectedType] = useState('all');
  const [typePokemonNames, setTypePokemonNames] = useState(null);
  const [sortBy, setSortBy] = useState('id-asc');
  const [visibleCount, setVisibleCount] = useState(24);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingType, setLoadingType] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getPokemonList();
        setPokemonList(data);
      } catch {
        setError('Não foi possível carregar os Pokémon. Tente novamente.');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchTypes() {
      try {
        const data = await getPokemonTypes();
        setTypeList(data);
      } catch {
        setTypeList([]);
      }
    }

    fetchTypes();
  }, []);

  useEffect(() => {
    async function fetchByType() {
      if (selectedType === 'all') {
        setTypePokemonNames(null);
        return;
      }

      setLoadingType(true);
      try {
        const data = await getPokemonByType(selectedType);
        const names = new Set(data.map((typeItem) => typeItem.pokemon.name));
        setTypePokemonNames(names);
      } catch {
        setTypePokemonNames(new Set());
      } finally {
        setLoadingType(false);
      }
    }

    fetchByType();
  }, [selectedType]);

  useEffect(() => {
    setVisibleCount(24);
  }, [search, selectedType, sortBy]);

  const processedList = useMemo(() => {
    const lowerSearch = search.toLowerCase().trim();

    const filtered = pokemonList.filter((pokemon) => {
      const matchSearch = pokemon.name.includes(lowerSearch);
      const matchType = selectedType === 'all' || (typePokemonNames && typePokemonNames.has(pokemon.name));
      return matchSearch && matchType;
    });

    return filtered.sort((a, b) => {
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name);

      const idA = getPokemonIdFromUrl(a.url);
      const idB = getPokemonIdFromUrl(b.url);
      return sortBy === 'id-desc' ? idB - idA : idA - idB;
    });
  }, [pokemonList, search, selectedType, sortBy, typePokemonNames]);

  const visiblePokemon = processedList.slice(0, visibleCount);
  const canLoadMore = visibleCount < processedList.length;

  if (loading) return <Loading />;
  if (error) return <p className='error'>{error}</p>;

  return (
    <main className='home'>
      <input
        className='search'
        type='text'
        placeholder='Buscar Pokémon...'
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      <div className='controls'>
        <select
          className='control-select'
          value={selectedType}
          onChange={(event) => setSelectedType(event.target.value)}
        >
          <option value='all'>Todos os tipos</option>
          {typeList.map((typeName) => (
            <option key={typeName} value={typeName}>
              {translateTypeName(typeName)}
            </option>
          ))}
        </select>

        <select className='control-select' value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
          <option value='id-asc'>Ordenar por # (crescente)</option>
          <option value='id-desc'>Ordenar por # (decrescente)</option>
          <option value='name-asc'>Ordenar por nome (A-Z)</option>
          <option value='name-desc'>Ordenar por nome (Z-A)</option>
        </select>
      </div>

      {loadingType && <p className='status-message'>Carregando filtro por tipo...</p>}

      {!loadingType && processedList.length === 0 && (
        <p className='status-message'>Nenhum Pokémon encontrado para os filtros atuais.</p>
      )}

      <div className='grid'>
        {visiblePokemon.map((pokemon) => (
          <PokemonCard key={pokemon.name} name={pokemon.name} url={pokemon.url} />
        ))}
      </div>

      {canLoadMore && (
        <button className='load-more' type='button' onClick={() => setVisibleCount((value) => value + 24)}>
          Carregar mais
        </button>
      )}
    </main>
  );
}

export default Home;
