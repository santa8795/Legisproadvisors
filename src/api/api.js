import  API  from "./axios";

export const getEmployees = async () => {
  const response = await API.get("/employees");
  return response.data;
};

export const createEmployee = async (formData) => {
  // We use multipart/form-data because we are sending an image file
  const response = await API.post("/employees", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateEmployee = async (id, formData) => {
  const response = await API.put(`/employees/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteEmployee = async (id) => {
  const response = await API.delete(`/employees/${id}`);
  return response.data;
};

// ==========================================
// --- BLOG API CALLS ---
// ==========================================

export const getBlogs = async () => {
  const response = await API.get("/blogs");
  return response.data;
};

export const createBlog = async (formData) => {
  const response = await API.post("/blogs", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateBlog = async (id, formData) => {
  const response = await API.put(`/blogs/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteBlog = async (id) => {
  const response = await API.delete(`/blogs/${id}`);
  return response.data;
};
