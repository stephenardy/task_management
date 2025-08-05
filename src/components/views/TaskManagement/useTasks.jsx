import { useEffect, useState } from "react";

export default function useTasks() {
  const [taskData, setTaskData] = useState([]);

  function getUserTasks() {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const userTasks = allTasks.filter(
      (task) => task.userId === currentUser?.id
    );

    return userTasks;
  }

  function updateTasks() {
    const userTasks = getUserTasks();
    setTaskData(userTasks);
  }

  function toogleCompleteTask(taskId) {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const allTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const updatedTasks = allTasks.map((task) =>
      task.id === taskId && task.userId === currentUser.id
        ? { ...task, isComplete: !task.isComplete }
        : task
    );
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    updateTasks();
  }

  function handleClearCompleteTask() {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const allTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const updatedTasks = allTasks.filter(
      (task) => !(task.userId === currentUser?.id && task.isComplete)
    );

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    updateTasks();
  }

  useEffect(() => {
    updateTasks();
  }, []);

  return { taskData, updateTasks, toogleCompleteTask, handleClearCompleteTask };
}
