import { useState } from "react";
import bcrypt from "bcryptjs";
import { useNavigate, Link } from "react-router";

import Button from "../../ui/Button";
import Input from "../../ui/Input";
import toast from "react-hot-toast";
import Loading from "../../ui/Loading";

export default function RegisterView() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = (formData) => {
    const { email, username, password, confirmPassword } = formData;
    const existing = getAccounts();

    const emailExists = existing.some((acc) => acc.email === email);
    const usernameExists = existing.some((acc) => acc.username === username);

    if (!email || !username || !password || !confirmPassword) {
      return "All fields are required";
    }

    if (emailExists) {
      return "email already exists";
    }

    if (usernameExists) {
      return "username already exists";
    }

    if (password.length < 8) {
      return "password must be 8 characters or more";
    }

    if (password !== confirmPassword) {
      return "password do not match";
    }

    return null;
  };

  const getAccounts = () => {
    return JSON.parse(localStorage.getItem("accounts")) || [];
  };

  const saveAccount = (account) => {
    const existing = getAccounts();
    const updated = [...existing, account];
    localStorage.setItem("accounts", JSON.stringify(updated));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validateForm(form);

    if (error) {
      setError(error);
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(form.password, salt);

    const newAccount = {
      id: crypto.randomUUID(),
      email: form.email,
      username: form.username,
      password: hashedPassword,
    };

    try {
      setIsLoading(true);
      setError(null);

      saveAccount(newAccount);

      setForm({ email: "", username: "", password: "", confirmPassword: "" });
      toast.success("Account created successfully!");
      navigate("/auth/login");
    } catch (error) {
      console.error(`Error registering new account: ${error}`);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="w-full text-center text-red-500">{error}</p>}
        <div>
          <label
            htmlFor="email"
            className="text-sm font-medium text-gray-700 block mb-1"
          >
            Email
          </label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email address"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label
            htmlFor="username"
            className="text-sm font-medium text-gray-700 block mb-1"
          >
            Username
          </label>
          <Input
            id="username"
            type="text"
            name="username"
            placeholder="Choose a unique username"
            value={form.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700 block mb-1"
          >
            Password
          </label>
          <Input
            id="password"
            type="password"
            name="password"
            placeholder="Create a strong password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label
            htmlFor="confirm-password"
            className="text-sm font-medium text-gray-700 block mb-1"
          >
            Confirm Password
          </label>
          <Input
            id="confirm-password"
            type="password"
            name="confirmPassword"
            placeholder="Re-enter your password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <Button
          variant="primary"
          type="submit"
          disabled={isLoading}
          className="w-full cursor-pointer"
        >
          {isLoading ? <Loading color="white" /> : "Sign Up"}
        </Button>
        <p className="w-full text-center">
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="underline hover:text-blue-500 cursor-pointer"
          >
            Sign In
          </Link>
        </p>
      </form>
    </>
  );
}
