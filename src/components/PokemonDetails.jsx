import React, { useState, useEffect } from 'react'
import axios from "axios";
import { useParams } from 'react-router-dom'

const PokemonDetails = () => {
  const [pokemonInfo, setPokemonInfo] = useState()
  const {pokemonName} = useParams()

  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`
    axios.get(URL)
    .then(res => setPokemonInfo(res.data))
    .catch(err => console.log(err))
  }, [])

  console.log(pokemonName);
  console.log(pokemonInfo);

  return (
    <section>
      <img src={pokemonInfo?.sprites.other['official-artwork'].front_default} alt="" />
      <h1>{pokemonInfo?.name}</h1>
    </section>
  )
}

export default PokemonDetails