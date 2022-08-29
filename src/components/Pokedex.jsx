import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PokemonCard from "./PokemonCard.jsx";

const scrollToTop = () => {
  const container = document.querySelector(".pokedex__container");
  container.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const Pokedex = () => {
  const [pokemons, setPokemons] = useState();
  const [pagination, setPagination] = useState(1);
  const trainerName = useSelector((state) => state.trainerName);

  useEffect(() => {
    const URL = "https://pokeapi.co/api/v2/pokemon";
    axios
      .get(URL)
      .then((res) => setPokemons(res.data))
      .catch((err) => console.log(err));
  }, []);

  const paginationNext = () => {
    const URLNext = pokemons?.next;
    if (URLNext !== null) {
      axios
        .get(URLNext)
        .then((res) => {
          setPokemons(res.data);
          setPagination(pagination + 1);
          scrollToTop();
        })
        .catch((err) => console.log(err));
    }
  };

  const paginationPrevious = () => {
    const URLPrevious = pokemons?.previous;
    if (URLPrevious !== null) {
      axios
        .get(URLPrevious)
        .then((res) => {
          setPokemons(res.data);
          setPagination(pagination - 1);
          scrollToTop();
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <section className="pokedex">
      <div className="pokedex__logo">
        <img
          src="https://i.postimg.cc/xdnhfYwx/pokedex-title.png"
          alt="pokedex-logo"
          width="100%"
        />
      </div>
      <h2 className="pokedex__welcome">
        Welcome <span>{trainerName}</span>, here you can find your favorite
        pokemon
      </h2>
      <article className="pokedex__filters">
        <div className="filters__input">
          <input type="text" placeholder="search by pokemon name" />
          <button>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        <div className="filters__select">
          <p className="select__title">Select the type of pokemon:</p>
          <select name="type" id="pokemon__type">
            <option value="all">All pokemons</option>
            <option value="bug">Bug</option>
            <option value="dark">Dark</option>
            <option value="dragon">Dragon</option>
            <option value="electric">Electric</option>
            <option value="fairy">Fairy</option>
            <option value="fighting">Fighting</option>
            <option value="fire">Fire</option>
            <option value="flying">Flying</option>
            <option value="ghost">Ghost</option>
            <option value="grass">Grass</option>
            <option value="ground">Ground</option>
            <option value="ice">Ice</option>
            <option value="normal">Normal</option>
            <option value="poison">Poison</option>
            <option value="psychic">Psychic</option>
            <option value="rock">Rock</option>
            <option value="steel">Steel</option>
            <option value="water">Water</option>
          </select>
        </div>
        <div className="filters__pagination">
          <div className="pagination__btn" onClick={paginationPrevious}>
            <i className="fa-solid fa-arrow-left"></i>
          </div>
          <div className="pagination__info">
            <p className="pagination__title">Page:</p>
            <span className="pagination__page">{pagination}</span>
          </div>
          <div className="pagination__btn" onClick={paginationNext}>
            <i className="fa-solid fa-arrow-right"></i>
          </div>
        </div>
      </article>
      <article className="pokedex__container">
        {pokemons?.results.map((pokemon) => (
          <PokemonCard key={pokemon.url} url={pokemon.url} />
        ))}
      </article>
    </section>
  );
};

export default Pokedex;
