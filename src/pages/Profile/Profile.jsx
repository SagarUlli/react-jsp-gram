import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProfile } from "../../services/userService";
import PostCard from "../../components/post/PostCard";
import Loader from "../../components/common/Loader";

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
    <div className="container mt-4">
      <div className="card p-4 mb-4">
        <img
          src={user.imageUrl}
          alt="Profile"
          width="150"
          className="rounded-circle mb-3"
        />

        <h3>{user.username}</h3>

        <p>{user.bio}</p>

        <div className="row text-center">
          <div className="col">
            <h5>{user.postCount}</h5>
            <p>Posts</p>
          </div>

          <div className="col">
            <Link to="/followers" className="text-decoration-none text-dark">
              <h5>{user.followersCount}</h5>
              <p>Followers</p>
            </Link>
          </div>

          <div className="col">
            <Link to="/following" className="text-decoration-none text-dark">
              <h5>{user.followingCount}</h5>
              <p>Following</p>
            </Link>
          </div>
        </div>

        <Link to="/edit-profile" className="btn btn-primary mt-3">
          Edit Profile
        </Link>
      </div>

      <h4>My Posts</h4>

      {user.posts.map((post) => (
        <PostCard key={post.id} post={post} refreshFeed={loadProfile} />
      ))}

      {user.prime && (
        <span className="badge bg-warning text-dark ms-2">👑 PRIME</span>
      )}
    </div>
  );
}

export default Profile;
