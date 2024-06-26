import axios from "axios";

import { json, useLoaderData } from "react-router";

import styled from "styled-components";

import RadarChart from "../components/RadarChart";

//Styled components

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const PokemonHeader = styled.h1`
  color: #ffb240;
  font-size: 50px;
  font-family: cursive;
  text-transform: capitalize;
`;
const InfoLabel = styled.span`
  color: #ffffff;
  font-size: 20px;
  font-family: "Times New Roman", Times, serif;
  text-transform: capitalize;
`;
const PokemonInfo = styled.p`
  color: #ffb240;
  font-size: 20px;
  font-family: fantasy;
  text-transform: capitalize;
`;
const PokemonAbilities = styled.span`
  color: #ffb240;
  font-size: 20px;
  font-family: fantasy;
  text-transform: capitalize;
`;
const InfoWrapper = styled.div`
  margin-block: 20px;
`;
const PokemonImg = styled.img`
  max-width: 15rem;
`;

const PokemonPage = () => {
  const pokemonData = useLoaderData();

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
  const stats = pokemonData.stats.map((pokemon) => {
    return { name: pokemon.stat.name, stat: pokemon.base_stat };
  });
  const statsName = stats.map((pokemon) => pokemon.name);
  const statsValue = stats.map((pokemon) => pokemon.stat);




  
  //Chart options
  const chartData = {
    series: [
      {
        name: "Series 1",
        data: statsValue,
      },
    ],
    options: {
      chart: {
        type: "radar",
        toolbar: false,
      },
      title: {
        text: "Pokemon Stats",
        style: {
          color: `white`,
          fontSize: "20px",
          fontFamily: '"Times New Roman", Times, serif',
        },
      },

      xaxis: {
        categories: statsName,
        labels: {
          style: {
            colors: ["white", "white", "white", "white", "white", "white"],
            fontWeight: "bold",
          },
        },
      },
      yaxis: {
        show: false,
      },
      //fix width for mobile screens only
      responsive: [
        {
          breakpoint: 524,
          options: {
            chart: {
              width: 300,
            },
          },
        },
      ],
    },
  };

  return (
    <>
      <Wrapper>
        <PokemonHeader>{pokemonData.name}</PokemonHeader>

        {/* Conditional rendring for image src as not all pokemon have dream_world image */}
        <PokemonImg
          src={
            pokemonData.sprites.other.dream_world.front_default
              ? pokemonData.sprites.other.dream_world.front_default
              : pokemonData.sprites.other.home.front_default
          }
          alt="Pokemon"
        />
        <InfoWrapper>
          <InfoLabel>Pokemon Abilities : </InfoLabel>

          {/* Seperating each ability with comma */}
          <PokemonAbilities>{abilities.join(" , ")}</PokemonAbilities>

          <PokemonInfo>
            <InfoLabel> Base Experience : </InfoLabel>
            {pokemonData.base_experience}
          </PokemonInfo>
          <PokemonInfo>
            <InfoLabel> Height : </InfoLabel>

            {pokemonData.height}
          </PokemonInfo>
          <PokemonInfo>
            <InfoLabel>Weight :</InfoLabel> {pokemonData.weight}
          </PokemonInfo>
        </InfoWrapper>
        <RadarChart series={chartData.series} options={chartData.options} />
      </Wrapper>
    </>
  );
};

export default PokemonPage;

// Asynchronous loader function for fetching Pokemon details

export const loader = async ({ params }) => {
  // Extract Pokemon name from route parameters
  const name = params.pokemonName;

  // Build the PokéAPI URL for the specific Pokemon
  const url = `https://pokeapi.co/api/v2/pokemon/${name}`;

  try {
    // Make an HTTP GET request to fetch Pokemon data
    const response = await axios.get(url);

    // Check for successful response (status code 200)
    if (response.status !== 200) {
      // Handle errors if the response status is not 200
      throw json({ message: "Error fetching Pokemon" }, { status: 500 });
    }

    // Extract the Pokemon data from the response
    return response.data;
  } catch (error) {
    // Handle any errors during the request
    console.error("Error fetching Pokemon data:", error);
    throw error; // Re-throw for potential error handling in caller
  }
};
