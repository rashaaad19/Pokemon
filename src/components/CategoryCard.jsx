import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import styled from "styled-components";

//styled components
const CardList = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;
const ListItem = styled.li`
  list-style: none;
`;
const Card = styled.a`
  background-color: plum;
  color: black;
  font-size: 24px;
  font-weight: bold;
  margin: 10px;
  padding: 20px;
  border-radius: 5px;
  text-transform: capitalize;
  text-decoration: none;
`;

const retrieveCategories = async () => {
  const response = await axios.get("https://pokeapi.co/api/v2/type");
  return response.data;
};

const CategoryCard = () => {
  const {
    data: categories,
    error,
    isLoading,
  } = useQuery({
    queryKey: "categoriesData",
    queryFn: retrieveCategories,
  });
  if (isLoading) return <div>Fetching Categories...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  const results = categories.results;

  return (
    <>
      <CardList>
        {results.map((category) =>  (
          <Card key={category.name} href="https://www.w3schools.com">
            <ListItem>{category.name}</ListItem>
            
          </Card>
        ))}
      </CardList>
    </>
  );
};

export default CategoryCard;
