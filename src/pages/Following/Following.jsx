import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFollowing, unfollowUser } from "../services/userService";

function Following() {
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    loadFollowing();
  }, []);

  const loadFollowing = async () => {
    try {
      const response = await getFollowing();

      setFollowing(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnfollow = async (id) => {
    try {
      await unfollowUser(id);

      setFollowing(following.filter((user) => user.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Following</h3>

      {following.map((user) => (
        <div
          key={user.id}
          className="card p-3 mb-3 d-flex flex-row justify-content-between align-items-center"
        >
          <div>
            <Link to={`/users/${user.id}`} className="text-decoration-none">
              <h5>{user.username}</h5>
            </Link>

            <p>{user.bio}</p>
          </div>

          <button
            className="btn btn-outline-danger"
            onClick={() => handleUnfollow(user.id)}
          >
            Unfollow
          </button>
        </div>
      ))}
    </div>
  );
}

export default Following;
