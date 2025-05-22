import React, { useState, useEffect } from "react";
import {
  Camera,
  Upload,
  User,
  Briefcase,
  Mail,
  PenTool,
  Save,
  Loader,
} from "lucide-react";

const API_BASE = "https://platform-backend-c4zp.onrender.com";

const ProfileForm = () => {
  const [teacherProfile, setTeacherProfile] = useState({
    full_name: "",
    email: "",
    bio: "",
    department: "",
    signaturePreview: "",
    id: null,
  });

  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileId = localStorage.getItem("profileId");
        if (!profileId) {
          setLoading(false);
          return;
        }

        const res = await fetch(`${API_BASE}/profile/${profileId}`);
        if (!res.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await res.json();
        setTeacherProfile({
          full_name: data.full_name || "",
          email: data.email || "",
          bio: data.bio || "",
          department: data.department || "",
          signaturePreview: data.avatar_url || "",
          id: data._id || data.id,
        });
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSignatureUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setTeacherProfile((prev) => ({
        ...prev,
        signaturePreview: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const saveProfile = async () => {
    setSaving(true);
    setError(null);
    try {
      const isUpdate = teacherProfile.id;
      const endpoint = isUpdate
        ? `${API_BASE}/profile/${teacherProfile.id}`
        : `${API_BASE}/profile/`;

      const method = isUpdate ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: teacherProfile.full_name,
          email: teacherProfile.email,
          bio: teacherProfile.bio,
          department: teacherProfile.department,
          avatar_url: teacherProfile.signaturePreview || null,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to save profile");
      }

      const data = await res.json();
      setTeacherProfile((prev) => ({
        ...prev,
        id: data._id || data.id,
      }));
      localStorage.setItem("profileId", data._id || data.id);
      alert("Profile saved successfully");
    } catch (err) {
      console.error("Error saving profile:", err);
      setError("Failed to save profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex justify-center items-center h-64">
        <Loader className="animate-spin text-blue-500" size={32} />
        <span className="ml-3 text-gray-600">Loading profile...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <div className="text-red-500 mb-4">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
      <div className="flex items-center gap-3 mb-8 pb-5 border-b border-gray-100">
        <div className="bg-blue-100 p-2 rounded-lg">
          <User className="text-blue-600" size={24} />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Teacher Profile</h1>
      </div>

      <div className="space-y-8">
        {/* Personal Info */}
        <div>
          <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-4">
            <User size={18} />
            <span>Personal Information</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="font-medium text-gray-600 text-sm mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={teacherProfile.full_name}
                onChange={(e) =>
                  setTeacherProfile((prev) => ({
                    ...prev,
                    full_name: e.target.value,
                  }))
                }
                className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="Enter your full name"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium text-gray-600 text-sm mb-2">
                Email
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <input
                  type="email"
                  value={teacherProfile.email}
                  onChange={(e) =>
                    setTeacherProfile((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  className="border border-gray-300 rounded-lg pl-10 pr-4 py-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Professional Info */}
        <div>
          <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-4">
            <Briefcase size={18} />
            <span>Professional Information</span>
          </h2>
          <div className="flex flex-col">
            <label className="font-medium text-gray-600 text-sm mb-2">
              Department
            </label>
            <div className="relative">
              <Briefcase
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                value={teacherProfile.department}
                onChange={(e) =>
                  setTeacherProfile((prev) => ({
                    ...prev,
                    department: e.target.value,
                  }))
                }
                className="border border-gray-300 rounded-lg pl-10 pr-4 py-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="e.g. Mathematics, History, Science"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="font-medium text-gray-600 text-sm mb-2">
              Biography
            </label>
            <textarea
              value={teacherProfile.bio}
              onChange={(e) =>
                setTeacherProfile((prev) => ({
                  ...prev,
                  bio: e.target.value,
                }))
              }
              className="border border-gray-300 rounded-lg px-4 py-3 w-full min-h-[150px] resize-y focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="Share your teaching philosophy, background, and expertise..."
            />
          </div>
        </div>

        {/* Signature */}
        <div>
          <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-4">
            <PenTool size={18} />
            <span>Digital Signature</span>
          </h2>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 w-full md:w-1/3">
              {teacherProfile.signaturePreview ? (
                <div className="relative group">
                  <img
                    src={teacherProfile.signaturePreview}
                    alt="Signature"
                    className="w-full h-24 object-contain"
                  />
                  <button
                    onClick={() => {
                      setTeacherProfile((prev) => ({
                        ...prev,
                        signaturePreview: "",
                      }));
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Remove signature"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="w-full h-24 border border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400">
                  <PenTool size={24} />
                  <span className="text-sm mt-2">No signature</span>
                </div>
              )}
            </div>
            <div className="flex flex-col w-full md:w-2/3">
              <label className="group relative cursor-pointer inline-flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-3 rounded-lg w-full md:w-auto transition-colors">
                <Upload size={16} />
                <span className="font-medium">
                  {teacherProfile.signaturePreview
                    ? "Change Signature"
                    : "Upload Signature"}
                </span>
                <input
                  type="file"
                  onChange={handleSignatureUpload}
                  accept="image/*"
                  className="hidden"
                />
              </label>
              <p className="text-xs text-gray-500 mt-2">
                Upload a clear image of your signature (PNG or JPG)
              </p>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          {error && (
            <div className="text-red-500 text-sm flex-1">{error}</div>
          )}
          <button
            onClick={saveProfile}
            disabled={saving}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium w-full md:w-auto disabled:bg-blue-400 transition-colors"
          >
            {saving ? (
              <>
                <Loader className="animate-spin" size={16} />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save size={16} />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;