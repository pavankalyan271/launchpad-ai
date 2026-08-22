import { useState } from "react";

export default function ProfileSettingsForm() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    bio: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    // Full Name
    if (!form.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    } else if (form.fullName.trim().length < 3) {
      newErrors.fullName = "Full name must be at least 3 characters.";
    }

    // Email
    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      newErrors.email = "Enter a valid email address.";
    }

    // Bio
    if (form.bio.length > 200) {
      newErrors.bio = "Bio cannot exceed 200 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSuccess(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSuccess(true);
  };

  return (
    <div className="form-container">
      <h2>Profile Settings</h2>

      <form onSubmit={handleSubmit} noValidate>
        {/* Full Name */}
        <div className="form-group">
          <label htmlFor="fullName" className="form-label">Full Name</label>
          <input
            id="fullName"
            name="fullName"
            className="form-input"
            value={form.fullName}
            onChange={handleChange}
          />
          {errors.fullName && <p className="error-message">{errors.fullName}</p>}
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            className="form-input"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        {/* Bio */}
        <div className="form-group">
          <label htmlFor="bio" className="form-label">Short Bio (optional)</label>
          <textarea
            id="bio"
            name="bio"
            className="form-textarea"
            rows={4}
            value={form.bio}
            onChange={handleChange}
          />
          {errors.bio && <p className="error-message">{errors.bio}</p>}
        </div>

        <button type="submit" className="submit-button">
          Save Changes
        </button>

        {success && (
          <p className="success-message">Profile updated successfully!</p>
        )}
      </form>
    </div>
  );
}
