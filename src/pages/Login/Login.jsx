import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await login(username, password);
      const result = response.data;

      if (result.success) {
        sessionStorage.setItem("user", JSON.stringify(result.data));
        toast.success(result.message);
        navigate("/home");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error(error);

      toast.success("Unable to connect to server.");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br />
        <br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
