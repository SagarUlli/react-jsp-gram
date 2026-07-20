import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/home">
          JSPGram
        </Link>

        <div className="navbar-nav ms-auto">
          <Link className="nav-link" to="/home">
            Home
          </Link>

          <Link className="nav-link" to="/create-post">
            Create Post
          </Link>

          <Link className="nav-link" to="/profile">
            Profile
          </Link>

          <Link to="/suggestions" className="nav-link">
            Suggestions
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
