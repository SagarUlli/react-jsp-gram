import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getUserProfile,
  followUser,
  unfollowUser,
} from "../../services/userService";
import PostCard from "../../components/post/PostCard";
import Loader from "../../components/common/Loader";

function UserProfile() {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, [id]);

  const loadProfile = async () => {
    try {
      const response = await getUserProfile(id);

      setUser(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async () => {
    try {
      if (user.following) {
        await unfollowUser(id);
      } else {
        await followUser(id);
      }

      loadProfile();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mt-4">
      <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
        {/* Cover Banner */}
        <div
          style={{
            height: "220px",
            background: "linear-gradient(135deg,#4f46e5,#7c3aed,#06b6d4)",
          }}
        ></div>

        <div className="card-body">
          {/* Profile Image */}
          <div className="text-center">
            <img
              src={user.imageUrl || "https://placehold.co/180x180?text=User"}
              alt="Profile"
              className="rounded-circle border border-4 border-white shadow"
              style={{
                width: "170px",
                height: "170px",
                objectFit: "cover",
                marginTop: "-120px",
                background: "white",
              }}
            />

            <div className="mt-3">
              <h2 className="fw-bold d-inline">{user.username}</h2>

              {user.prime && (
                <span className="badge bg-warning text-dark ms-3 fs-6">
                  👑 PRIME
                </span>
              )}
            </div>

            <p className="text-secondary mb-1">
              @{user.username.toLowerCase()}
            </p>

            <p className="text-muted">{user.bio || "No bio added yet."}</p>
          </div>

          <hr className="my-4" />

          {/* Statistics */}
          <div className="row g-3">
            <div className="col-md-4">
              <div className="card border-0 bg-light shadow-sm text-center">
                <div className="card-body">
                  <h2 className="fw-bold">{user.postCount}</h2>

                  <small className="text-muted">Posts</small>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <Link to="/followers" className="text-decoration-none">
                <div className="card border-0 bg-light shadow-sm text-center">
                  <div className="card-body">
                    <h2 className="fw-bold text-dark">{user.followersCount}</h2>

                    <small className="text-muted">Followers</small>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col-md-4">
              <Link to="/following" className="text-decoration-none">
                <div className="card border-0 bg-light shadow-sm text-center">
                  <div className="card-body">
                    <h2 className="fw-bold text-dark">{user.followingCount}</h2>

                    <small className="text-muted">Following</small>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Buttons */}

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
      <h4>Posts</h4>

      {user.posts.map((post) => (
        <PostCard key={post.id} post={post} refreshFeed={loadProfile} />
      ))}
    </div>
  );
}

export default UserProfile;
