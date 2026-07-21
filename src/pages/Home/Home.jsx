import { useEffect, useState } from "react";
import { getFeed } from "../../services/postService";
import PostCard from "../../components/post/PostCard";
import Loader from "../../components/common/Loader";
import { getProfile } from "../../services/userService";
import { Link } from "react-router-dom";

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
    <div className="container-fluid mt-4">
      <div className="row">
        {/* Left Sidebar */}

        <div className="col-lg-3 d-none d-lg-block">
          <div className="card border-0 shadow rounded-4">
            <div className="card-body text-center">
              <img
                src={user.imageUrl}
                alt=""
                className="rounded-circle mb-3"
                width="90"
                height="90"
              />

              <h5>{user.username}</h5>

              <p className="text-muted">{user.bio || "No bio yet"}</p>

              <Link to="/profile" className="btn btn-dark rounded-pill w-100">
                View Profile
              </Link>
            </div>
          </div>
        </div>

        {/* Feed */}

        <div className="col-lg-6">
          {posts.length === 0 ? (
            <div className="card border-0 shadow rounded-4">
              <div className="card-body text-center py-5">
                <h3>No Posts Yet</h3>

                <p className="text-muted">Follow users to see their posts.</p>
              </div>
            </div>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="mb-4">
                <PostCard post={post} refreshFeed={loadFeed} />
              </div>
            ))
          )}
        </div>

        {/* Right Sidebar */}

        <div className="col-lg-3 d-none d-lg-block">
          <div className="card border-0 shadow rounded-4">
            <div className="card-body">
              <h5 className="mb-3">Quick Actions</h5>

              <Link to="/create-post" className="btn btn-primary w-100 mb-2">
                Create Post
              </Link>

              <Link
                to="/suggestions"
                className="btn btn-dark rounded-pill w-100 mb-2"
              >
                Find Friends
              </Link>

              <Link to="/prime" className="btn btn-warning rounded-pill w-100">
                Upgrade to Prime
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
