import { useState } from "react";
import { likePost, unlikePost } from "../services/postService";
import CommentSection from "./CommentSection";

function PostCard({ post }) {
  const [liked, setLiked] = useState(post.liked);
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [showComments, setShowComments] = useState(false);

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

        <div className="d-flex align-items-center gap-2 mt-2">
          <button className="btn btn-outline-danger" onClick={handleLike}>
            {liked ? "❤️ Unlike" : "🤍 Like"}
          </button>

          {post.ownPost && (
            <Link to={`/posts/edit/${post.id}`} className="btn btn-warning">
              ✏️ Edit
            </Link>
          )}

          <button
            className="btn btn-outline-primary"
            onClick={() => setShowComments(!showComments)}
          >
            💬 Comments ({post.commentCount})
          </button>
        </div>

        <p className="mt-2">Likes : {likeCount}</p>
        {showComments && <CommentSection postId={post.id} />}
      </div>
    </div>
  );
}

export default PostCard;
