import axios from "axios";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    axios
      .get("http://localhost:4000/profile", {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.error) {
          setUserInfo({ ...userInfo, status: false });
          console.log(response.data.error);
        } else {
          setUserInfo({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
          console.log(response.data);
        }
      });
  }, []);
  const logout = () => {
    axios.post("http://localhost:4000/logout").then((response) => {
      setUserInfo({
        username: "",
        id: 0,
        status: false,
      });
      console.log(response.data);
    });
  };

  return (
    <header>
      <span>Hello ,{userInfo.username}</span>

      <Link to="/" className="logo">
        My Blog
      </Link>
      <nav>
        {userInfo.status && (
          <>
            <Link to="/create" className="log">
              Create new post
            </Link>
            <a onClick={logout}>Logout</a>
          </>
        )}
        {!userInfo.status && (
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
