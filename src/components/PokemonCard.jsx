import { Link } from 'react-router-dom';
import './PokemonCard.css';

function PokemonCard({ name, url }) {
  const id = url.split('/').filter(Boolean).pop();
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  return (
    <Link to={`/pokemon/${name}`} className='card-link'>
      <div className='card'>
        <img src={imageUrl} alt={name} />
        <p className='card-id'>#{String(id).padStart(3, '0')}</p>
        <h3 className='card-name'>{name}</h3>
      </div>
    </Link>
  );
}

export default PokemonCard;
