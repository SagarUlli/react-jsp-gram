import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { searchUsers } from "../services/userService";

function SearchUsers() {
  const [searchParams] = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("username") || "");

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const username = searchParams.get("username") || "";

    setQuery(username);

    if (!username.trim()) {
      setUsers([]);
      return;
    }

    loadUsers(username);
  }, [searchParams]);

  const loadUsers = async (username) => {
    try {
      setLoading(true);

      const response = await searchUsers(username);

      setUsers(response.data.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Search Users</h3>

      <input
        type="search"
        className="form-control mb-4"
        placeholder="Search username..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {loading && (
        <div className="text-center">
          <div className="spinner-border" />
        </div>
      )}

      {!loading && query && users.length === 0 && <p>No users found.</p>}

      {users.map((user) => (
        <div key={user.id} className="card p-3 mb-3">
          <Link to={`/users/${user.id}`} className="text-decoration-none">
            <h5>{user.username}</h5>
          </Link>

          <p className="mb-0">
            {user.firstname} {user.lastname}
          </p>

          {user.bio && <small>{user.bio}</small>}
        </div>
      ))}
    </div>
  );
}

export default SearchUsers;
