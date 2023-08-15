import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comment from "./Comment";
import "../styles/Comments.css";

function Comments(props) {
  const { id } = useParams();
  const [comments, setComments] = useState();
  const [title, setTitle] = useState();

  useEffect(() => {
    const getComments = async () => {
      const request = await fetch(
        `http://localhost:3000/posts/${id}/comments`,
        { mode: "cors", method: "GET" }
      );

      const response = await request.json();

      let commentsArray = [];
      response.comments.forEach((comment) => {
        commentsArray.unshift(
          <Comment
            comment={comment}
            dashMsg={props.dashMsg}
            token={props.token}
          />
        );
      });

      setComments(commentsArray);
    };

    const getPost = async () => {
      const request = await fetch(`http://localhost:3000/posts/${id}`, {
        mode: "cors",
        method: "GET",
      });

      const response = await request.json();
      setTitle(response.post.title);
    };

    getPost();
    getComments();
  }, []);

  return (
    <div className="comments-container">
      <h1>Comments for: {title}</h1>
      {comments && (
        <div className="comments-list">
          {comments.length > 0 ? (
            comments
          ) : (
            <p>
              <i>No Comments</i>
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default Comments;
