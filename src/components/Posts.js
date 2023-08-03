import { useEffect } from "react";

function Posts(props) {
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
      response.allPosts.forEach((post) => {
        //////////// Continue here
      });
    };

    getPosts();
  }, []);

  return (
    <div>
      <h1>Dashboard Posts</h1>
      <div className="posts-card-container"></div>
    </div>
  );
}

export default Posts;
