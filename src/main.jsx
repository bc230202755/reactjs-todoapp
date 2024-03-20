import React, { useContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/app.css";
import "./styles/login.css";
import "./styles/register.css";
import "./styles/header.css";
export const server = "https://nodejs-todoapp-wymm.onrender.com/api/v1";
import { createContext } from "react";

export const Context = createContext({ isAuthenticated: false });

const AppWrapper = () => {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  return (
    <>
      <Context.Provider
        value={{
          isAuthenticated,
          setisAuthenticated,
          loading,
          setLoading,
          user,
          setUser,
        }}
      >
        <App />
      </Context.Provider>
    </>
  );
};
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
