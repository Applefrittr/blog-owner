import { useEffect, useState } from "react";
import "../styles/Posts.css";
import { Link, redirect } from "react-router-dom";

function Posts(props) {
  const [posts, setPosts] = useState();

  const truncateText = (text) => {
    if (text.length > 75) return text.substring(0, 75) + " ...";
    else return text;
  };

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
        else isPublished = { backgroundColor: "white" };

        const siteLink = `http://localhost:3001/${post._id}`;
        const commentsLink = `http://localhost:3002/posts/${post._id}/comments`;

        postsElement.push(
          <div key={post._id} className="post-card" style={isPublished}>
            <h2>{post.title}</h2>
            <hr />
            <p>{truncateText(post.text)}</p>
            <p>{post.dated_formatted}</p>
            <div className="edit-link-container">
              <Link to={postLink} className="nav-links">
                Edit
              </Link>
              {post.published && (
                <div>
                  <a
                    href={siteLink}
                    className="nav-links"
                    rel="noreferrer"
                    target="_blank"
                  >
                    View
                  </a>
                  <Link to={commentsLink} className="nav-links">
                    Comments
                  </Link>
                </div>
              )}
            </div>
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
        <h1>All Blog Posts</h1>
        <div>
          <span className="post-color">
            <div
              style={{
                width: "15px",
                height: "15px",
                backgroundColor: "palegreen",
                border: "1px solid black",
              }}
            ></div>
            Published
          </span>
          <span className="post-color">
            <div
              style={{
                width: "15px",
                height: "15px",
                backgroundColor: "white",
                border: "1px solid black",
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
