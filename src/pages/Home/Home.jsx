import { useEffect, useState } from "react";
import { getFeed } from "../../services/postService";
import PostCard from "../../components/post/PostCard";
import Loader from "../../components/common/Loader";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeed();
  }, []);

  const loadFeed = async () => {
    try {
      const response = await getFeed();
      setPosts(response.data.data);
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
      {posts.length === 0 ? (
        <h4>No posts available.</h4>
      ) : (
        posts.map((post) => (
          <PostCard key={post.id} post={post} refreshFeed={loadFeed} />
        ))
      )}
    </div>
  );
}

export default Home;
