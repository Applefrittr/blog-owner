import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/EditPost.css";

function EditPost(props) {
  const [post, setPost] = useState();
  const { id } = useParams();
  const formRef = useRef();
  const modalRef = useRef();
  const navigate = useNavigate();

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
    else if (e.target.name === "text") updatedPost.text = e.target.value;
    else {
      console.log(e.target.value, e.target.checked);
      updatedPost.published = e.target.checked;
    }
    setPost(updatedPost);
  };

  const submitEdit = async (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);
    const dataObj = Object.fromEntries(formData.entries());
    console.log(formData, JSON.stringify(formData), dataObj);

    const request = await fetch(`http://localhost:3000/posts/${id}`, {
      mode: "cors",
      method: "Post",
      body: JSON.stringify(dataObj),
      headers: {
        Authorization: `Bearer ${props.token}`,
        "Content-Type": "application/json",
      },
    });

    const response = await request.json();
    console.log(response.message);
    props.dashMsg(response.message);
    navigate("/posts");
  };

  const displayModal = () => {
    modalRef.current.classList.toggle("display-modal");
  };

  const deletePost = async () => {
    const request = await fetch(`http://localhost:3000/posts/${id}`, {
      mode: "cors",
      method: "Delete",
      headers: {
        Authorization: `Bearer ${props.token}`,
        "Content-Type": "application/json",
      },
    });
    const response = await request.json();
    props.dashMsg(response.message);
    navigate("/posts");
  };

  const back = () => {
    navigate("/posts");
  };

  return (
    <div>
      {post && <h1>Edit Post: {post.title}</h1>}
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
        <div className="checkbox-container">
          {post && (
            <input
              type="checkbox"
              name="published"
              checked={post.published ? "checked" : ""}
              onChange={handleChange}
            />
          )}
          <label htmlFor="published">Publish</label>
        </div>

        <div className="form-button-container">
          <button
            type="submit"
            className="new-post-submit"
            onClick={submitEdit}
          >
            Submit Changes
          </button>
          <button type="button" className="delete-post" onClick={displayModal}>
            Delete
          </button>
          <button type="button" onClick={back}>
            Cancel
          </button>
        </div>
      </form>
      <div className="delete-modal" ref={modalRef}>
        Are you sure you want to delete this post?
        <div className="modal-buttons-container">
          <button onClick={deletePost}>Confirm</button>
          <button onClick={displayModal}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default EditPost;
