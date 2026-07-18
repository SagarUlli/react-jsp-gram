import { useState } from "react";
import { likePost, unlikePost } from "../services/postService";

function PostCard({ post }) {
  const [liked, setLiked] = useState(post.liked);
  const [likeCount, setLikeCount] = useState(post.likeCount);

  const handleLike = async () => {
    try {
      if (liked) {
        const response = await unlikePost(post.id);

        setLiked(response.data.data.liked);
        setLikeCount(response.data.data.likeCount);
      } else {
        const response = await likePost(post.id);

        setLiked(response.data.data.liked);
        setLikeCount(response.data.data.likeCount);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="card mb-4 shadow-sm">
      <img src={post.imageUrl} alt="Post" className="card-img-top" />

      <div className="card-body">
        <h5>{post.user.username}</h5>

        <p>{post.caption}</p>

        <button className="btn btn-outline-danger" onClick={handleLike}>
          {liked ? "❤️ Unlike" : "🤍 Like"}
        </button>

        <p className="mt-2">Likes : {likeCount}</p>

        <p>Comments : {post.commentCount}</p>
      </div>
    </div>
  );
}

export default PostCard;
