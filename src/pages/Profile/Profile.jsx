import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { getMyProfile } from "../services/userService";

function Profile() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await getMyProfile();

      setUser(response.data.data);
      setPosts(response.data.data.posts);
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
          alt={user.username}
          width="150"
          className="rounded-circle mb-3"
        />

        <h3>{user.username}</h3>

        <p>{user.bio}</p>

        <div className="d-flex gap-4">
          <span>
            <strong>{user.posts.length}</strong> Posts
          </span>

          <span>
            <strong>{user.followers.length}</strong> Followers
          </span>

          <span>
            <strong>{user.following.length}</strong> Following
          </span>
        </div>
      </div>

      {posts.map((post) => (
        <PostCard key={post.id} post={post} refreshFeed={loadProfile} />
      ))}
    </div>
  );
}

export default Profile;
