import styled from "styled-components";
import { Link } from "react-router-dom";
import logo from "../img/cryplogo.jpg";

function Navbar({ user, loggedIn }) {
  return (
    <div className="navBar">
      <NavBar>
        <NavDiv className="Home" style={{ paddingTop: ".5rem" }}>
          <NavLink to="/">
            <Image
              style={{
                width: "150px",
                height: "auto",
                transform: "translateY(-5%)",
              }}
              src={logo}
            ></Image>
          </NavLink>
        </NavDiv>
        <NavDiv className="CryptoList">
          <NavLink to="/cryptolist">Crypto List</NavLink>
        </NavDiv>
        <NavDiv className="Trade">
          <NavLink to="/favorites">Favorites</NavLink>
        </NavDiv>
        <NavDiv className="Portfolio">
          <NavLink to="/portfolio">Portfolio</NavLink>
        </NavDiv>
        <NavDiv className="History">
          <NavLink to="/history">Trade history</NavLink>
        </NavDiv>
        <NavDiv className="Login">
          <NavLink to="/register">Register</NavLink>
          {loggedIn ? (
            <NavLink to="/logout">Logout</NavLink>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}
        </NavDiv>
        <NavDiv className="Balance">
          {loggedIn ? (
            <h1 className="nb-user-name">User Name: {user.name}</h1>
          ) : null}
          {loggedIn ? (
            <h1>
              Balance: $
              {user.balance.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </h1>
          ) : null}
        </NavDiv>
      </NavBar>
    </div>
  );
}

const NavDiv = styled.div`
  float: left;
  padding-top: 1rem;
`;

const NavLink = styled(Link)`
  font-size: 1.6em;
  padding: 0.8rem;
  margin-left: 1rem;
  text-decoration: none;
  transform: translateY(-50%);
  color: #5065a7;
`;

const NavBar = styled.nav`
  width: 100%;
  height: 6.5vh;
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
  margin-left: -1rem;
`;

export default Navbar;
