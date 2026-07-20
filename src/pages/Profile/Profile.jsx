import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProfile } from "../services/userService";
import PostCard from "../components/PostCard";

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
    return <h3>Loading...</h3>;
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
            <h5>{user.followersCount}</h5>
            <p>Followers</p>
          </div>

          <div className="col">
            <h5>{user.followingCount}</h5>
            <p>Following</p>
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
    </div>
  );
}

export default Profile;
