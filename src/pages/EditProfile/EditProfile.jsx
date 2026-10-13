import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getProfile,
  updateProfile,
} from "../../services/userService";

import Loader from "../../components/common/Loader";
import "../../styles/EditProfile.css";

function EditProfile() {
  const navigate = useNavigate();

  const [bio, setBio] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const loadProfile = async () => {
      try {
        const response = await getProfile();

        console.log("Full profile response:", response);
        console.log("Response data:", response.data);
        console.log("Response data.data:", response.data?.data);

        const user =
          response.data?.data?.user ??
          response.data?.data ??
          response.data?.user ??
          response.data;

        if (!user || typeof user !== "object") {
          throw new Error("Profile data is missing from the API response.");
        }

        setBio(user.bio ?? "");
        setPreview(
          user.imageUrl ||
          "https://placehold.co/180x180?text=User"
        );

        if (!active) return;

        setBio(user.bio ?? "");
        setPreview(
          user.imageUrl ||
          "https://placehold.co/180x180?text=User"
        );
      } catch (err) {
        console.error("Failed to load profile:", err);

        if (active) {
          setError(
            err.response?.data?.message ||
            err.message ||
            "Unable to load your profile."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadProfile();

    return () => {
      active = false;
    };
  }, []);

  const handleImage = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      e.target.value = "";
      return;
    }

    setError("");
    setImage(file);

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (saving) return;

    setSaving(true);
    setError("");

    const formData = new FormData();

    formData.append("bio", bio);

    if (image) {
      formData.append("image", image);
    }

    try {
      await updateProfile(formData);

      navigate("/profile");
    } catch (err) {
      console.error("Failed to update profile:", err);

      setError(
        err.response?.data?.message ||
        "Failed to update your profile. Please try again."
      );
    } finally {
      setSaving(false);
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
            <h2 className="text-center fw-bold mb-4">
              Edit Profile
            </h2>

            {error && (
              <div
                className="alert alert-danger"
                role="alert"
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Profile Image Preview */}
              <div className="text-center mb-4">
                <img
                  src={
                    preview ||
                    "https://placehold.co/180x180?text=User"
                  }
                  alt="Profile"
                  className="profile-preview"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src =
                      "https://placehold.co/180x180?text=User";
                  }}
                />
              </div>

              {/* Image Upload */}
              <div className="mb-4">
                <label
                  htmlFor="profileImage"
                  className="form-label fw-semibold"
                >
                  Profile Image
                </label>

                <input
                  id="profileImage"
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={handleImage}
                  disabled={saving}
                />
              </div>

              {/* Bio */}
              <div className="mb-4">
                <label
                  htmlFor="profileBio"
                  className="form-label fw-semibold"
                >
                  Bio
                </label>

                <textarea
                  id="profileBio"
                  className="form-control"
                  rows={5}
                  placeholder="Tell people about yourself..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  disabled={saving}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="btn btn-primary btn-lg rounded-pill w-100"
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;