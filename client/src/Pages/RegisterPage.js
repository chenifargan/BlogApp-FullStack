import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

function RegisterPage() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { setUserInfo } = useContext(UserContext);

  const navigate = useNavigate();

  const register = (event) => {
    const data = { username: username, password: password };
    event.preventDefault();

    axios.post("http://localhost:4000/register", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        console.log(response.data);
        setUserInfo({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
        navigate("/");
      }
    });
  };
  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="(User name..)"
        value={username}
        onChange={(event) => {
          setUserName(event.target.value);
        }}
      />
      <input
        type="password"
        placeholder="(Password..)"
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <button>Register</button>
    </form>
  );
}

export default RegisterPage;
