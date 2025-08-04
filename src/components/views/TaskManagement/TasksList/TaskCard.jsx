import clsx from "clsx";
import Button from "../../../ui/Button";

export default function TaskCard({ task, key, onCompleteTask }) {
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${day}-${month}-${year}`;
  };

  const getTodayDate = () => formatDate(new Date());
  const getTommorowDate = () => formatDate(new Date(Date.now() + 86400000)); // 1 day in ms
  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    return `${hours}:${minutes}`;
  };

  const renderDueStatus = () => {
    const today = getTodayDate();
    const tommorow = getTommorowDate();
    const now = getCurrentTime();

    if (
      task.dueDate < today ||
      (task.dueDate === today && task.dueTime < now)
    ) {
      return <span className="text-red-500">Outdated</span>;
    }

    if (task.dueDate === today && task.dueTime >= now) {
      return <span className="text-yellow-500">Today, {task.dueTime}</span>;
    }

    if (task.dueDate === tommorow) {
      return <span className="text-blue-500">Tomorrow, {task.dueTime}</span>;
    }

    return <span className="text-blue-500">{task.dueDate}</span>;
  };

  const renderPriority = {
    high: <span className="text-red-400 font-medium">⚠️High</span>,
    medium: <span className="text-blue-400 font-medium">ℹ️Medium</span>,
    low: <span className="text-green-400 font-medium">✅Low</span>,
  };

  const taskStatus = renderDueStatus();

  return (
    <li key={key} className="p-3 shadow-sm">
      <div className="flex justify-between">
        {taskStatus}
        {renderPriority[task.priority]}
      </div>

      <div className="flex flex-wrap">
        <p
          className={clsx(
            "truncate text-base font-medium cursor-default",
            task.isComplete ? "line-through text-gray-500" : "text-gray-800"
          )}
          title={task.title}
        >
          {task.title}
        </p>
      </div>

      <div className="text-right">
        <Button
          variant="outline"
          className={clsx(
            "cursor-pointer border-0",
            task.isComplete
              ? "hover:text-red-500"
              : "underline hover:text-green-500"
          )}
          onClick={() => onCompleteTask(task.id)}
        >
          {task.isComplete ? "Finished ✅" : "Finish Task"}
        </Button>
      </div>
    </li>
  );
}
