import Navbar from "./Navbar";

function Header({user, loggedIn}) {
  return (
    <>
      <Navbar user={user} loggedIn={loggedIn}></Navbar>
    </>
  );
}

export default Header;
