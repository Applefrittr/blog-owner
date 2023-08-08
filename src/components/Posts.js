import { useEffect, useState } from "react";
import "../styles/Posts.css";
import { Link, redirect } from "react-router-dom";

function Posts(props) {
  const [posts, setPosts] = useState();

  useEffect(() => {
    const getPosts = async () => {
      const token = await fetch("http://localhost:3000/posts", {
        mode: "cors",
        method: "GET",
        headers: {
          Authorization: `Bearer ${props.token}`,
          "Content-Type": "application/json",
        },
      });

      const response = await token.json();
      console.log(response);
      const postsElement = [];
      response.allPosts.forEach((post) => {
        console.log(post.dated_formatted);
        let postLink = `/posts/${post._id}`;
        let isPublished;
        if (post.published) isPublished = { backgroundColor: "palegreen" };
        else isPublished = { backgroundColor: "lightcoral" };

        postsElement.push(
          <div key={post._id} className="post-card" style={isPublished}>
            <h2>{post.title}</h2>
            <hr />
            <p>{post.text}</p>
            <p>{post.dated_formatted}</p>
            <Link to={postLink} className="nav-links">
              Edit
            </Link>
          </div>
        );
      });
      setPosts(postsElement);
    };

    getPosts();
  }, []);

  return (
    <div>
      <div className="posts-header">
        <h1>Dashboard Posts</h1>
        <div>
          <span className="post-color">
            <div
              style={{
                width: "15px",
                height: "15px",
                backgroundColor: "palegreen",
              }}
            ></div>
            Published
          </span>
          <span className="post-color">
            <div
              style={{
                width: "15px",
                height: "15px",
                backgroundColor: "lightcoral",
              }}
            ></div>
            Not Published
          </span>
        </div>
      </div>
      <div className="posts-card-container">{posts}</div>
    </div>
  );
}

export default Posts;
