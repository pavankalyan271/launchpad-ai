import { useForm } from "react-hook-form";

type ProfileForm = {
  fullName: string;
  email: string;
  bio: string;
  password: string;
  confirmPassword: string;
};

export default function ProfileSettingsForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProfileForm>();

  const onSubmit = (data: ProfileForm) => {
    console.log("Profile updated:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        maxWidth: 450,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <h2>Profile Settings</h2>

      {/* Full Name */}
      <div>
        <label>Full Name</label>
        <input
          {...register("fullName", {
            required: "Full name is required",
            minLength: { value: 3, message: "Name must be at least 3 characters" },
          })}
        />
        {errors.fullName && <p style={{ color: "red" }}>{errors.fullName.message}</p>}
      </div>

      {/* Email */}
      <div>
        <label>Email</label>
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Enter a valid email",
            },
          })}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
      </div>

      {/* Bio */}
      <div>
        <label>Bio</label>
        <textarea
          {...register("bio", {
            maxLength: { value: 200, message: "Bio cannot exceed 200 characters" },
          })}
        />
        {errors.bio && <p style={{ color: "red" }}>{errors.bio.message}</p>}
      </div>

      {/* Password */}
      <div>
        <label>New Password</label>
        <input
          type="password"
          {...register("password", {
            minLength: { value: 8, message: "Password must be at least 8 characters" },
          })}
        />
        {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
      </div>

      {/* Confirm Password */}
      <div>
        <label>Confirm Password</label>
        <input
          type="password"
          {...register("confirmPassword", {
            validate: (value) =>
              value === watch("password") || "Passwords do not match",
          })}
        />
        {errors.confirmPassword && (
          <p style={{ color: "red" }}>{errors.confirmPassword.message}</p>
        )}
      </div>

      <button type="submit">Save Changes</button>
    </form>
  );
}
