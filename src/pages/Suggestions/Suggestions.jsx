import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSuggestions, followUser } from "../../services/userService";
import Loader from "../../components/common/Loader";
import "../../styles/Suggestions.css";

function Suggestions() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSuggestions();
  }, []);

  const loadSuggestions = async () => {
    try {
      const response = await getSuggestions();

      setUsers(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async (id) => {
    try {
      await followUser(id);

      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (users.length === 0) {
    return (
      <div className="container mt-4">
        <h4>No Suggestions Available</h4>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold">Suggested Users</h2>

        <p className="text-muted">Discover people you may know</p>
      </div>

      <div className="row">
        {users.map((user) => (
          <div key={user.id} className="col-lg-4 col-md-6 mb-4">
            <div className="card suggestion-card border-0 shadow h-100">
              <div className="card-body text-center">
                <Link
                  to={`/users/${user.id}`}
                  className="text-decoration-none text-dark"
                >
                  <img
                    src={
                      user.imageUrl || "https://placehold.co/100x100?text=User"
                    }
                    alt={user.username}
                    className="suggestion-avatar mb-3"
                  />

                  <h5 className="user-name">{user.username}</h5>
                </Link>

                <p className="text-muted mb-1">
                  {user.firstname} {user.lastname}
                </p>

                <p className="text-secondary user-bio">
                  {user.bio || "No bio added yet."}
                </p>

                <div className="row text-center mb-3">
                  <div className="col">
                    <h6 className="mb-0">{user.followersCount}</h6>

                    <small className="text-muted">Followers</small>
                  </div>

                  <div className="col">
                    <h6 className="mb-0">{user.followingCount}</h6>

                    <small className="text-muted">Following</small>
                  </div>
                </div>

                <button
                  className="btn btn-primary follow-btn w-100"
                  onClick={() => handleFollow(user.id)}
                >
                  Follow
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Suggestions;
