import { NavLink } from "react-router-dom";
import styled from "styled-components";
const NavItem=styled(NavLink)`
    font-size: 25px;
    text-decoration: none;
    color: peachpuff;
    margin-bottom: 20px;
`
const Navbar = () => {
  return (
    <header>
      <nav>
        <ul>
          <NavItem to="">Main Page</NavItem>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
