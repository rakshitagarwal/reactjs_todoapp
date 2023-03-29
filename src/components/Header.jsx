import axios from "axios";
import React from "react";
import { useContext } from "react";
import { toast } from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";
import baseUrl from "../config";
import { Context } from "../main";

export const Header = () => {
  const { isAuthenticated, setIsAuthenticated,loading, setLoading } = useContext(Context);

  const logoutHandler = async () => {
    setLoading(true);
    try {
      await axios.get(`${baseUrl}/users/logout`, {
        withCredentials: true,
      });
      toast.success("logged out successfully");
      setIsAuthenticated(false);
      setLoading(false);
    } catch (error) {
      toast.error("error.response.data.message");
      console.log(error);
      setIsAuthenticated(true);
      setLoading(false);
    }
  };

  return (
    <nav className="header">
      <div>
        <h2>Todo App.</h2>
      </div>
      <article>
        <Link to={"/"}>Home</Link>
        <Link to={"/profile"}>Profile</Link>

        {isAuthenticated ? (
          <button disabled={loading} onClick={logoutHandler} className="btn">
            Logout
          </button>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
      </article>
    </nav>
  );
};
