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
      <div className="card p-4 mb-4">
        <div className="text-center">
          <img
            src={user.imageUrl}
            alt="Profile"
            width="150"
            height="150"
            className="rounded-circle"
          />

          <h3 className="mt-3">{user.username}</h3>

          <p>{user.bio}</p>
        </div>

        <div className="row text-center">
          <div className="col">
            <h5>{user.postCount}</h5>
            <small>Posts</small>
          </div>

          <div className="col">
            <h5>{user.followersCount}</h5>
            <small>Followers</small>
          </div>

          <div className="col">
            <h5>{user.followingCount}</h5>
            <small>Following</small>
          </div>
        </div>

        <button
          className={`btn mt-3 ${
            user.following ? "btn-outline-danger" : "btn-primary"
          }`}
          onClick={handleFollow}
        >
          {user.following ? "Unfollow" : "Follow"}
        </button>
      </div>

      <h4>Posts</h4>

      {user.posts.map((post) => (
        <PostCard key={post.id} post={post} refreshFeed={loadProfile} />
      ))}
    </div>
  );
}

export default UserProfile;
