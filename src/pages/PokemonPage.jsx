import axios from "axios";
import { json, useLoaderData } from "react-router";

const PokemonPage = () => {
  const pokemonData = useLoaderData();
  console.log(pokemonData);
  return (
    <>
      <h1>{pokemonData.name}</h1>
      {pokemonData.abilities.map((pokemon) => (
        <p key={pokemon.ability.name}>{pokemon.ability.name}</p>
      ))}
      <p>{pokemonData.base_experience}</p>
      <p>{pokemonData.height}</p>
      <p>{pokemonData.weight}</p>
      <img src={pokemonData.sprites.other.dream_world.front_default} alt="Pokemon"/>


    </>
  );
};

export default PokemonPage;

export const loader = async ({ params }) => {
  const name = params.pokemonName;
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);

  // Error handling
  if (response.status !== 200) {
    throw json({ message: "Error fetching Pokemons" }, { status: 500 });
  }
  return response.data;
};
