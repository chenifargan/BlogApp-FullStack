import React from "react";

function LogInPage() {
  return (
    <form className="login">
      <h1>Login</h1>
      <input type="text" placeholder="(User name..)" />
      <input type="password" placeholder="(Password..)" />
      <button>Login</button>
    </form>
  );
}

export default LogInPage;
