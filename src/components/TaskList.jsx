import NoTask from "./NoTask";
import TaskItem from "./TaskItem";

export default function TaskList({
  filterTask,
  filterPriority,
  onCompleteTask,
  filteredTask,
}) {
  return (
    <>
      {filteredTask && filteredTask.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {filteredTask.map((task, index) => (
            <TaskItem
              key={index}
              task={task}
              index={index}
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
