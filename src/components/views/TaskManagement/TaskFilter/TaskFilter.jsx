import clsx from "clsx";

export default function TaskFilter({
  filterTask,
  onFilterTask,
  filterPriority,
  onFilterPriority,
}) {
  const allStatus = ["All Tasks", "Completed", "Uncomplete"];

  return (
    <div className=" sm:flex sm:justify-between my-4 ">
      <ul className="flex flex-wrap gap-4">
        {allStatus.map((status, index) => (
          <li
            key={index}
            className={clsx(
              "cursor-pointer h-fit px-2 py-1 rounded-2xl",
              filterTask === index
                ? "bg-blue-200 text-blue-500 font-semibold"
                : "bg-gray-200"
            )}
            onClick={() => onFilterTask(index)}
          >
            {status}
          </li>
        ))}
      </ul>

      <select
        value={filterPriority}
        className="border-1 rounded px-2 py-1 mt-4 sm:mt-0"
        onChange={(e) => onFilterPriority(e.target.value)}
      >
        <option value="">All Priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
    </div>
  );
}
