import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const PokemonDetails = () => {
  const [pokemonInfo, setPokemonInfo] = useState();
  const { pokemonName } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`;
    axios
      .get(URL)
      .then((res) => setPokemonInfo(res.data))
      .catch((err) => console.log(err));
  }, []);

  console.log(pokemonInfo);

  return (
    <section className="details">
      <button className="pokedex__btn_login" onClick={() => navigate(-1)}>
        <i className="fa-solid fa-arrow-left"></i>
      </button>
      <article className="details__grid">
        <article className="details__pokemon">
          <div className="details__pokemon_img">
            <img
              src={
                pokemonInfo?.sprites.other["official-artwork"]["front_default"]
              }
              alt=""
              width="100%"
            />
          </div>
          <h2 className="details__pokemon_name">{pokemonInfo?.name}</h2>
          <p className="details__pokemon_id">#{pokemonInfo?.id}</p>
          <ul className="details__pokemon_list">
            <div className="details__pokemon_div">
              <p className="details__pokemon_title">Weight:</p>
              <li className="details__pokemon_item">{pokemonInfo?.weight}</li>
            </div>
            <div className="details__pokemon_div">
              <p className="details__pokemon_title">Height:</p>
              <li className="details__pokemon_item">{pokemonInfo?.height}</li>
            </div>
            <div className="details__pokemon_div">
              <p className="details__pokemon_title">HP:</p>
              <li className="details__pokemon_item">
                {pokemonInfo?.stats[0]["base_stat"]}
              </li>
            </div>
            <div className="details__pokemon_div">
              <p className="details__pokemon_title">Attack:</p>
              <li className="details__pokemon_item">
                {pokemonInfo?.stats[1]["base_stat"]}
              </li>
            </div>
            <div className="details__pokemon_div">
              <p className="details__pokemon_title">Defense:</p>
              <li className="details__pokemon_item">
                {pokemonInfo?.stats[2]["base_stat"]}
              </li>
            </div>
            <div className="details__pokemon_div">
              <p className="details__pokemon_title">Speed:</p>
              <li className="details__pokemon_item">
                {pokemonInfo?.stats[5]["base_stat"]}
              </li>
            </div>
          </ul>
        </article>
        <article className="details__infos">
          <article className="details__info1">
            <h2 className="details__type">TYPE: </h2>
            <div className="details__type_div">
              {pokemonInfo?.types.map((type) => (
                <p className={`details__types bgn-${type.type.name}`}>
                  {type.type.name}
                </p>
              ))}
            </div>
          </article>
          <article className="details__info2">
            <h2 className="details__abilities">Abilities: </h2>
            <div className="details__abilities_div">
              {pokemonInfo?.abilities.map((abilitie) => (
                <p className="details__abilities_value">
                  {abilitie.ability.name}
                </p>
              ))}
            </div>
          </article>
        </article>
      <aside className="details__moves">
        <h2 className="details__moves_title">MOVES: </h2>
        <div className="details__moves_container">
          <ul className="details__moves_list">
            {pokemonInfo?.moves.map((move) => (
              <li className="details__moves_item">{move.move.name}</li>
            ))}
          </ul>
        </div>
      </aside>
      </article>
    </section>
  );
};

export default PokemonDetails;
