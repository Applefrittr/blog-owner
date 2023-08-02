import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { useState } from "react";

// Login in portal component.  Uses state to determine if there is a jwt in localStorage.  Effectively checks if a user is logged in or not and will render either
// the login page or the dashboard
function App() {
  const [token, setToken] = useState(localStorage["webToken"]);

  const updateToken = (state) => {
    setToken(state);
  };

  console.log(localStorage["webToken"]);
  return (
    <div>
      {token ? (
        <Dashboard updateToken={updateToken} token={token} />
      ) : (
        <Login updateToken={updateToken} />
      )}
    </div>
  );
}

export default App;
