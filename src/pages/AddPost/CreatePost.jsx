import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../services/postService";

function CreatePost() {
  const navigate = useNavigate();

  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("caption", caption);
      formData.append("image", image);

      await createPost(formData);

      navigate("/home");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card p-4">
        <h3>Create Post</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleImage}
            />
          </div>

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="img-fluid rounded mb-3"
            />
          )}

          <div className="mb-3">
            <textarea
              className="form-control"
              rows="4"
              placeholder="Write a caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          </div>

          <button className="btn btn-primary" disabled={loading}>
            {loading ? "Posting..." : "Post"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
