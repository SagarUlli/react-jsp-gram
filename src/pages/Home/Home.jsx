import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../services/userService";
import { logout } from "../../services/authService";

function Home() {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    try {
      const result = await getCurrentUser();

      if (!result.success) {
        navigate("/");
        return;
      }

      setUser(result.data);
    } catch (error) {
      console.error(error);
      navigate("/");
    }
  }

  async function handleLogout() {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    } finally {
      navigate("/");
    }
  }

  if (!user) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <h2>Welcome {user.firstname}</h2>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}

export default Home;
