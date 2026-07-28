import React, { useState, useEffect, useCallback } from "react";
import Cropper from "react-easy-crop";
import { useAuth } from "./context/AuthContext";
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} from "./api/api";

// ==========================================
// --- IMAGE CROPPER HELPER FUNCTIONS ---
// ==========================================
const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });

const getCroppedImg = async (imageSrc, pixelCrop) => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error("Canvas is empty"));
        return;
      }
      blob.name = "cropped-image.jpeg";
      const file = new File([blob], "cropped-image.jpeg", {
        type: "image/jpeg",
      });
      resolve(file);
    }, "image/jpeg");
  });
};

// ==========================================
// --- MAIN DASHBOARD COMPONENT ---
// ==========================================
const Dashboard = () => {
  const { logout } = useAuth();

  // Tabs: 'employees' ya 'blogs'
  const [activeTab, setActiveTab] = useState("employees");

  // Data States
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Modal States for Create/Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Form States (Now matched strictly to Backend schema)
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [description, setDescription] = useState(""); // Used by both Employee & Blog!
  const [linkedinProfileLink, setLinkedinProfileLink] = useState("");
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [formSubmitting, setFormSubmitting] = useState(false);

  // Cropping States
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isCropping, setIsCropping] = useState(false);

  // 1. Fetch Data whenever Tab Changes
  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      let res;
      if (activeTab === "employees") {
        res = await getEmployees();
      } else {
        res = await getBlogs();
      }
      // Backend returns { success: true, count: N, data: [...] }
      const items = Array.isArray(res) ? res : res?.data || [];
      setDataList(items);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load data. Please refresh.");
    } finally {
      setLoading(false);
    }
  };

  // 2. Open Modal for Create
  const handleOpenCreateModal = () => {
    setEditingId(null);
    resetFormFields();
    setIsModalOpen(true);
  };

  // 3. Open Modal for Edit
  const handleOpenEditModal = (item) => {
    setEditingId(item._id);
    if (activeTab === "employees") {
      setName(item.name || "");
      setPosition(item.position || ""); // Strictly mapped to position
      setDescription(item.description || "");
      setLinkedinProfileLink(item.linkedinProfileLink || "");
    } else {
      setTitle(item.title || "");
      setDescription(item.description || ""); // Strictly mapped to description
    }
    setImageFile(null);
    setPreviewUrl(item.image || "");
    setIsModalOpen(true);
  };

  // 4. Reset Form Fields
  const resetFormFields = () => {
    setName("");
    setPosition("");
    setDescription("");
    setLinkedinProfileLink("");
    setTitle("");
    setImageFile(null);
    setPreviewUrl("");
    setImageSrc(null);
    setIsCropping(false);
  };

  // 5. Handle File Select (Triggers Cropper)
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const imageDataUrl = URL.createObjectURL(file);
      setImageSrc(imageDataUrl);
      setIsCropping(true);
      setZoom(1);
      setCrop({ x: 0, y: 0 });
    }
  };

  // 6. On Crop Complete
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  // 7. Save Cropped Image
  const handleSaveCrop = async () => {
    try {
      const croppedFile = await getCroppedImg(imageSrc, croppedAreaPixels);
      setImageFile(croppedFile);
      setPreviewUrl(URL.createObjectURL(croppedFile));
      setIsCropping(false);
    } catch (e) {
      console.error("Cropping error:", e);
      alert("Failed to crop image.");
    }
  };

  // 8. Handle Form Submit (Payload STRICTLY matched with Backend!)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // STRICT BACKEND VALIDATION CHECK:
    // When creating new records, Backend strictly requires an image file!
    if (!editingId && !imageFile && !previewUrl) {
      alert("Please upload an image! Backend strictly requires an image file for creating new entries.");
      return;
    }

    setFormSubmitting(true);

    try {
      const formData = new FormData();
      
      // Append image if selected
      if (imageFile) {
        formData.append("image", imageFile);
      }

      if (activeTab === "employees") {
        // Backend Employee Payload: name, position, description, linkedinProfileLink, image
        formData.append("name", name);
        formData.append("position", position);
        formData.append("description", description);
        formData.append("linkedinProfileLink", linkedinProfileLink);

        if (editingId) {
          await updateEmployee(editingId, formData);
        } else {
          await createEmployee(formData);
        }
      } else {
        // Backend Blog Payload: title, description, image (CHANGED 'content' TO 'description')
        formData.append("title", title);
        formData.append("description", description);

        if (editingId) {
          await updateBlog(editingId, formData);
        } else {
          await createBlog(formData);
        }
      }

      setIsModalOpen(false);
      resetFormFields();
      fetchData();
    } catch (err) {
      console.error("Error saving data:", err);
      // Show actual backend error message if available
      const errMsg = err.response?.data?.message || "Something went wrong while saving.";
      alert(`Error: ${errMsg}`);
    } finally {
      setFormSubmitting(false);
    }
  };

  // 9. Handle Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item? This will also delete the image from Cloudinary.")) return;
    try {
      if (activeTab === "employees") {
        await deleteEmployee(id);
      } else {
        await deleteBlog(id);
      }
      setDataList(dataList.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error deleting:", err);
      alert("Failed to delete item.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-black text-[#0f172a]">Admin Dashboard</h1>
            <p className="text-sm text-slate-500 font-medium">Manage Employees and Blog Posts</p>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
            <button
              onClick={handleOpenCreateModal}
              className="bg-[#2a73ff] hover:bg-[#1e5cdc] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all flex items-center gap-2"
            >
              <span>+ Add New {activeTab === "employees" ? "Employee" : "Blog"}</span>
            </button>
            <button
              onClick={logout}
              className="bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2.5 rounded-xl font-bold text-sm transition-all border border-red-100"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab("employees")}
            className={`py-3 px-6 font-bold text-sm border-b-2 transition-all ${
              activeTab === "employees"
                ? "border-[#2a73ff] text-[#2a73ff]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Team Members ({activeTab === "employees" ? dataList.length : ""})
          </button>
          <button
            onClick={() => setActiveTab("blogs")}
            className={`py-3 px-6 font-bold text-sm border-b-2 transition-all ${
              activeTab === "blogs"
                ? "border-[#2a73ff] text-[#2a73ff]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Blogs & Articles ({activeTab === "blogs" ? dataList.length : ""})
          </button>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-slate-500 font-medium">Loading data...</div>
          ) : error ? (
            <div className="p-12 text-center text-red-500 font-medium">{error}</div>
          ) : dataList.length === 0 ? (
            <div className="p-12 text-center text-slate-500 font-medium">
              No {activeTab} found. Click the button above to create one.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-gray-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-4 px-6">Image</th>
                    <th className="py-4 px-6">{activeTab === "employees" ? "Name & Position" : "Title"}</th>
                    <th className="py-4 px-6">Description</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {dataList.map((item, idx) => (
                    <tr key={item._id || idx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-6">
                        <img
                          src={item.image || "https://via.placeholder.com/100"}
                          alt="Thumbnail"
                          className="w-12 h-12 rounded-xl object-cover border border-gray-200 bg-slate-100"
                        />
                      </td>
                      <td className="py-4 px-6">
                        {activeTab === "employees" ? (
                          <div>
                            <div className="font-bold text-[#0f172a]">{item.name || "Unnamed"}</div>
                            <div className="text-xs text-[#2a73ff] font-semibold mt-0.5">
                              {item.position || "No Position"}
                            </div>
                          </div>
                        ) : (
                          <div className="font-bold text-[#0f172a] line-clamp-2 max-w-xs">
                            {item.title || "Untitled Blog"}
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-slate-600 line-clamp-2 max-w-md text-xs leading-relaxed">
                          {item.description || "No description provided."}
                        </p>
                      </td>
                      <td className="py-4 px-6 text-right space-x-2">
                        <button
                          onClick={() => handleOpenEditModal(item)}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg font-semibold text-xs transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-lg font-semibold text-xs transition-colors"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>

      {/* ========================================== */}
      {/* 1. MODAL FOR ADD / EDIT */}
      {/* ========================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-gray-100 my-8">
            <div className="flex justify-between items-center pb-4 border-b border-gray-100 mb-6">
              <h3 className="text-lg font-black text-[#0f172a]">
                {editingId ? "Edit" : "Add New"} {activeTab === "employees" ? "Employee" : "Blog"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {activeTab === "employees" && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Manju Bansal"
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-[#2a73ff] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Position / Role *</label>
                    <input
                      type="text"
                      required
                      value={position}
                      onChange={(e) => setPosition(e.target.value)}
                      placeholder="e.g. Founder / Devops Engineer"
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-[#2a73ff] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">LinkedIn Profile URL</label>
                    <input
                      type="url"
                      value={linkedinProfileLink}
                      onChange={(e) => setLinkedinProfileLink(e.target.value)}
                      placeholder="https://linkedin.com/in/username"
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-[#2a73ff] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Description *</label>
                    <textarea
                      rows="3"
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Short bio or responsibilities..."
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-[#2a73ff] outline-none"
                    />
                  </div>
                </>
              )}

              {activeTab === "blogs" && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Blog Title *</label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter blog title..."
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-[#2a73ff] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Description (Content) *</label>
                    <textarea
                      rows="5"
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Write full blog description here..."
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-[#2a73ff] outline-none"
                    />
                  </div>
                </>
              )}

              {/* Image Input and Preview */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Upload & Crop Image {editingId ? "(Leave empty to keep existing image)" : "* Required"}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 transition-all cursor-pointer"
                />

                {/* Show Selected or Cropped Image Preview */}
                {previewUrl && (
                  <div className="mt-3 flex items-center gap-3 p-2 border border-gray-100 rounded-xl bg-slate-50">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-16 h-16 rounded-lg object-cover border border-gray-200 shadow-sm"
                    />
                    <div className="text-xs text-slate-600 font-medium">
                      <p className="font-bold text-[#0f172a]">Image Ready</p>
                      <p className="text-[11px] text-slate-400">Will be uploaded on save.</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="bg-[#0f172a] hover:bg-[#2a73ff] text-white px-6 py-2 rounded-xl font-bold text-sm shadow-md transition-all flex items-center gap-2 disabled:bg-slate-400"
                >
                  {formSubmitting ? "Saving..." : editingId ? "Update Changes" : "Create Item"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 2. CROPPER MODAL (OPEN WHEN IMAGE SELECTED) */}
      {/* ========================================== */}
      {isCropping && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl overflow-hidden">
            <h3 className="text-base font-black text-[#0f172a] mb-2 text-center">
              Adjust, Crop & Zoom
            </h3>
            <p className="text-xs text-slate-400 text-center mb-4">
              Drag image to position and use controls below to zoom
            </p>

            {/* Cropper Container */}
            <div className="relative w-full h-64 bg-slate-900 rounded-xl overflow-hidden mb-6 border border-gray-200">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={activeTab === "employees" ? 1 / 1 : 16 / 9}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>

            {/* Zoom Controls */}
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-xs font-bold text-slate-600">
                <span>Zoom Out</span>
                <span>Zoom In</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setZoom((prev) => Math.max(1, prev - 0.2))}
                  className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold text-slate-700 flex items-center justify-center"
                >
                  -
                </button>
                <input
                  type="range"
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  aria-labelledby="Zoom"
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full accent-[#2a73ff] cursor-pointer"
                >
                </input>
                <button
                  type="button"
                  onClick={() => setZoom((prev) => Math.min(3, prev + 0.2))}
                  className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold text-slate-700 flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setIsCropping(false)}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 font-bold text-sm text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveCrop}
                className="flex-1 py-2.5 rounded-xl bg-[#2a73ff] hover:bg-[#1e5cdc] text-white font-bold text-sm shadow-md transition-all"
              >
                Crop & Save
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;