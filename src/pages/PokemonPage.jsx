import axios from "axios";
import { json, useLoaderData } from "react-router";
import styled from "styled-components";





  //Styled components

  const Wrapper = styled.div`
    background-color: #000000e8;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  `;
  const PokemonHeader = styled.h1`
    color: orangered;
    font-size: 60px;
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
      sans-serif;
    text-transform: capitalize;
  `;
  const PokemonInfo = styled.p`
    color: whitesmoke;
    font-size: 20px;
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
      sans-serif;
    text-transform: capitalize;
  `;
  const PokemonAbilities = styled.span`
    color: whitesmoke;
    font-size: 20px;
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
      sans-serif;
    text-transform: capitalize;
  `;
  const InfoWrapper = styled.div``;


const PokemonPage = () => {

  const pokemonData = useLoaderData();
  console.log(pokemonData);



  //functions

    // Extract the abilities and processing the text
  const abilities = pokemonData.abilities.map((pokemon) => {
    //Capitalizing first character in the ability
    const capitalizedName =
      pokemon.ability.name.charAt(0).toUpperCase() +
      pokemon.ability.name.slice(1);
    return capitalizedName;
  });

  //Extracte the stats of each pokemon
  const stats=pokemonData.stats.map(pokemon=>{

    return{name:pokemon.stat.name,stat:pokemon.base_stat}
  })
console.log(stats)

  return (
    <>
      <Wrapper>
        <PokemonHeader>{pokemonData.name}</PokemonHeader>
        <img src={pokemonData.sprites.other.home.front_default} alt="Pokemon" />
        <InfoWrapper>
          <PokemonAbilities>Pokemon Abilities : </PokemonAbilities>

          {/* Seperating each ability with comma */}
          <PokemonAbilities>{abilities.join(" , ")}</PokemonAbilities>

          <PokemonInfo>
            Base Experience : {pokemonData.base_experience}
          </PokemonInfo>
          <PokemonInfo>Height : {pokemonData.height}</PokemonInfo>
          <PokemonInfo>Weight : {pokemonData.weight}</PokemonInfo>
        </InfoWrapper>
      </Wrapper>
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
