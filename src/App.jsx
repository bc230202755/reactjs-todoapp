import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import Home from "./pages/Home";
import Header from "./components/Header";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { Context, server } from "./main";

const App = () => {
  const { setUser, setisAuthenticated } = useContext(Context);
  useEffect(() => {
    axios
      .get(`${server}/users/me`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.user), setisAuthenticated(true);
        // console.log(res.data);
      })
      .catch((error) => {
        setUser({});
        setisAuthenticated(false);
      });
  }, []);

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
        <Toaster />
      </Router>
    </>
  );
};

export default App;
