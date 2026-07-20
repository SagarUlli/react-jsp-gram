import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFollowers } from "../services/userService";

function Followers() {
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    loadFollowers();
  }, []);

  const loadFollowers = async () => {
    try {
      const response = await getFollowers();

      setFollowers(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Followers</h3>

      {followers.map((user) => (
        <div key={user.id} className="card p-3 mb-3">
          <Link to={`/users/${user.id}`} className="text-decoration-none">
            <h5>{user.username}</h5>
          </Link>

          <p>{user.bio}</p>
        </div>
      ))}
    </div>
  );
}

export default Followers;
