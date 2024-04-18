import { NavLink } from "react-router-dom";
import styled from "styled-components";
const NavItem=styled(NavLink)`
    font-size: 20px;
    text-decoration: none;
    color: #fff6ed;
`
const NavHeader=styled.header`
  padding-bottom:10px;
`
const Navbar = () => {
  return (
    <NavHeader>
      <nav>
        <ul>
          <NavItem to="">Home</NavItem>
        </ul>
      </nav>
    </NavHeader>
  );
};

export default Navbar;
