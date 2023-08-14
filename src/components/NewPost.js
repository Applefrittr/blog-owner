import "../styles/NewPost.css";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function NewPost(props) {
  const formRef = useRef();
  const navigate = useNavigate();
  const path = "/";

  const submitPost = async (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);
    const dataObj = Object.fromEntries(formData.entries());
    console.log(formData, JSON.stringify(formData), dataObj);

    const submit = await fetch("http://localhost:3000/posts", {
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
    navigate(path);
  };

  return (
    <div>
      <h1>Create a New Blog Post</h1>
      <form ref={formRef}>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" required />
        <label htmlFor="text">Post Body</label>
        <textarea name="text" rows="20" requried />
        <button type="submit" className="new-post-submit" onClick={submitPost}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default NewPost;
