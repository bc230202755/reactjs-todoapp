import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context, server } from "../main";
import axios from "axios";
import toast from "react-hot-toast";
const Header = () => {
  const { isAuthenticated, setisAuthenticated, loading, setLoading } =
    useContext(Context);

  const logoutHandler = async () => {
    setLoading(true);
    try {
      await axios.get(
        `${server}/users/logout`,

        {
          withCredentials: true,
        }
      );

      toast.success("LOGOUT");
      setisAuthenticated(false);
      setLoading(false);
    } catch (error) {
      toast.error(error);
      // console.log(error.response.data.message);
      setisAuthenticated(true);
      setLoading(false);
    }
  };

  return (
    <>
      <div id="header">
        <h2>Authentication-System</h2>

        <Link to="/" className="list">
          Home
        </Link>

        <Link to="/profile" className="list">
          Profile
        </Link>

        {/* <Link to="/login" className="list">
          Login
        </Link> */}

        {/* logic of login and logout */}
        {isAuthenticated ? (
          <button disabled={loading} onClick={logoutHandler} id="mybtn">
            Logout
          </button>
        ) : (
          <Link to="/login" className="list">
            Login
          </Link>
        )}
      </div>
    </>
  );
};

export default Header;
