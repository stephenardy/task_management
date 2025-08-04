import NoTask from "../../../fragments/TaskManagement/NoTask";
import Button from "../../../ui/Button";
import TaskCard from "./TaskCard";

export default function TasksList({
  filterTask,
  filterPriority,
  onCompleteTask,
  filteredTask,
  onClearCompletedTask,
}) {
  const completedTask = filteredTask.filter((task) => task.isComplete === true);

  const renderHeader = () => {
    if (filterTask === 0) {
      return `Total ${filteredTask.length} ${filterPriority} tasks (${completedTask.length} completed)`;
    }
    if (filterTask === 1) {
      return `Total ${filteredTask.length} ${filterPriority} task completed`;
    }
    if (filterTask === 2) {
      return `Total ${filteredTask.length} ${filterPriority} task uncomplete`;
    }
  };

  const header = renderHeader();

  return (
    <>
      {/* Header */}
      <div className="flex justify-between">
        <h2 className="text-lg text-gray-600 font-bold">{header}</h2>

        <Button
          variant="outline"
          size="sm"
          className="cursor-pointer hover:underline border-0"
          onClick={() => onClearCompletedTask()}
        >
          Clear completed
        </Button>
      </div>

      {/* Content */}
      {filteredTask && filteredTask.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {filteredTask.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onCompleteTask={onCompleteTask}
            />
          ))}
        </ul>
      ) : (
        <NoTask
          filteredTask={filteredTask}
          filterTask={filterTask}
          filterPriority={filterPriority}
        />
      )}
    </>
  );
}
