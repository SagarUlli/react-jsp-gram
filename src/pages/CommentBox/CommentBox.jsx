import { useEffect, useState } from "react";
import {
  getComments,
  addComment,
  deleteComment,
} from "../../services/postService";
import "../../styles/CommentBox.css";

function CommentBox({ postId }) {
  const [comments, setComments] = useState([]);

  const [comment, setComment] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadComments();
  }, []);

  const loadComments = async () => {
    try {
      const response = await getComments(postId);

      setComments(response.data.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddComment = async () => {
    if (!comment.trim()) return;

    try {
      setLoading(true);

      const response = await addComment(postId, {
        comment: comment,
      });

      setComments((prev) => [...prev, response.data.data]);

      setComment("");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteComment(id);

      loadComments();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="comment-box">
      <div className="comment-input">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment..."
        />

        <button onClick={handleAddComment} disabled={loading}>
          Post
        </button>
      </div>

      <div className="comments-list">
        {comments.length === 0 ? (
          <p className="text-muted">No comments yet</p>
        ) : (
          comments.map((item) => (
            <div className="single-comment" key={item.id}>
              <img
                src={item.user.imageUrl || "https://placehold.co/40x40"}
                alt=""
              />

              <div>
                <h6>{item.user.username || "User"}</h6>

                <p>{item.comment}</p>
              </div>

              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CommentBox;
