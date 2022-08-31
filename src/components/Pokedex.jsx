import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PokemonCard from "./PokemonCard.jsx";

// Funcion de scroll al usar la paginacion
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
  const [pokemonSearch, setPokemonSearch] = useState();
  const [optionPokemon, setOptionPokemon] = useState("ALL");
  const [pokemonList, setpokemonList] = useState();
  const trainerName = useSelector((state) => state.trainerName);
  const navigate = useNavigate();

  useEffect(() => {
    listPokemons();
    if (optionPokemon !== "ALL") {
      const URL = `https://pokeapi.co/api/v2/type/${optionPokemon}/`;
      axios.get(URL)
        .then((res) => {
          const arrTemp = res.data.pokemon.map((e) => e.pokemon);
          setPokemons({ results: arrTemp });
        })
        .catch((err) => console.log(err));
    } else if (pokemonSearch) {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemonSearch}`;
      const objTemp = {
        results: [{ url }],
      };
      setPokemons(objTemp);
    } else {
      const URL = "https://pokeapi.co/api/v2/pokemon";
      axios.get(URL)
        .then((res) => setPokemons(res.data))
        .catch((err) => console.log(err));
    }
  }, [pokemonSearch, optionPokemon]);

  // Funcion para obtener los tipos de pokemon y listarlos en el select
  const listPokemons = () => {
    const URL = "https://pokeapi.co/api/v2/type";
    axios
      .get(URL)
      .then((res) => setpokemonList(res.data.results))
      .catch((err) => console.log(err));
  };

  // Funcion de retroceder de pagina
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

  // Funcion de avanzar de pagina
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

  // Funcion de input
  const handleSubmit = (e) => {
    e.preventDefault();
    setPokemonSearch(e.target.inputSearch.value.trim().toLowerCase());
    e.target.inputSearch.value = "";
    setOptionPokemon('ALL');
  };

  // Funcion de select
  const handleChangeSelect = (e) => {
    setOptionPokemon(e.target.value);
    setPokemonSearch('');
  };

  return (
    <section className="pokedex">
      <button className="pokedex__btn_login" onClick={() => navigate('/')}><i className="fa-solid fa-arrow-left"></i></button>
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
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="search by pokemon name"
              id="inputSearch"
            />
            <button>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
        <div className="filters__select">
          <p className="select__title">Select the type of pokemon:</p>
          <select value={optionPokemon} onChange={handleChangeSelect}>
            <option value="all">All pokemons</option>
            {pokemonList?.map((type) => (
              <option key={type.name} value={type.name}>
                {type.name}
              </option>
            ))}
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
