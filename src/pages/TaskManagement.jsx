import TaskManagementLayout from "../components/layouts/TaskManagement";
import TaskManagementView from "../components/views/TaskManagement";

export default function TaskManagement() {
  return (
    <TaskManagementLayout>
      <TaskManagementView />
    </TaskManagementLayout>
  );
}
