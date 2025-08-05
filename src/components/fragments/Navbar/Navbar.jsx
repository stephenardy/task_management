import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Button from "../../ui/Button";

export default function Navbar() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      return;
    }

    if (user.username) {
      setUsername(user.username);
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("user");
    navigate("/auth/login");
  }

  return (
    <nav className="flex items-center justify-between bg-gray-800 px-4 py-3 text-white">
      <h1 className="text-lg font-semibold">Task Management App</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm">Hello, {username}</span>
        <Button
          variant="danger"
          size="sm"
          onClick={handleLogout}
          className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded"
        >
          Logout
        </Button>
      </div>
    </nav>
  );
}
