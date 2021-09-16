import { Redirect } from "react-router";

const Logout = ({ setUser, setLoggedIn }) => {
  setUser(null);
  setLoggedIn(false);
  return <Redirect to="/" />;
};

export default Logout;
