import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PokemonCard = ({ url }) => {
  const [pokemon, setPokemon] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(url)
      .then((res) => setPokemon(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleClickPokemon = () => navigate(`/pokedex/${pokemon.name}`)
  
  return (
    <article
      className={`pokemon__card bgn-${pokemon?.types[0].type.name}`}
      onClick={handleClickPokemon}
    >
      <aside className={`pokemon__img bgn-${pokemon?.types[0].type.name}`}>
        <img
          src={pokemon?.sprites.other["official-artwork"]["front_default"]}
          alt="pokemon-image"
          width="100%"
        />
      </aside>
      <aside className={`pokemon__info bdr-${pokemon?.types[0].type.name}`}>
        <h3 className="pokemon__name">{pokemon?.name}</h3>
        <ul className="pokemon__list_types">
          {pokemon?.types.map((slot) => (
            <li className="pokemon__item_types" key={slot.type.url}>
              {slot.type.name}
            </li>
          ))}
        </ul>
        <div className="pokemon__div_stats">
          <div className="stats__hp">
            <h5 className="stats__title">HP: </h5>
            <p className="stats__value">{pokemon?.stats[0]["base_stat"]}</p>
          </div>
          <div className="stats__atk">
            <h5 className="stats__title">ATK: </h5>
            <p className="stats__value">{pokemon?.stats[1]["base_stat"]}</p>
          </div>
          <div className="stats__def">
            <h5 className="stats__title">DEF: </h5>
            <p className="stats__value">{pokemon?.stats[2]["base_stat"]}</p>
          </div>
        </div>
      </aside>
    </article>
  );
};

export default PokemonCard;
