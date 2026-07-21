import { useState } from "react";
import { Link } from "react-router-dom";
import { likePost, unlikePost, deletePost } from "../../services/postService";
import CommentSection from "../../pages/Comments/CommentSection";
function PostCard({ post, refreshFeed }) {
  const [liked, setLiked] = useState(post.liked);
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [commentCount, setCommentCount] = useState(post.commentCount);
  const [showComments, setShowComments] = useState(false);

  const handleLike = async () => {
    try {
      let response;

      if (liked) {
        response = await unlikePost(post.id);
      } else {
        response = await likePost(post.id);
      }
      const updatedPost = response.data.data;

      if (updatedPost) {
        setLiked(updatedPost.liked);
        setLikeCount(updatedPost.likeCount);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) {
      return;
    }

    try {
      await deletePost(post.id);

      refreshFeed?.();
    } catch (error) {
      console.error(error);

      toast.error("Failed to delete post.");
    }
  };

  return (
    <div className="card mb-4 shadow-sm">
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt="Post"
          className="card-img-top"
          style={{ maxHeight: "500px", objectFit: "cover" }}
        />
      )}

      <div className="card-body">
        {/* Username */}
        <Link
          to={`/users/${post.user.id}`}
          className="text-decoration-none text-dark"
        >
          <h5>{post.user.username}</h5>
        </Link>

        {/* Caption */}
        <p>{post.caption}</p>

        {/* Action Buttons */}
        <div className="d-flex align-items-center gap-2 flex-wrap mt-2">
          <button className="btn btn-outline-danger" onClick={handleLike}>
            {liked ? "❤️ Unlike" : "🤍 Like"}
          </button>

          <button
            className="btn btn-outline-primary"
            onClick={() => setShowComments(!showComments)}
          >
            💬 Comments ({commentCount})
          </button>

          {post.ownPost && (
            <>
              <Link
                to={`/posts/edit/${post.id}`}
                className="btn btn-warning btn-sm"
              >
                Edit
              </Link>

              <button className="btn btn-danger btn-sm" onClick={handleDelete}>
                Delete
              </button>
            </>
          )}
        </div>

        {/* Like Count */}
        <p className="mt-3 mb-0">❤️ Likes: {likeCount}</p>

        {/* Comments */}
        {showComments && (
          <div className="mt-3">
            <CommentSection
              postId={post.id}
              refreshFeed={refreshFeed}
              refreshCommentCount={setCommentCount}
            />{" "}
          </div>
        )}
      </div>
    </div>
  );
}

export default PostCard;
