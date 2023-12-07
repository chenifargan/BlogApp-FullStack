import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Editor from "../Componnent/Editor";
function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const navigate = useNavigate();

  const createNewPost = (ev) => {
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);
    console.log(files);
    ev.preventDefault();
    console.log(data);
    axios
      .post("http://localhost:4000/post", data, { withCredentials: true })
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          console.log(response.data);
          navigate("/");
        }
      });
  };
  return (
    <form onSubmit={createNewPost}>
      <input
        type="title"
        placeholder="Title"
        value={title}
        onChange={(event) => {
          setTitle(event.target.value);
        }}
      ></input>
      <input
        type="summary"
        placeholder="Summary"
        value={summary}
        onChange={(event) => {
          setSummary(event.target.value);
        }}
      ></input>
      <input
        type="file"
        onChange={(event) => {
          setFiles(event.target.files);
        }}
      />
      <Editor value={content} onChange={setContent} />
      <button style={{ marginTop: "5px" }}>Create post</button>
    </form>
  );
}

export default CreatePost;
