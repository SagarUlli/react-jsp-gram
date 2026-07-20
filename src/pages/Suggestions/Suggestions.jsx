import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSuggestions, followUser } from "../../services/userService";

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
    <div className="container mt-4">
      <h3 className="mb-4">Suggestions</h3>

      {users.map((user) => (
        <div key={user.id} className="card p-3 mb-3">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <Link to={`/users/${user.id}`} className="text-decoration-none">
                <h5>{user.username}</h5>
              </Link>

              <p>{user.bio}</p>
            </div>

            <button
              className="btn btn-primary"
              onClick={() => handleFollow(user.id)}
            >
              Follow
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Suggestions;
