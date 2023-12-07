import React, { useEffect } from "react";
import { useState } from "react";
import Editor from "../Componnent/Editor";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`http://localhost:4000/post/${id}`).then((response) => {
      setTitle(response.data.title);
      setSummary(response.data.summary);
      setContent(response.data.content);
    });
  }, []);

  const updatePost = (ev) => {
    ev.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    if (files?.[0]) {
      data.set("file", files?.[0]);
    }
    data.set("id", id);
    axios
      .put("http://localhost:4000/post", data, { withCredentials: true })
      .then((response) => {
        if (response.data.error) {
          console.log("error");
        } else {
          console.log(response.data);
          navigate("/");
        }
      });
  };
  return (
    <form onSubmit={updatePost}>
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
      <Editor onChange={setContent} value={content} />
      <button style={{ marginTop: "5px" }}>Update post</button>
    </form>
  );
}

export default EditPost;
