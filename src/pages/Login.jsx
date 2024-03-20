import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context, server } from "../main";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // New state for toggling password visibility
  const { isAuthenticated, setisAuthenticated, loading, setLoading } =
    useContext(Context);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${server}/users/login`,
        {
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
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setisAuthenticated(false);
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (isAuthenticated) return <Navigate to={"/"} />;

  return (
    <>
      <div id="box-login">
        <form onSubmit={submitHandler}>
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
            type={showPassword ? "text" : "password"} // Ternary operator to toggle input type
            placeholder="Password"
            required
          />
          <br />
          {/* Button to toggle password visibility */}
          <button
            className="psw_show"
            type="button"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
          <br />
          <button id="btn" disabled={loading} type="submit">
            Login
          </button>
          <h2 className="or">Or</h2>
          <Link to="/register" id="register-link">
            Register
          </Link>
        </form>
      </div>
    </>
  );
};

export default Login;
