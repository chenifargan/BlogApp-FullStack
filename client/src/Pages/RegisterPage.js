import React, { useState } from "react";
import axios from "axios";
function RegisterPage() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const register = (event) => {
    const data = { username: username, password: password };
    event.preventDefault();
    console.log(event.preventDefault());
    console.log(username);
    console.log(password);
    axios.post("http://localhost:4000/register", data).then((response) => {
      console.log(response.data);
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