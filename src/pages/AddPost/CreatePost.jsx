import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createPost } from "../../services/postService";
import "../../styles/CreatePost.css";

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
      toast.error("Please select an image.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("caption", caption);
      formData.append("image", image);

      await createPost(formData);

      toast.success("Post created successfully.");

      navigate("/home");
    } catch (error) {
      console.error(error);
      toast.error("Unable to create post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-5">
              <h2 className="text-center fw-bold mb-4">📸 Create Post</h2>

              <form onSubmit={handleSubmit}>
                <div className="text-center mb-4">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="preview-image"
                    />
                  ) : (
                    <div className="upload-placeholder">
                      <h1>🖼️</h1>

                      <h5>No Image Selected</h5>

                      <p className="text-muted">Select an image to preview</p>
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control form-control-lg"
                    onChange={handleImage}
                  />
                </div>

                <div className="mb-2">
                  <textarea
                    className="form-control caption-box"
                    rows="5"
                    maxLength={500}
                    placeholder="Write an amazing caption..."
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                  />
                </div>

                <div className="text-end mb-4">
                  <small className="text-muted">{caption.length}/500</small>
                </div>

                <button
                  className="btn btn-primary btn-lg rounded-pill w-100"
                  disabled={loading}
                >
                  {loading ? "Publishing..." : "🚀 Publish Post"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
