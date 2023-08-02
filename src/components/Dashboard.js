import { useEffect, useState } from "react";

function Dashboard(props) {
  const [user, setUser] = useState();

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

  const clearStorage = () => {
    localStorage.clear();
    props.updateToken();
  };

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <h2>User: {user}</h2>
      <button onClick={clearStorage}>Logout</button>
    </div>
  );
}

export default Dashboard;
