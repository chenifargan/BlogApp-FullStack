import React, { useContext } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
function LogInPage() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUserInfo } = useContext(UserContext);
  const login = (event) => {
    const data = { username: username, password: password };
    event.preventDefault();

    axios
      .post("http://localhost:4000/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setUserInfo({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
          console.log(response.data);

          navigate("/");
        }
      });
  };
  return (
    <form className="login" onSubmit={login}>
      <h1>Login</h1>
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
      <button>Login</button>
    </form>
  );
}

export default LogInPage;
