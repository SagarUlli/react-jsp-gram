import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, updateProfile } from "../../services/userService";
import Loader from "../../components/common/Loader";
import "../../styles/EditProfile.css";

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
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card edit-card shadow border-0 p-5">
            <h2 className="text-center fw-bold mb-4">Edit Profile</h2>

            <form onSubmit={handleSubmit}>
              <div className="text-center mb-4">
                <img src={preview} alt="Profile" className="profile-preview" />
              </div>

              <div className="mb-4">
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={handleImage}
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">Bio</label>

                <textarea
                  className="form-control"
                  rows="5"
                  placeholder="Tell people about yourself..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>

              <button className="btn btn-primary btn-lg rounded-pill w-100">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
