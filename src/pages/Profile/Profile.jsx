import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { UserContext } from "../../contexts/ProfileContext";
import MentorProfileForm from "./MentorProfileForm";
import StudentProfileForm from "./StudentProfileForm";
import BasicInfo from "./BasicInfo";
import PhotoSection from "./PhotoSection";
import {
  fetchUserProfile,
  editUserProfile,
} from "../../services/mentorService";

export default function Profile() {

  const { user } = useContext(UserContext);

  const [basicInfo, setBasicInfo] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [basicInfoLoading, setBasicInfoLoading] = useState(true);
  const [basicInfoError, setBasicInfoError] = useState("");
  const [basicInfoSuccess, setBasicInfoSuccess] = useState("");
  const [basicInfoSubmitting, setBasicInfoSubmitting] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [photoEditMode, setPhotoEditMode] = useState(false);
  const [photoSubmitting, setPhotoSubmitting] = useState(false);
  const [photoError, setPhotoError] = useState("");
  const [photoSuccess, setPhotoSuccess] = useState("");
  useEffect(() => {
    fetchUserProfile()
      .then((data) => {
        setBasicInfo(data);
        setPhoto(data?.image || null);
        setBasicInfoLoading(false);
      })
      .catch(() => {
        setBasicInfoError("Failed to load basic info");
        setBasicInfoLoading(false);
      });
  }, []);
  const { user, setUser } = useContext(AuthContext);
  // Guard clause: do not access user.role if user is null
  if (!user) return <div className="text-center py-10">Loading...</div>;

  const handleBasicInfoChange = (e) => {
    const { name, value } = e.target;
    setBasicInfo((prev) => ({ ...prev, [name]: value }));
  };
  console.log("Submitting basic info:", basicInfo);
  const handleBasicInfoSave = async () => {
    setBasicInfoSubmitting(true);
    setBasicInfoError("");
    setBasicInfoSuccess("");
    try {
      // Only send allowed fields
      const { name, phoneNumber, title, bio, preferredLanguage } = basicInfo;
      await editUserProfile({
        name,
        phoneNumber,
        title,
        bio,
        preferredLanguage,
      });
      setBasicInfoSuccess("Basic info updated!");
      setEditMode(false);
    } catch (err) {
      setBasicInfoError("Failed to update basic info");
    } finally {
      setBasicInfoSubmitting(false);
    }
  };

  // Photo edit logic
  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };
  // Helper to convert file to base64
  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  const handlePhotoSave = async () => {
    setPhotoSubmitting(true);
    setPhotoError("");
    setPhotoSuccess("");
    try {
      let imageUrl = photo;
      if (photo && typeof photo !== "string") {
        // Upload to imgbb
        const base64 = await fileToBase64(photo);
        const formData = new FormData();
        formData.append("image", base64.split(",")[1]);
        const res = await fetch(
          "https://api.imgbb.com/1/upload?key=c40248bb545395f4cfbca0db7f5abc21",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await res.json();
        if (data.success) {
          imageUrl = data.data.url;
        } else {
          throw new Error("Image upload failed");
        }
      }
      await editUserProfile({ image: imageUrl });
      setPhotoSuccess("Photo updated!");
      setPhotoEditMode(false);
      // Hide Save Photo button by clearing photo if it was a File
      if (photo && typeof photo !== "string") {
        setPhoto(imageUrl); // set to the new url so the preview updates
      }
    } catch (err) {
      setPhotoError("Failed to update photo");
    } finally {
      setPhotoSubmitting(false);
    }
  };

  if (!user) return <div className="text-center py-10">Loading...</div>;

  return (

    <div className="bg-background">
      <div className="  max-w-2xl mx-auto space-y-8 p-4">
        {/* Photo Section at the top */}
        <div className="mt-20">
          <PhotoSection
            image={
              typeof photo === "string"
                ? photo
                : photo && URL.createObjectURL(photo)
            }
            onImageChange={handlePhotoChange}

  
            disabled={photoSubmitting}
            clickable // pass a prop to indicate photo is clickable
          />

          {photoError && (
            <div className="bg-red-100 text-red-700 p-2 rounded my-2">
              {photoError}
            </div>
          )}
          {photoSuccess && (
            <div className="bg-green-100 text-green-700 p-2 rounded my-2">
              {photoSuccess}
            </div>
          )}
          {/* Only show Save Photo if a new photo is selected */}
          {photo && typeof photo !== "string" && !photoSubmitting && (
            <div className="flex justify-end mt-3">
              <button
                className="btn p-2 rounded btn-primary mt-2"
                onClick={handlePhotoSave}
                disabled={photoSubmitting}
              >
                Save Photo
              </button>
            </div>

          )}
        </div>
        {/* Basic Info Section */}
        {basicInfoLoading ? (
          <div className="text-center py-10">Loading basic info...</div>
        ) : (
          <div>
            <BasicInfo
              formData={basicInfo}
              onChange={handleBasicInfoChange}
              disabled={!editMode || basicInfoSubmitting}
            />
            {basicInfoError && (
              <div className="bg-red-100 text-red-700 p-2 rounded my-2">
                {basicInfoError}
              </div>
            )}
            {basicInfoSuccess && (
              <div className="bg-green-100 text-green-700 p-2 rounded my-2">
                {basicInfoSuccess}
              </div>
            )}
            {!editMode ? (
              <div className="flex justify-end mt-3">
                <button
                  className="btn p-2 rounded btn-primary mt-2"
                  onClick={() => setEditMode(true)}
                >
                  Edit Basic Info
                </button>
              </div>
            ) : (
              <div className="flex justify-end mt-3">
                <button
                  className="btn p-2 rounded btn-primary mt-2"
                  onClick={handleBasicInfoSave}
                  disabled={basicInfoSubmitting}
                >
                  {basicInfoSubmitting ? "Saving..." : "Save Basic Info"}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Mentor/Student Info Section */}
        {user.role === "mentor" && (
          <div>
            <MentorProfileForm user={user} isRegistered={user.isRegistered} />
          </div>
        )}
        {user.role === "student" && (
          <div>
            <StudentProfileForm user={user} isRegistered={user.isRegistered} />
          </div>
        )}
      </div>
    </div>
  );
}
