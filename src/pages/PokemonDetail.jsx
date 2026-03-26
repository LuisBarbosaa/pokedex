import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import { getPokemonDetail } from '../services/api';
import './PokemonDetail.css';

function PokemonDetail() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDetail() {
      try {
        const data = await getPokemonDetail(name);
        setPokemon(data);
      } catch {
        setError('Pokemon nao encontrado.');
      } finally {
        setLoading(false);
      }
    }

    fetchDetail();
  }, [name]);

  if (loading) return <Loading />;
  if (error) return <p className='error'>{error}</p>;

  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

  return (
    <main className='detail'>
      <Link to='/' className='back'>
        ← Voltar
      </Link>

      <div className='detail-card'>
        <img src={imageUrl} alt={pokemon.name} />
        <h2>
          #{String(pokemon.id).padStart(3, '0')} — {pokemon.name}
        </h2>

        <div className='types'>
          {pokemon.types.map((typeItem) => (
            <span key={typeItem.type.name} className={`type type-${typeItem.type.name}`}>
              {typeItem.type.name}
            </span>
          ))}
        </div>

        <div className='info-grid'>
          <div>
            <strong>Altura</strong>
            <p>{(pokemon.height / 10).toFixed(1)} m</p>
          </div>
          <div>
            <strong>Peso</strong>
            <p>{(pokemon.weight / 10).toFixed(1)} kg</p>
          </div>
        </div>

        <h3>Habilidades</h3>
        <ul>
          {pokemon.abilities.map((abilityItem) => (
            <li key={abilityItem.ability.name}>{abilityItem.ability.name}</li>
          ))}
        </ul>

        <h3>Status Base</h3>
        <div className='stats'>
          {pokemon.stats.map((statItem) => (
            <div key={statItem.stat.name} className='stat-row'>
              <span className='stat-name'>{statItem.stat.name}</span>
              <div className='stat-bar'>
                <div className='stat-fill' style={{ width: `${Math.min(statItem.base_stat, 100)}%` }} />
              </div>
              <span>{statItem.base_stat}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default PokemonDetail;
