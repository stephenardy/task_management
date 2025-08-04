import { useState } from "react";
import bcrypt from "bcryptjs";
import { Link, useNavigate } from "react-router";

import Input from "../../ui/Input";
import Button from "../../ui/Button";
import toast from "react-hot-toast";
import Loading from "../../ui/Loading";

export default function LoginView() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const getAccounts = () => {
    return JSON.parse(localStorage.getItem("accounts")) || [];
  };

  const validateCredentials = async (formData) => {
    const { identifier, password } = formData;

    const existingAccounts = getAccounts();

    const user = existingAccounts.find(
      (user) => user.email === identifier || user.username === identifier
    );

    if (!user) {
      return "identifier not exists";
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return "password and identifier not match";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const error = await validateCredentials(form);

      if (error) {
        setError(error);
        return;
      }

      setError(null);

      const existing = getAccounts();
      const user = existing.find(
        (user) =>
          user.email === form.identifier || user.username === form.identifier
      );

      localStorage.setItem("user", JSON.stringify(user));

      setForm({ identifier: "", password: "" });
      toast.success("Login successfully!");
      navigate("/");
    } catch (error) {
      console.error(`Error registering new account: ${error}`);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="w-full text-center text-red-500">{error}</p>}
        <div>
          <label
            htmlFor="identifier"
            className="text-sm font-medium text-gray-700 block mb-1"
          >
            Identifier
          </label>
          <Input
            id="identifier"
            type="text"
            name="identifier"
            placeholder="Input email or username"
            value={form.identifier}
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
            placeholder="Input password"
            value={form.password}
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
          {isLoading ? <Loading color="white" /> : "Sign In"}
        </Button>
        <p className="w-full text-center">
          Doesn't have an account?{" "}
          <Link
            to="/auth/register"
            className="underline hover:text-blue-500 cursor-pointer"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </>
  );
}
