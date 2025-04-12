import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signUp, isSigningIn } = useAuthStore();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    if (!formData.fullName.trim())
      return toast.error("Fullname must be provided");
    if (!formData.email.trim()) return toast.error("Email must be provided");
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      return toast.error("Please provide a valid email address");
    }
    if (!formData.password.trim())
      return toast.error("Password must be provided");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters long");

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success) {
      signUp(formData);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 bg-base-200 pt-16">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl p-6 sm:p-8 rounded-2xl shadow-xl bg-base-100">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              className="input input-bordered w-full"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered w-full"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="input input-bordered w-full pr-10"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isSigningIn}
          >
            {isSigningIn ? "Signing up..." : "Sign Up"}
          </button>
          <p className="text-center mt-4 text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary hover:underline font-medium"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
