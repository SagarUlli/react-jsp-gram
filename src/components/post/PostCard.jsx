import { useState } from "react";
import { Link } from "react-router-dom";

import "../../styles/PostCard.css";

import { likePost, unlikePost, deletePost } from "../../services/postService";

import CommentBox from "../../pages/CommentBox/CommentBox";

function PostCard({ post, refreshFeed }) {
  const [liked, setLiked] = useState(post.liked);

  const [likeCount, setLikeCount] = useState(post.likeCount);

  const [showComments, setShowComments] = useState(false);

  const handleLike = async () => {
    try {
      if (liked) {
        await unlikePost(post.id);

        setLiked(false);

        setLikeCount((prev) => prev - 1);
      } else {
        await likePost(post.id);

        setLiked(true);

        setLikeCount((prev) => prev + 1);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?",
    );

    if (!confirmDelete) return;

    try {
      await deletePost(post.id);

      refreshFeed();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="post-card">
      {/* Post Image */}

      <img src={post.imageUrl} alt="Post" className="post-image" />

      <div className="post-body">
        {/* User Header */}

        <div className="post-user d-flex align-items-center">
          <img
            src={post.user.imageUrl || "https://placehold.co/60x60?text=U"}
            alt="User"
            className="post-avatar"
          />

          <div className="ms-3">
            <h6 className="post-username">{post.user.username}</h6>

            <small className="post-date">
              {new Date(post.postedTime).toLocaleString()}
            </small>
          </div>
        </div>

        {/* Caption */}

        <p className="post-caption">{post.caption}</p>

        {/* Bottom Actions */}

        <div className="post-footer">
          <div className="reaction-buttons">
            <button
              onClick={handleLike}
              className={
                liked ? "reaction-btn like-btn active" : "reaction-btn like-btn"
              }
            >
              ❤️ {likeCount}
            </button>

            <button
              onClick={() => setShowComments(!showComments)}
              className="reaction-btn comment-btn"
            >
              💬 {post.commentCount}
            </button>
          </div>

          {post.ownPost && (
            <div className="owner-actions">
              <Link to={`/posts/edit/${post.id}`} className="edit-btn">
                ✏️ Edit
              </Link>

              <button onClick={handleDelete} className="delete-btn">
                🗑 Delete
              </button>
            </div>
          )}
        </div>

        {/* Comments */}

        {showComments && <CommentBox postId={post.id} />}
      </div>
    </div>
  );
}

export default PostCard;
