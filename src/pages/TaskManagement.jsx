import { useEffect } from "react";
import { useNavigate } from "react-router";

import TaskManagementLayout from "../components/layouts/TaskManagement";
import TaskManagementView from "../components/views/TaskManagement";
import toast from "react-hot-toast";

export default function TaskManagement() {
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      toast.error("You are not logged in");
      navigate("/auth/login");
    }
  }, [navigate]);
  return (
    <TaskManagementLayout>
      <TaskManagementView />
    </TaskManagementLayout>
  );
}
