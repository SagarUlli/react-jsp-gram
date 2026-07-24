import { useEffect, useState } from "react";
import { getFeed } from "../../services/postService";
import PostCard from "../../components/post/PostCard";
import Loader from "../../components/common/Loader";
import { getProfile } from "../../services/userService";
import { Link } from "react-router-dom";
import "../../styles/Home.css";

function Home() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeed();
  }, []);

  const loadFeed = async () => {
    try {
      const [feedResponse, profileResponse] = await Promise.all([
        getFeed(),
        getProfile(),
      ]);

      setPosts(feedResponse.data.data);
      setUser(profileResponse.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !user) {
    return <Loader />;
  }

  return (
    <div className="home-page">
      <div className="container-fluid py-4">
        <div className="row g-4">
          {/* LEFT PROFILE SIDEBAR */}

          <div className="col-xl-3 col-lg-4 d-none d-lg-block">
            <div className="home-card profile-card">
              <div className="profile-cover"></div>

              <div className="profile-content">
                <img
                  src={user.imageUrl}
                  alt="profile"
                  className="profile-image"
                />

                <h5 className="profile-name">{user.username}</h5>

                <p className="profile-bio">{user.bio || "No bio yet"}</p>

                <Link to="/profile" className="custom-btn dark-btn">
                  View Profile
                </Link>
              </div>
            </div>
          </div>

          {/* MAIN FEED */}

          <div className="col-xl-6 col-lg-8">
            <div className="feed-header">
              <h2>Welcome back, {user.username} 👋</h2>

              <p>See what's happening in your community.</p>
            </div>

            {posts.length === 0 ? (
              <div className="home-card empty-card">
                <div className="empty-icon">📭</div>

                <h3>No Posts Yet</h3>

                <p>Follow people and start discovering posts.</p>

                <Link to="/suggestions" className="custom-btn primary-btn">
                  Find Friends
                </Link>
              </div>
            ) : (
              posts.map((post) => (
                <div key={post.id} className="post-wrapper">
                  <PostCard post={post} refreshFeed={loadFeed} />
                </div>
              ))
            )}
          </div>

          {/* RIGHT ACTION SIDEBAR */}

          <div className="col-xl-3 d-none d-xl-block">
            <div className="home-card actions-card">
              <h5>Quick Actions</h5>

              <Link to="/create-post" className="action-link create">
                <span>＋</span>
                Create Post
              </Link>

              <Link to="/suggestions" className="action-link friends">
                <span>👥</span>
                Find Friends
              </Link>

              <Link to="/prime" className="action-link prime">
                <span>⭐</span>
                Upgrade Prime
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
