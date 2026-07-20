import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPost, updatePost } from "../../services/postService";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPost();
  }, []);

  const loadPost = async () => {
    try {
      const response = await getPost(id);

      const post = response.data.data;

      setCaption(post.caption);
      setPreview(post.imageUrl);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("caption", caption);

    if (image) {
      formData.append("image", image);
    }

    try {
      await updatePost(id, formData);

      navigate("/profile");
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mt-4">
      <div className="card p-4">
        <h3>Edit Post</h3>

        <form onSubmit={handleSubmit}>
          <img src={preview} alt="Preview" className="img-fluid rounded mb-3" />

          <input
            type="file"
            className="form-control mb-3"
            accept="image/*"
            onChange={handleImage}
          />

          <textarea
            className="form-control mb-3"
            rows="4"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />

          <button className="btn btn-primary">Update Post</button>
        </form>
      </div>
    </div>
  );
}

export default EditPost;
