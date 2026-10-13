import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Loader from "../../components/common/Loader";
import PostCard from "../../components/post/PostCard";
import { getProfile } from "../../services/userService";

import "../../styles/Profile.css";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProfile = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getProfile();

      // Handle missing or unexpected API response data.
      const profileData = response.data?.data;

      if (!profileData) {
        setUser(null);
        setError("Profile data was not found.");
        return;
      }

      setUser(profileData);
    } catch (err) {
      console.error("Failed to load profile:", err);

      setUser(null);
      setError(
        err.response?.data?.message ||
          "Unable to load your profile. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return (
      <div className="profile-page">
        <div className="container py-5 text-center">
          <h3>Unable to Load Profile</h3>

          <p>
            {error || "Your profile is currently unavailable."}
          </p>

          <button
            type="button"
            onClick={loadProfile}
            className="btn btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const profileImage =
    user.imageUrl || "https://placehold.co/180x180?text=User";

  const posts = Array.isArray(user.posts)
    ? user.posts
    : [];

  const postCount = user.postCount ?? posts.length;
  const followersCount = user.followersCount ?? 0;
  const followingCount = user.followingCount ?? 0;

  return (
    <div className="profile-page">
      <div className="container py-5">
        {/* PROFILE CARD */}
        <div className="profile-card shadow-lg">
          <div className="profile-cover"></div>

          <div className="profile-body text-center">
            {/* Profile Image */}
            <img
              src={profileImage}
              alt="Profile"
              className="profile-avatar"
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src =
                  "https://placehold.co/180x180?text=User";
              }}
            />

            <div className="profile-title">
              <h2>{user.username || "User"}</h2>

              {user.prime && (
                <span className="prime-badge">
                  👑 PRIME
                </span>
              )}
            </div>

            <p className="profile-bio">
              {user.bio || "No bio added yet."}
            </p>

            <hr />

            {/* STATS */}
            <div className="profile-stats">
              <div>
                <h3>{postCount}</h3>
                <span>Posts</span>
              </div>

              <Link
                to="/followers"
                className="profile-stat-link"
              >
                <h3>{followersCount}</h3>
                <span>Followers</span>
              </Link>

              <Link
                to="/following"
                className="profile-stat-link"
              >
                <h3>{followingCount}</h3>
                <span>Following</span>
              </Link>
            </div>

            {/* ACTION BUTTONS */}
            <div className="profile-actions">
              <Link
                to="/edit-profile"
                className="profile-action primary"
              >
                ✏️ Edit Profile
              </Link>

              <button
                type="button"
                className="profile-action secondary"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(
                      window.location.origin + "/profile"
                    );
                    alert("Profile link copied!");
                  } catch (err) {
                    console.error(
                      "Failed to copy profile link:",
                      err
                    );
                    alert("Unable to copy profile link.");
                  }
                }}
              >
                🔗 Share Profile
              </button>
            </div>
          </div>
        </div>

        {/* POSTS SECTION */}
        <div className="posts-section">
          <div className="posts-header">
            <h3>My Posts</h3>
            <span>{postCount} Posts</span>
          </div>

          {posts.length > 0 ? (
            <div className="row g-4">
              {posts
                .filter((post) => post != null)
                .map((post, index) => (
                  <div
                    key={post.id ?? index}
                    className="col-xl-4 col-lg-4 col-md-6"
                  >
                    <PostCard
                      post={post}
                      refreshFeed={loadProfile}
                    />
                  </div>
                ))}
            </div>
          ) : (
            <div className="empty-post-card">
              <div className="empty-icon">📷</div>

              <h3>No Posts Yet</h3>

              <p>
                Share your first memory with everyone.
              </p>

              <Link
                to="/create-post"
                className="profile-action primary"
              >
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