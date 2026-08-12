import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Make sure axios is installed
import { logout } from "../../services/authService"; // Ensure this service exists

const LogoutButton = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(
        "Server logout failed, proceeding with local cleanup:",
        error,
      );
    } finally {
      // Clear client-side storage
      localStorage.removeItem("authToken");
      sessionStorage.clear();

      // Reset application authentication state
      setIsAuthenticated(false);

      // Redirect back to login page
      navigate("/register", { replace: true });
    }
  };

  return <button onClick={handleLogout}>Log Out</button>;
};

export default LogoutButton;
