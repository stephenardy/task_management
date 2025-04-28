export default function TaskItem({ task, index, onCompleteTask }) {
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${day}-${month}-${year}`;
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    return `${hours}:${minutes}`;
  };

  const getTommorowDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate() + 1).padStart(2, "0");

    return `${day}-${month}-${year}`;
  };

  return (
    <li className="p-3 shadow-sm">
      <div className="flex justify-between">
        {task.dueDate < getTodayDate() && (
          <span className="text-red-500">Outdated</span>
        )}
        {task.dueDate === getTodayDate() && task.dueTime < getCurrentTime() && (
          <span className="text-red-500">Outdated</span>
        )}
        {task.dueDate === getTodayDate() &&
          task.dueTime >= getCurrentTime() && (
            <span className="text-yellow-500">Today, {task.dueTime}</span>
          )}
        {task.dueDate === getTommorowDate() && (
          <span className="text-blue-500">Tomorrow, {task.dueTime}</span>
        )}
        {task.dueDate > getTommorowDate() && (
          <span className="text-blue-500">{task.dueDate}</span>
        )}

        {task.priority === "high" && (
          <span className="text-red-400 font-medium">⚠️High</span>
        )}
        {task.priority === "medium" && (
          <span className="text-blue-400 font-medium">ℹ️Medium</span>
        )}
        {task.priority === "low" && (
          <span className="text-green-400 font-medium">✅Low</span>
        )}
      </div>

      <div className="flex flex-wrap">
        <p
          className={`cursor-default truncate ${
            task.isComplete ? "line-through" : "font-bold"
          }`}
          title={task.title}
        >
          {task.title}
        </p>
      </div>

      <div className="text-right">
        <button
          className={`cursor-pointer ${
            task.isComplete
              ? "hover:text-red-500"
              : "underline hover:text-green-500"
          }`}
          onClick={() => onCompleteTask(index)}
        >
          {task.isComplete ? "Completed ✅" : "Complete"}
        </button>
      </div>
    </li>
  );
}
