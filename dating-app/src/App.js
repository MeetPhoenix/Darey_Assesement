import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    location: "",
    interests: "",
    profilePicture: null,
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.age) newErrors.age = "Age is required.";
    if (!formData.gender) newErrors.gender = "Gender is required.";
    if (!formData.location.trim()) newErrors.location = "Location is required.";
    if (!formData.interests.trim()) newErrors.interests = "Interests are required.";
    if (!formData.profilePicture)
      newErrors.profilePicture = "Profile picture is required.";
    else if (
      !["image/jpeg", "image/png"].includes(formData.profilePicture.type)
    )
      newErrors.profilePicture = "Only .jpg and .png files are allowed.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage("");

    if (validate()) {
      setSuccessMessage("Profile created successfully!");
      setErrors({});
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({ ...prevData, profilePicture: e.target.files[0] }));
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Create Your Profile</h2>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        {/* Age */}
        <div className="mb-3">
          <label htmlFor="age" className="form-label">
            Age
          </label>
          <input
            type="number"
            className={`form-control ${errors.age ? "is-invalid" : ""}`}
            id="age"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
          />
          {errors.age && <div className="invalid-feedback">{errors.age}</div>}
        </div>

        {/* Gender */}
        <div className="mb-3">
          <label htmlFor="gender" className="form-label">
            Gender
          </label>
          <select
            className={`form-select ${errors.gender ? "is-invalid" : ""}`}
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
          >
            <option value="">Select your gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
        </div>

        {/* Location */}
        <div className="mb-3">
          <label htmlFor="location" className="form-label">
            Location
          </label>
          <input
            type="text"
            className={`form-control ${errors.location ? "is-invalid" : ""}`}
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
          />
          {errors.location && (
            <div className="invalid-feedback">{errors.location}</div>
          )}
        </div>

        {/* Interests */}
        <div className="mb-3">
          <label htmlFor="interests" className="form-label">
            Interests
          </label>
          <textarea
            className={`form-control ${errors.interests ? "is-invalid" : ""}`}
            id="interests"
            name="interests"
            rows="3"
            value={formData.interests}
            onChange={handleInputChange}
          ></textarea>
          {errors.interests && (
            <div className="invalid-feedback">{errors.interests}</div>
          )}
        </div>

        {/* Profile Picture */}
        <div className="mb-3">
          <label htmlFor="profilePicture" className="form-label">
            Profile Picture
          </label>
          <input
            type="file"
            className={`form-control ${errors.profilePicture ? "is-invalid" : ""}`}
            id="profilePicture"
            name="profilePicture"
            accept="image/*"
            onChange={handleFileChange}
          />
          {errors.profilePicture && (
            <div className="invalid-feedback">{errors.profilePicture}</div>
          )}
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">
          Create Profile
        </button>
      </form>

      {/* Success Message */}
      {successMessage && (
        <div className="alert alert-success mt-4" role="alert">
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default App;
