import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { MentorContext } from "../../contexts/ProfileContext";
import MentorProfileForm from "./MentorProfileForm";
import StudentProfileForm from "./StudentProfileForm";
import BasicInfo from "./BasicInfo";
import PhotoSection from "./PhotoSection";
import { fetchUserProfile, editUserProfile } from "../../services/mentorService";

export default function Profile() {
  const { user, setUser } = useContext(AuthContext);
  // Guard clause: do not access user.role if user is null
  if (!user) return <div className="text-center py-10">Loading...</div>;

  const { mentor, setMentor, refreshMentor } = useContext(MentorContext);
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
        setPhoto(data?.photo || data?.mentorImage || null);
        setBasicInfoLoading(false);
      })
      .catch(() => {
        setBasicInfoError("Failed to load basic info");
        setBasicInfoLoading(false);
      });
  }, []);

  const handleBasicInfoChange = (e) => {
    const { name, value } = e.target;
    setBasicInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleBasicInfoSave = async () => {
    setBasicInfoSubmitting(true);
    setBasicInfoError("");
    setBasicInfoSuccess("");
    try {
      const { name, phoneNumber, title, bio, preferredLanguage } = basicInfo;
      await editUserProfile({ name, phoneNumber, title, bio, preferredLanguage });
      setBasicInfoSuccess("Basic info updated!");
      setEditMode(false);
    } catch (err) {
      setBasicInfoError("Failed to update basic info");
    } finally {
      setBasicInfoSubmitting(false);
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

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };
  const handlePhotoSave = async () => {
    setPhotoSubmitting(true);
    setPhotoError("");
    setPhotoSuccess("");
    try {
      let imageString = photo;
      if (photo && typeof photo !== "string") {
        imageString = await fileToBase64(photo);
      }
      await editUserProfile({ Image: imageString });
      setPhotoSuccess("Photo updated!");
      setPhotoEditMode(false);
    } catch (err) {
      setPhotoError("Failed to update photo");
    } finally {
      setPhotoSubmitting(false);
    }
  };

  // Registration logic for mentor/student
  const needsRegistration =
    (user.role === "mentor" && (!mentor || mentor.isRegistered === false)) ||
    (user.role === "student" && (!user.profile || user.isRegistered === false));

  // After successful mentor profile creation
  const handleMentorProfileCreated = async (newProfile) => {
    if (setMentor) setMentor(newProfile);
    if (refreshMentor) await refreshMentor();
    if (setUser) setUser((prev) => ({ ...prev, isRegistered: true }));
  };

  // After successful student profile creation (implement as needed)
  const handleStudentProfileCreated = (newProfile) => {
    // setProfile(newProfile); // if you have a student profile context
    if (setUser) setUser((prev) => ({ ...prev, isRegistered: true }));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 p-4">
      {/* Photo Section at the top */}
      <div>
        <PhotoSection
          image={typeof photo === "string" ? photo : (photo && URL.createObjectURL(photo))}
          onImageChange={handlePhotoChange}
          disabled={photoSubmitting}
          clickable
        />
        {photoError && <div className="bg-red-100 text-red-700 p-2 rounded my-2">{photoError}</div>}
        {photoSuccess && <div className="bg-green-100 text-green-700 p-2 rounded my-2">{photoSuccess}</div>}
        {photo && typeof photo !== "string" && !photoSubmitting && (
          <button
            className="btn-primary mt-2"
            onClick={handlePhotoSave}
            disabled={photoSubmitting}
          >
            Save Photo
          </button>
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
          {basicInfoError && <div className="bg-red-100 text-red-700 p-2 rounded my-2">{basicInfoError}</div>}
          {basicInfoSuccess && <div className="bg-green-100 text-green-700 p-2 rounded my-2">{basicInfoSuccess}</div>}
          {!editMode ? (
            <button className="btn-primary mt-2" onClick={() => setEditMode(true)}>
              Edit Basic Info
            </button>
          ) : (
            <button
              className="btn-primary mt-2"
              onClick={handleBasicInfoSave}
              disabled={basicInfoSubmitting}
            >
              {basicInfoSubmitting ? "Saving..." : "Save Basic Info"}
            </button>
          )}
        </div>
      )}

      {/* Mentor/Student Info Section */}
      {user.role === "mentor" && (
        <div>
          {needsRegistration ? (
            <>
              <MentorProfileForm mode="create" onSuccess={handleMentorProfileCreated} />
              <button type="submit" className="btn-primary mt-4">Register</button>
            </>
          ) : (
            <>
              <MentorProfileForm mode="edit" mentor={mentor} />
              <button type="submit" className="btn-primary mt-4">Edit</button>
            </>
          )}
        </div>
      )}
      {user.role === "student" && (
        <div>
          {needsRegistration ? (
            <>
              <StudentProfileForm mode="create" onSuccess={handleStudentProfileCreated} />
              <button type="submit" className="btn-primary mt-4">Register</button>
            </>
          ) : (
            <>
              <StudentProfileForm mode="edit" />
              <button type="submit" className="btn-primary mt-4">Edit</button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
