import { useState } from "react";
import { Link } from "react-router-dom";

import "../../styles/PostCard.css";

import {
  likePost,
  unlikePost,
  deletePost,
} from "../../services/postService";

import {
  bookmarkPost,
  unbookmarkPost,
} from "../../services/bookmarkService";

import CommentBox from "../../pages/CommentBox/CommentBox";

function PostCard({ post, refreshFeed }) {
  const [liked, setLiked] = useState(post?.liked ?? false);
  const [likeCount, setLikeCount] = useState(post?.likeCount ?? 0);
  const [bookmarked, setBookmarked] = useState(
    post?.bookmarked ?? false
  );
  const [showComments, setShowComments] = useState(false);

  // Prevent crashes if post data is missing.
  if (!post) {
    return null;
  }

  // Safely handle missing user information.
  const postUser = post.user ?? {};

  const postImage =
    post.imageUrl || "https://placehold.co/600x400?text=Post";

  const userImage =
    postUser.imageUrl || "https://placehold.co/60x60?text=U";

  const handleLike = async () => {
    try {
      if (liked) {
        await unlikePost(post.id);

        setLiked(false);
        setLikeCount((prev) => Math.max(0, prev - 1));
      } else {
        await likePost(post.id);

        setLiked(true);
        setLikeCount((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Like action failed:", error);
    }
  };

  const handleBookmark = async () => {
    try {
      if (bookmarked) {
        await unbookmarkPost(post.id);
        setBookmarked(false);
      } else {
        await bookmarkPost(post.id);
        setBookmarked(true);
      }
    } catch (error) {
      console.error("Bookmark action failed:", error);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmDelete) return;

    try {
      await deletePost(post.id);

      if (refreshFeed) {
        await refreshFeed();
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <div className="post-card">
      {/* Post Image */}
      <img
        src={postImage}
        alt="Post"
        className="post-image"
        onError={(event) => {
          event.currentTarget.onerror = null;
          event.currentTarget.src =
            "https://placehold.co/600x400?text=Post";
        }}
      />

      <div className="post-body">
        {/* User Header */}
        <div className="post-user d-flex align-items-center">
          <img
            src={userImage}
            alt="User"
            className="post-avatar"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src =
                "https://placehold.co/60x60?text=U";
            }}
          />

          <div className="ms-3">
            <h6 className="post-username">
              {postUser.username || "Unknown User"}
            </h6>

            <small className="post-date">
              {post.postedTime
                ? new Date(post.postedTime).toLocaleString()
                : "Date unavailable"}
            </small>
          </div>
        </div>

        {/* Caption */}
        <p className="post-caption">
          {post.caption || ""}
        </p>

        {/* Bottom Actions */}
        <div className="post-footer">
          <div className="reaction-buttons">
            {/* Like */}
            <button
              type="button"
              onClick={handleLike}
              className={
                liked
                  ? "reaction-btn like-btn active"
                  : "reaction-btn like-btn"
              }
            >
              ❤️ {likeCount}
            </button>

            {/* Comment */}
            <button
              type="button"
              onClick={() =>
                setShowComments((prev) => !prev)
              }
              className="reaction-btn comment-btn"
            >
              💬 {post.commentCount ?? 0}
            </button>

            {/* Bookmark */}
            <button
              type="button"
              onClick={handleBookmark}
              className={
                bookmarked
                  ? "reaction-btn bookmark-btn active"
                  : "reaction-btn bookmark-btn"
              }
              title={
                bookmarked
                  ? "Remove bookmark"
                  : "Bookmark post"
              }
            >
              {bookmarked ? "🔖 Saved" : "🔖 Save"}
            </button>
          </div>

          {/* Owner Actions */}
          {post.ownPost && (
            <div className="owner-actions">
              <Link
                to={`/posts/edit/${post.id}`}
                className="edit-btn"
              >
                ✏️ Edit
              </Link>

              <button
                type="button"
                onClick={handleDelete}
                className="delete-btn"
              >
                🗑 Delete
              </button>
            </div>
          )}
        </div>

        {/* Comments */}
        {showComments && (
          <CommentBox postId={post.id} />
        )}
      </div>
    </div>
  );
}

export default PostCard;