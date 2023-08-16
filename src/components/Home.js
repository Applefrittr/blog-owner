import { useEffect } from "react";
import { useState } from "react";
import "../styles/Home.css";

function Home() {
  const [totalPosts, setTotalPosts] = useState();
  const [totalPubPosts, setTotalPubPosts] = useState();
  const [mostComments, setMostComments] = useState();
  const [totalComments, setTotalComments] = useState();
  const [latestComment, setLatestComment] = useState();
  const [latestPost, setLatestPost] = useState();

  useEffect(() => {
    const getMetrics = async () => {
      const request = await fetch("http://localhost:3000/posts", {
        method: "GET",
        mode: "cors",
      });

      const response = await request.json();
      const allPosts = response.allPosts;

      //console.log(allPosts);

      setLatestPost(allPosts[0]);
      setTotalPosts(allPosts.length);

      const pubPosts = allPosts.filter((post) => post.published === true);
      setTotalPubPosts(pubPosts.length);

      let commentCount = 0;
      let mostCommented;
      let allComments = [];
      allPosts.forEach((post) => {
        commentCount += post.comments.length;
        allComments = [...post.comments, ...allComments];
        if (mostCommented) {
          if (mostCommented.comments.length < post.comments.length)
            mostCommented = post;
        } else {
          mostCommented = post;
        }
      });

      const sorted = allComments.sort(
        (a, b) => new Date(b.dated) - new Date(a.dated)
      );

      console.log(sorted[0]);
      setLatestComment(sorted[0]);
      setMostComments(mostCommented.title);
      setTotalComments(commentCount);
    };

    getMetrics();
  }, []);

  return (
    <div className="home">
      <h1>Dashboard Home</h1>
      <div className="metrics-container">
        <h2>Site Metrics</h2>
        <hr></hr>
        <ul>
          <li>
            Total Posts: <b>{totalPosts}</b>
          </li>
          <li>
            Total Published Posts: <b>{totalPubPosts}</b>
          </li>
          <li>
            Total Comments: <b>{totalComments}</b>
          </li>
          <li>
            Most Commented Post: <b>{mostComments}</b>
          </li>
        </ul>
      </div>
      {latestPost && (
        <div className="metrics-container">
          <h2>Latest Post</h2>
          <hr></hr>
          <div>
            <b>{latestPost.title}</b>
          </div>
        </div>
      )}
      {latestComment && (
        <div className="metrics-container">
          <h2>Latest Comment</h2>
          <hr></hr>
          <div>
            <p>
              <b>@{latestComment.author}</b>
            </p>
            <p>{latestComment.text}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
