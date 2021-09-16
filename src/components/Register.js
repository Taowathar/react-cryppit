import axios from "axios";
import { useState } from "react";

const Register = () => {
  const [userData, setuserData] = useState({
    Email: "",
    Name: "",
    Password: "",
  });

  const registration = (e) => {
    e.preventDefault();
    axios.post("https://localhost:44348/api/user", userData)
  };

  const onChange = (e) => {
    e.persist();
    setuserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <div className="register-container">
      <h1>Create New User</h1>
      <form className="register-form" onSubmit={registration}>
        <div className="register-name-block">
          <label>Name:</label>
          <input
            type="text"
            name="Name"
            onChange={onChange}
            value={userData.Name}
            placeholder="User Name"
          />
        </div>
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

        <button type="submit">Create User</button>
      </form>
    </div>
  );
};

export default Register;
