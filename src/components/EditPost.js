import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

function EditPost(props) {
  const [post, setPost] = useState();
  const { id } = useParams();
  const formRef = useRef();

  // GET request to retrieve a signle post by the ID in the URL
  useEffect(() => {
    const getPost = async () => {
      const request = await fetch(`http://localhost:3000/posts/${id}`, {
        mode: "cors",
        method: "GET",
        headers: {
          Authorization: `Bearer ${props.token}`,
          "Content-Type": "application/json",
        },
      });

      const response = await request.json();
      console.log(response);
      setPost(response.post);
    };

    getPost();
  }, []);

  const handleChange = (e) => {
    const updatedPost = { ...post };
    if (e.target.name === "title") updatedPost.title = e.target.value;
    else updatedPost.text = e.target.value;
    setPost(updatedPost);
  };

  const test = () => {
    console.log(post);
  };

  const submitEdit = async (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);
    const dataObj = Object.fromEntries(formData.entries());
    console.log(formData, JSON.stringify(formData), dataObj);

    const submit = await fetch(`http://localhost:3000/posts/${id}`, {
      mode: "cors",
      method: "Post",
      body: JSON.stringify(dataObj),
      headers: {
        Authorization: `Bearer ${props.token}`,
        "Content-Type": "application/json",
      },
    });

    console.log(submit);
    const response = await submit.json();
    console.log(response.message);
    props.dashMsg(response.message);
  };

  return (
    <div>
      <h1>Edit Post: {id}</h1>
      <form ref={formRef}>
        <label htmlFor="title">Title</label>
        {post && (
          <input
            type="text"
            name="title"
            value={post.title}
            onChange={handleChange}
          />
        )}
        <label htmlFor="text">Post Body</label>
        {post && (
          <textarea
            name="text"
            rows="10"
            value={post.text}
            onChange={handleChange}
          />
        )}
        <button type="submit" className="new-post-submit" onClick={submitEdit}>
          Submit Changes
        </button>
      </form>
      <button onClick={test}>Test</button>
    </div>
  );
}

export default EditPost;
