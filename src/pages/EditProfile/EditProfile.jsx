import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, updateProfile } from "../../services/userService";
import Loader from "../../components/common/Loader";

function EditProfile() {
  const navigate = useNavigate();

  const [bio, setBio] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await getProfile();

      const user = response.data.data;

      setBio(user.bio || "");
      setPreview(user.imageUrl);
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

    formData.append("bio", bio);

    if (image) {
      formData.append("image", image);
    }

    try {
      await updateProfile(formData);

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
        <h3>Edit Profile</h3>

        <div className="text-center mb-3">
          <img
            src={preview}
            alt="Profile"
            width="150"
            height="150"
            className="rounded-circle"
          />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleImage}
            />
          </div>

          <div className="mb-3">
            <textarea
              className="form-control"
              rows="4"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Write something about yourself..."
            />
          </div>

          <button className="btn btn-primary" type="submit">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
