export default function CompleteTask({
  filteredTask,
  filterTask,
  filterPriority,
  onClearCompletedTask,
}) {
  const completedTask = filteredTask.filter((task) => task.isComplete === true);

  return (
    <div className="flex justify-between">
      <h2 className="text-lg text-gray-600 font-bold">
        {filterTask === 0 &&
          `Total ${filteredTask.length} ${filterPriority} tasks (${completedTask.length} completed)`}
        {filterTask === 1 &&
          `Total ${filteredTask.length} ${filterPriority} task completed`}
        {filterTask === 2 &&
          `Total ${filteredTask.length} ${filterPriority} task uncomplete`}
      </h2>
      <button
        className="cursor-pointer text-sm text-gray-400 hover:text-gray-800 hover:underline"
        onClick={() => onClearCompletedTask()}
      >
        Clear completed
      </button>
    </div>
  );
}
