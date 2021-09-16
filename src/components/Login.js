import { useState } from "react";
import { Redirect } from "react-router";
import { useAxiosGet } from "../hooks/axiosGet";
import { useAlert } from "react-alert";

const Login = ({ setUser, setLoggedIn, loggedIn }) => {
  const [userData, setuserData] = useState({
    Email: "",
    Password: "",
  });
  const alert = useAlert();
  let [, fetchedUsers] = useAxiosGet("https://localhost:44348/api/user", []);


  const login = (e) => {
    e.preventDefault();

  };

  const onChange = (e) => {
    e.persist();
    setuserData({ ...userData, [e.target.name]: e.target.value });
  };

  if (loggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div className="register-container">
      <h1>Create New User</h1>
      <form className="register-form" onSubmit={login}>
        <div className="register-email-block">
          <label>Email:</label>
          <input
            type="email"
            name="Email"
            onChange={onChange}
            value={userData.Email}
            placeholder="Email"
          />
        </div>
        <div className="register-password-block">
          <label>Password:</label>
          <input
            type="Password"
            name="Password"
            onChange={onChange}
            value={userData.Password}
            placeholder="Password"
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
