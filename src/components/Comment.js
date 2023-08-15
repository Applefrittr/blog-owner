import { useState } from "react";
import { useParams } from "react-router-dom";

function Comment(props) {
  const [deleted, setDeleted] = useState(false);
  const { id } = useParams();

  const deletePost = async () => {
    const request = await fetch(
      `http://localhost:3000/posts/${id}/comments/${props.comment._id}`,
      {
        mode: "cors",
        method: "Delete",
        headers: {
          Authorization: `Bearer ${props.token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const response = await request.json();
    props.dashMsg(response.message);
    setDeleted(true);
  };

  if (!deleted) {
    return (
      <div className="comment">
        <div className="comment-text">
          <p>
            <b>@{props.comment.author}</b>
          </p>
          <p>{props.comment.text}</p>
          <p>
            <i>{props.comment.dated_formatted}</i>
          </p>
        </div>
        <button className="nav-links delete-post" onClick={deletePost}>
          Delete
        </button>
      </div>
    );
  } else return;
}

export default Comment;
