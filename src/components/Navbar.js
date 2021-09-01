import styled from "styled-components";
import { Link } from "react-router-dom";
import logo from "../img/cryplogo.jpg";

function Navbar() {
  return (
    <div className="navBar">
      <NavBar>
        <NavDiv className="Home">
          <NavLink to="/">
            <Image src={logo}></Image>
          </NavLink>
        </NavDiv>
        <NavDiv className="CryptoList">
          <NavLink to="/cryptolist">Crypto List</NavLink>
        </NavDiv>
        <NavDiv className="Trade">
          <NavLink to="/trade">Trade</NavLink>
        </NavDiv>
        <NavDiv className="Trade">
          <NavLink to="/favorites">Favorites</NavLink>
        </NavDiv>
      </NavBar>
    </div>
  );
}

const NavDiv = styled.div`
  float: left;
  margin-top: 0.5rem;
`;

const NavLink = styled(Link)`
  font-size: 1.8em;
  padding: 1rem;
  margin-left: 1rem;
  text-decoration: none;
`;

const NavBar = styled.nav`
  width: 100%;
  min-height: 6vh;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: left;
  background-color: #f2eee3;
  transition: all 0.7s ease-in;
  align-content: center;
  justify-content: flex-start;
  flex-direction: row;
`;

const Image = styled.img`
  height: 40px;
  width: 100px;
  margin-top: 0.5rem;
  margin-left: -1rem;
`;

export default Navbar;
