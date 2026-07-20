import { useEffect, useState } from "react";
import {
  getComments,
  addComment,
  deleteComment,
} from "../../services/postService";

function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    loadComments();
  }, []);

  const loadComments = async () => {
    try {
      const response = await getComments(postId);
      setComments(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleComment = async () => {
    if (!comment.trim()) return;

    try {
      await addComment(postId, {
        comment,
      });

      setComment("");

      loadComments();
    } catch (error) {
      console.error(error);
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
    <div>
      <input
        type="text"
        className="form-control"
        placeholder="Write a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button className="btn btn-primary mt-2" onClick={handleComment}>
        Comment
      </button>

      <hr />

      {comments.map((c) => (
        <div key={c.id} className="mb-2">
          <strong>{c.user.username}</strong>

          <p>{c.comment}</p>

          <button
            className="btn btn-sm btn-danger"
            onClick={() => handleDelete(c.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default CommentSection;
