import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  useEffect(() => {
    axios
      .get("http://localhost:4000/profile", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          setUserInfo(response.data.username);
        }

        // setusername(response.data.username);
      });
  }, []);
  const logout = () => {
    axios.post("http://localhost:4000/logout").then((response) => {
      //setusername(null);
      setUserInfo(null);

      console.log(response.data);
    });
  };
  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">
        My Blog
      </Link>
      <nav>
        {username && (
          <>
            <Link to="/create" className="log">
              Create new post
            </Link>
            <a onClick={logout}>Logout</a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login" className="log">
              Login
            </Link>
            <Link to="/register" className="log">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
