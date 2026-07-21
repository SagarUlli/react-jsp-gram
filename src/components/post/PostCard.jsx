import { Link } from "react-router-dom";
import "./PostCard.css";

function PostCard({ post, refreshFeed }) {
  return (
    <div
      className="card border-0 shadow rounded-4 overflow-hidden h-100"
      style={{
        transition: "0.3s",
        cursor: "pointer",
      }}
    >
      {/* Post Image */}

      <img
        src={post.imageUrl}
        alt="Post"
        className="card-img-top"
        style={{
          height: "320px",
          objectFit: "cover",
        }}
      />

      {/* Card Body */}

      <div className="card-body">
        {/* User */}

        <div className="d-flex align-items-center mb-3">
          <img
            src={post.user.imageUrl || "https://placehold.co/45x45?text=U"}
            alt="User"
            className="rounded-circle me-3"
            width="45"
            height="45"
            style={{
              objectFit: "cover",
            }}
          />

          <div>
            <h6 className="mb-0 fw-bold">{post.user.username}</h6>

            <small className="text-muted">
              {new Date(post.postedTime).toLocaleString()}
            </small>
          </div>
        </div>

        {/* Caption */}

        <p className="card-text">{post.caption}</p>

        {/* Like & Comment */}

        <div className="d-flex justify-content-between mt-4">
          <div>
            <button className="btn btn-sm btn-outline-danger me-2">
              ❤️ {post.likesCount}
            </button>

            <button className="btn btn-sm btn-outline-primary">
              💬 {post.commentsCount}
            </button>
          </div>

          {post.ownPost && (
            <div>
              <Link
                to={`/edit-post/${post.id}`}
                className="btn btn-sm btn-outline-warning me-2"
              >
                Edit
              </Link>

              <button className="btn btn-sm btn-outline-danger">Delete</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostCard;
