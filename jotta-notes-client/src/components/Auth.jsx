import { useState } from "react";

export const Auth = () => {
  const [isLoggedIn, setIsLoggedin] = useState(true);
  const [error, setError] = useState(null);

  function viewLogin(status) {
    setError(null);
    setIsLoggedin(status);
  }
  return (
    <div className="auth-container">
      <div className="auth-container-box">
        <form>
          <h2>{isLoggedIn ? "Please log in" : "Please sign up"}</h2>
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          {!isLoggedIn && (
            <input type="password" placeholder="confirm password" />
          )}
          <input type="submit" className="create" />
          {error && <p>{error}</p>}
        </form>
        <div className="auth-options">
          <button
            onClick={() => viewLogin(false)}
            style={{ backgroundColor: !isLoggedIn ? "white" : "salmon" }}
          >
            Sign Up
          </button>
          <button
            onClick={() => viewLogin(true)}
            style={{ backgroundColor: !isLoggedIn ? "white" : "salmon" }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};
