import React, { useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosWithAuth()
      .post("api/login", form)
      .then((res) => {
        localStorage.setItem("token", res.data.payload);
        props.history.push("/bubble-page");
      })
      .catch((error) => console.log(error, "invalid username or password"));
  };

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;
