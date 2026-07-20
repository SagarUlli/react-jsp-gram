import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="container text-center mt-5">
      <h1>404</h1>
      <h4>Page Not Found</h4>

      <Link to="/home" className="btn btn-primary mt-3">
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;
