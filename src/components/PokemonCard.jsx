import axios from "axios";
import React, { useEffect, useState } from "react";
import PokemonDetails from "./PokemonDetails";

const PokemonCard = ({ url }) => {
  const [pokemon, setPokemon] = useState();

  useEffect(() => {
    axios
      .get(url)
      .then((res) => setPokemon(res.data))
      .catch((err) => console.log(err));
  }, []);

  console.log(pokemon);

  return (
    <article className="pokemon__card">
      <aside className="pokemon__img">
        <img
          src={pokemon?.sprites.other["official-artwork"]["front_default"]}
          alt="pokemon-image"
          width="100%"
        />
      </aside>
      <aside className="pokemon__info">
        <p className="pokemon__id">#{pokemon?.id}</p>
        <h3 className="pokemon__name">{pokemon?.name}</h3>
        <ul className="pokemon__list_types">
          {pokemon?.types.map((slot) => (
            <li className="pokemon__item_types" key={slot.type.url}>
              {slot.type.name}
            </li>
          ))}
        </ul>
      </aside>
    </article>
  );
};

export default PokemonCard;
