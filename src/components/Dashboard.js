import { useEffect, useRef, useState } from "react";
import "../styles/Dashboard.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Posts from "./Posts";
import Comments from "./Comments";
import NewPost from "./NewPost";
import Settings from "./Settings";

function Dashboard(props) {
  const [user, setUser] = useState();
  const [msg, setMsg] = useState();
  const msgRef = useRef();

  // GET call to the back end to have web token decoded and the user payload sent back for use
  useEffect(() => {
    const getUser = async () => {
      const token = await fetch("http://localhost:3000/user", {
        mode: "cors",
        method: "GET",
        headers: {
          Authorization: `Bearer ${props.token}`,
          "Content-Type": "application/json",
        },
      });

      const response = await token.json();
      setUser(response.payload.username);
    };
    getUser();
  }, []);

  const dashMsg = (msg) => {
    setMsg(msg);
    msgRef.current.classList.toggle("reveal");
    setTimeout(() => {
      msgRef.current.classList.toggle("reveal");
    }, 3000);
  };

  // This clears the local storage of web tokens, effectively logging out the user
  const clearStorage = () => {
    localStorage.clear();
    props.updateToken();
  };

  return (
    <div className="Dashboard">
      <BrowserRouter>
        <div className="side-nav">
          <div>
            <h1>Dashboard</h1>
            <p>User: {user}</p>
          </div>
          <div className="nav-button-container">
            <Link to="/" className="nav-links">
              Home
            </Link>
            <Link to="/posts" className="nav-links">
              Posts
            </Link>
            <Link to="/comments" className="nav-links">
              Comments
            </Link>
            <Link to="/posts/new" className="nav-links">
              New Post
            </Link>
          </div>
          <div className="nav-button-container">
            <Link to="/settings" className="nav-links">
              Settings
            </Link>
            <button onClick={clearStorage}>Logout</button>
          </div>
        </div>
        <div className="content-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<Posts token={props.token} />} />
            <Route path="/comments" element={<Comments />} />
            <Route
              path="/posts/new"
              element={<NewPost dashMsg={dashMsg} token={props.token} />}
            />
            <Route path="/settings" element={<Settings />} />
          </Routes>
          <div className="dashboard-msg" ref={msgRef}>
            {msg}
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default Dashboard;
