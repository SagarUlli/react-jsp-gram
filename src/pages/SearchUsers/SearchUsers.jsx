import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { searchUsers } from "../../services/userService";

function SearchUsers() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("username") || "");

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const username = searchParams.get("username");

    if (!username || !username.trim()) {
      setUsers([]);
      return;
    }

    setQuery(username);
    loadUsers(username);
  }, [searchParams]);

  const loadUsers = async (username) => {
    try {
      setLoading(true);

      const response = await searchUsers(username);

      setUsers(response.data.data || []);
    } catch (error) {
      console.error("Search failed:", error);

      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();

    const value = query.trim();

    if (!value) {
      setSearchParams({});
      setUsers([]);
      return;
    }

    setSearchParams({
      username: value,
    });
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Search Users</h3>

      <form onSubmit={handleSearch}>
        <div className="input-group mb-4">
          <input
            type="search"
            className="form-control"
            placeholder="Search username..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />

          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </div>
      </form>

      {loading && (
        <div className="text-center mt-4">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {!loading && query && users.length === 0 && (
        <p className="text-muted">No users found.</p>
      )}

      {!loading && users.length > 0 && (
        <div>
          {users.map((user) => (
            <div key={user.id} className="card p-3 mb-3">
              <Link to={`/users/${user.id}`} className="text-decoration-none">
                <h5 className="mb-1">
                  {user.firstname} {user.lastname}
                </h5>
              </Link>

              <small className="text-muted">@{user.username}</small>

              {user.bio && <p className="mb-0 mt-1 text-muted">{user.bio}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchUsers;
