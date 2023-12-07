import React, { useEffect, useState } from "react";
import Post from "../Componnent/Post";
import axios from "axios";
function HomePage() {
  const [posts, setAllPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/allposts").then((response) => {
      setAllPosts(response.data);
      console.log(response.data);
    });
  }, []);
  return (
    <>
      {posts.length > 0 &&
        posts.map((post) => <Post key={post._id} {...post} />)}
    </>
  );
}

export default HomePage;
