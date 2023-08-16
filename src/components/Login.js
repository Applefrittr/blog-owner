import { useRef } from "react";
import "../styles/Login.css";

function Login(props) {
  const signinRef = useRef();
  const signupRef = useRef();

  const toggleForms = () => {
    signinRef.current.classList.toggle("hide-form");
    signupRef.current.classList.toggle("hide-form");
  };

  // Sign up function, sends form data input by user to the API for user creation
  const signUp = async (e) => {
    e.preventDefault();

    // FormData API to pull info from the form then convert to standard JS object
    const formData = new FormData(signupRef.current);
    const dataObj = Object.fromEntries(formData.entries());
    console.log(
      formData,
      JSON.stringify(formData),
      Object.fromEntries(formData.entries())
    );

    const submit = await fetch("http://localhost:3000/user/create", {
      mode: "cors",
      method: "Post",
      body: JSON.stringify(dataObj),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(submit);
    const response = await submit.json();
    console.log(response.message);
    toggleForms();
  };

  // Login function sends user credentials tothe API for authentication
  const signIn = async (e) => {
    e.preventDefault();

    // FormData API to pull info from the form then convert to standard JS object
    const formData = new FormData(signinRef.current);
    const dataObj = Object.fromEntries(formData.entries());

    const submit = await fetch("http://localhost:3000/user", {
      mode: "cors",
      method: "Post",
      body: JSON.stringify(dataObj),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await submit.json();
    console.log(response.message, response.accessToken);
    if (response.accessToken) {
      localStorage.setItem("webToken", response.accessToken); // Store token in localStorage
      props.updateToken(localStorage["webToken"]); // Call updateToken to update token state in App.js
    }
  };

  return (
    <div className="Login">
      <div className="login-container">
        <form className="signin-form" action="" method="POST" ref={signinRef}>
          <h1>Sign In</h1>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" />
          <div className="login-buttons">
            <button type="submit" onClick={signIn}>
              Sign in
            </button>
            <p>-OR-</p>
            <button type="button" onClick={toggleForms}>
              Sign Up
            </button>
          </div>
        </form>
        <form className="signup-form hide-form" ref={signupRef}>
          <h1>Sign Up</h1>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" required />
          <label htmlFor="password">Password</label>
          <input type="text" name="password" required />
          <label htmlFor="confirm-password">Confirm Password</label>
          <input type="text" name="confirm-password" required />
          <div className="login-buttons">
            <button type="submit" onClick={signUp}>
              Sign Up
            </button>
            <p>-OR-</p>
            <button type="button" onClick={toggleForms}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
