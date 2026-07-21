import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/common/Loader";
import PostCard from "../../components/post/PostCard";
import { getProfile } from "../../services/userService";
function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await getProfile();

      setUser(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container py-5">
      <div className="card shadow-lg border-0 rounded-4">
        <div className="card-body p-5">
          <div className="text-center">
            <img
              src={user.imageUrl || "https://placehold.co/180x180?text=User"}
              alt="Profile"
              className="rounded-circle border border-3 shadow"
              style={{
                width: "170px",
                height: "170px",
                objectFit: "cover",
              }}
            />

            <div className="d-flex justify-content-center align-items-center mt-3">
              <h2 className="fw-bold mb-0">{user.username}</h2>

              {user.prime && (
                <span className="badge bg-warning text-dark ms-3 fs-6">
                  👑 PRIME
                </span>
              )}
            </div>

            <p className="text-secondary mt-3">
              {user.bio || "No bio added yet."}
            </p>
          </div>

          <hr className="my-4" />

          <div className="row text-center">
            <div className="col">
              <h3 className="fw-bold">{user.postCount}</h3>

              <span className="text-muted">Posts</span>
            </div>

            <div className="col">
              <Link to="/followers" className="text-decoration-none text-dark">
                <h3 className="fw-bold">{user.followersCount}</h3>

                <span className="text-muted">Followers</span>
              </Link>
            </div>

            <div className="col">
              <Link to="/following" className="text-decoration-none text-dark">
                <h3 className="fw-bold">{user.followingCount}</h3>

                <span className="text-muted">Following</span>
              </Link>
            </div>
          </div>

          <div className="d-flex justify-content-center gap-3 mt-4">
            <Link to="/edit-profile" className="btn btn-dark rounded-pill px-4">
              Edit Profile
            </Link>

            <button className="btn btn-outline-dark rounded-pill px-4">
              Share Profile
            </button>
          </div>
        </div>
      </div>
      {/* Posts Section */}

      <div className="mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold mb-0">My Posts</h3>

          <span className="badge bg-primary fs-6">{user.postCount} Posts</span>
        </div>

        <hr />

        {user.posts?.length > 0 ? (
          <div className="row g-4">
            {user.posts.map((post) => (
              <div key={post.id} className="col-xl-4 col-lg-4 col-md-6">
                <PostCard post={post} refreshFeed={loadProfile} />
              </div>
            ))}
          </div>
        ) : (
          <div className="card border-0 shadow rounded-4">
            <div className="card-body text-center py-5">
              <div style={{ fontSize: "80px" }}>📷</div>

              <h3 className="fw-bold mt-3">No Posts Yet</h3>

              <p className="text-muted">
                Share your first memory with everyone.
              </p>

              <Link
                to="/create-post"
                className="btn btn-primary rounded-pill px-4"
              >
                Create Post
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
