import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/common/Loader";
import PostCard from "../../components/post/PostCard";
import { getProfile } from "../../services/userService";
import "../../styles/Profile.css";

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
    <div className="profile-page">
      <div className="container py-5">
        {/* PROFILE CARD */}

        <div className="profile-card shadow-lg">
          <div className="profile-cover"></div>

          <div className="profile-body text-center">
            <img
              src={user.imageUrl || "https://placehold.co/180x180?text=User"}
              alt="Profile"
              className="profile-avatar"
            />

            <div className="profile-title">
              <h2>{user.username}</h2>

              {user.prime && <span className="prime-badge">👑 PRIME</span>}
            </div>

            <p className="profile-bio">{user.bio || "No bio added yet."}</p>

            <hr />

            {/* STATS */}

            <div className="profile-stats">
              <div>
                <h3>{user.postCount}</h3>

                <span>Posts</span>
              </div>

              <Link to="/followers" className="profile-stat-link">
                <h3>{user.followersCount}</h3>

                <span>Followers</span>
              </Link>

              <Link to="/following" className="profile-stat-link">
                <h3>{user.followingCount}</h3>

                <span>Following</span>
              </Link>
            </div>

            {/* ACTION BUTTONS */}

            <div className="profile-actions">
              <Link to="/edit-profile" className="profile-action primary">
                ✏️ Edit Profile
              </Link>

              <button className="profile-action secondary">
                🔗 Share Profile
              </button>
            </div>
          </div>
        </div>

        {/* POSTS SECTION */}

        <div className="posts-section">
          <div className="posts-header">
            <h3>My Posts</h3>

            <span>{user.postCount} Posts</span>
          </div>

          {user.posts?.length > 0 ? (
            <div className="row g-4">
              {user.posts.map((post) => (
                <div key={post.id} className="col-xl-4 col-lg-4 col-md-6">
                  <PostCard post={post} refreshFeed={loadProfile} />
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-post-card">
              <div className="empty-icon">📷</div>

              <h3>No Posts Yet</h3>

              <p>Share your first memory with everyone.</p>

              <Link to="/create-post" className="profile-action primary">
                Create Post
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
