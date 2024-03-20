import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context, server } from "../main";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // show or hide password-logic
  const [mypassword, setMyPassword] = useState(false);

  const { isAuthenticated, setisAuthenticated } = useContext(Context);
  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(name, email, password);
    try {
      const { data } = await axios.post(
        `${server}/users/new`,
        {
          name,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success(data.message);
      setisAuthenticated(true);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
      setisAuthenticated(true);
    }
  };

  if (isAuthenticated) return <Navigate to={"/"} />;

  const myFunc = () => {
    setMyPassword(!mypassword);
  };
  return (
    <>
      <div id="box">
        <form onSubmit={submitHandler}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
            required
          />
          <br />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            required
          />
          <br />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={mypassword ? "text" : "password"}
            placeholder="Password"
            required
          />
          <br />
          <button className="psw_show" type="button" onClick={myFunc}>
            {mypassword ? "Hide" : "Show"}
          </button>
          <br />
          <button type="submit" id="sign-up">
            Sign Up
          </button>
          <br />
          <h2 className="or">Or</h2>
          <Link to="/login" id="btn-2">
            Log In
          </Link>
        </form>
      </div>
    </>
  );
};

export default Register;
