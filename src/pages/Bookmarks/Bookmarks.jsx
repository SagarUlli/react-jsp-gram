import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBookmarks, unbookmarkPost } from "../../services/bookmarkService";

function Bookmarks() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = async () => {
    try {
      const response = await getBookmarks();

      setPosts(response.data.data || []);
    } catch (error) {
      console.error(error);
      setError("Failed to load bookmarks.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveBookmark = async (postId) => {
    try {
      await unbookmarkPost(postId);

      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error(error);
      setError("Failed to remove bookmark.");
    }
  };

  if (loading) {
    return (
      <div className="container mt-4 text-center">
        <div className="spinner-border" />
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Saved Posts</h3>

        <span className="text-muted">{posts.length} saved</span>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {posts.length === 0 && !error && (
        <div className="text-center mt-5">
          <p className="text-muted">You haven't saved any posts yet.</p>

          <Link to="/home" className="btn btn-primary">
            Explore Posts
          </Link>
        </div>
      )}

      <div className="row">
        {posts.map((post) => (
          <div className="col-md-6 col-lg-4 mb-4" key={post.id}>
            <div className="card h-100">
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  className="card-img-top"
                  alt={post.caption || "Post"}
                />
              )}

              <div className="card-body">
                <Link
                  to={`/users/${post.user.id}`}
                  className="text-decoration-none"
                >
                  @{post.user.username}
                </Link>

                <p className="card-text mt-2">{post.caption}</p>

                <div className="d-flex justify-content-between align-items-center">
                  <small className="text-muted">{post.likeCount} likes</small>

                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleRemoveBookmark(post.id)}
                  >
                    Remove Bookmark
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Bookmarks;
