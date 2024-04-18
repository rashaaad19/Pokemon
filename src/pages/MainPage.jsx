import styled from "styled-components"
import CategoryCard from "../components/CategoryCard"


const CategoriesHeader=styled.h1`
    color: #ffdda9;
    padding-left: 50px;
    margin-block: 30px 10px;
    font-family: sans-serif;
    font-weight: bold;
`
const MainPage = () => {
  return (
    <>
    <CategoriesHeader>Categories</CategoriesHeader>
    <CategoryCard/>
    </>
  )
}

export default MainPage