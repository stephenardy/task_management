import { useState } from "react";
import TaskFilter from "./TaskFilter/index";
import AddTaskForm from "./AddTaskForm/index";

// import CompleteTask from "../../CompleteTask";
// import TaskList from "../../TaskList";
import toast from "react-hot-toast";
import TasksList from "./TasksList";
import useTasks from "./useTasks";

export default function TaskManagementView() {
  const { taskData, updateTasks, toogleCompleteTask, handleClearCompleteTask } =
    useTasks();

  const [formData, setFormData] = useState({
    title: "",
    priority: "",
    dueDate: "",
    dueTime: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const [filterTask, setFilterTask] = useState(0);
  const [filterPriority, setFilterPriority] = useState("");

  function handleDateFormat(dueDate) {
    const splitDate = dueDate.split("-");
    return `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`;
  }

  function validateTask({ title, priority, dueDate, dueTime }) {
    if (!title.trim()) return "Please input the task!";
    if (!priority) return "Please choose a priority level!";
    if (!dueDate) return "Please select the due date!";
    if (!dueTime) return "Please select the due time!";

    const dueDateTime = new Date(`${dueDate}T${dueTime}`);
    const now = new Date();

    if (dueDateTime < now) {
      return "Due time cannot be in the past!";
    }

    return null;
  }

  function handleAddTask(e) {
    e.preventDefault();

    const { title, priority, dueDate, dueTime } = formData;

    const error = validateTask(formData);

    if (error) {
      toast.error(error);
      return;
    }

    const currentUser = JSON.parse(localStorage.getItem("user"));

    const newTask = {
      id: crypto.randomUUID(),
      userId: currentUser?.id,
      title: title.trim(),
      dueDate: handleDateFormat(dueDate),
      dueTime,
      priority,
      isComplete: false,
    };

    try {
      setIsLoading(true);

      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));

      setFormData({ title: "", priority: "", dueDate: "", dueTime: "" });
      updateTasks();
      toast.success("Task added successfully!");
    } catch (error) {
      console.error(`Error adding new task: ${error}`);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const filteredTask = taskData.filter((task) => {
    if (filterTask === 1 && !task.isComplete) return false;
    if (filterTask === 2 && task.isComplete) return false;
    if (filterPriority && task.priority !== filterPriority) return false;
    return true;
  });

  return (
    <>
      <div className="w-full mt-16 mb-8 text-center px-4">
        <h2 className="text-2xl md:text-3xl text-blue-500 font-bold">
          Task Management
        </h2>
        <p className="text-sm text-gray-400">
          Organize your life, one task at a time
        </p>
      </div>

      <div className="w-4/5 h-auto p-4 bg-white rounded">
        <AddTaskForm
          onAddTask={handleAddTask}
          formData={formData}
          setFormData={setFormData}
          isLoading={isLoading}
        />

        <TaskFilter
          filterTask={filterTask}
          onFilterTask={setFilterTask}
          filterPriority={filterPriority}
          onFilterPriority={setFilterPriority}
        />

        <TasksList
          filteredTask={filteredTask}
          filterTask={filterTask}
          filterPriority={filterPriority}
          onClearCompletedTask={handleClearCompleteTask}
          onCompleteTask={toogleCompleteTask}
        />
      </div>
    </>
  );
}
