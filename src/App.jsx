// import { useState } from "react";

// import "./App.css";

import { useState } from "react";

function Header() {
  return (
    <div className="w-full mt-16 mb-8 text-center px-4">
      <h2 className="text-2xl md:text-3xl text-blue-500 font-bold">
        Task Management
      </h2>
      <p className="text-sm text-gray-400">
        Organize your life, one task at a time
      </p>
    </div>
  );
}

function BoxTask({ children }) {
  return <div className="w-4/5 h-auto p-4 bg-white rounded">{children}</div>;
}

function BoxTop({ children, onAddTask }) {
  return (
    <form
      className="grid grid-rows-3 grid-cols-2 md:grid-cols-6 w-full h-auto gap-2"
      onSubmit={(e) => onAddTask(e)}
    >
      {children}
    </form>
  );
}

function Search({ search, onSearch }) {
  return (
    <div className="col-span-full">
      <input
        type="text"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="What needs to be done?"
        className="w-full p-2 border-2 border-gray-100 rounded"
      />
    </div>
  );
}

function Priority({ priority, onSetPriority }) {
  return (
    <div className="col-span-full md:col-span-2">
      <select
        className={`w-full p-2 border-2 border-gray-100 rounded ${
          priority === "" && "text-gray-500"
        }`}
        value={priority}
        onChange={(e) => onSetPriority(e.target.value)}
      >
        <option value="">--Choose Priority--</option>
        <option value="high">High Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="low">Low Priority</option>
      </select>
    </div>
  );
}

function DueDate({ dueDate, onSetDueDate }) {
  return (
    <div className="col-span-1 md:col-span-2" title="select due date">
      <input
        className={`w-full p-2 border-2 border-gray-100 rounded ${
          dueDate === "" && "text-gray-500"
        }`}
        type="date"
        value={dueDate}
        onChange={(e) => onSetDueDate(e.target.value)}
      />
    </div>
  );
}

function DueTime({ dueTime, onSetDueTime }) {
  return (
    <div className="col-span-1 md:col-span-2" title="select due time">
      <input
        className={`w-full p-2 border-2 border-gray-100 rounded ${
          dueTime === "" && "text-gray-500"
        }`}
        type="time"
        value={dueTime}
        onChange={(e) => onSetDueTime(e.target.value)}
      />
    </div>
  );
}

function ButtonAddTask() {
  return (
    <div className="col-span-full text-white bg-blue-500 rounded hover:bg-blue-800 ">
      <button className="w-full py-2 px-4 hover:cursor-pointer">
        + Add Task
      </button>
    </div>
  );
}

function TaskFilter({
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
            className={`cursor-pointer h-fit px-2 py-1 rounded-2xl ${
              filterTask === index
                ? "bg-blue-200 text-blue-500 font-semibold"
                : "bg-gray-200"
            } `}
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

function CompleteTask({
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

function TaskList({
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

function TaskItem({ task, index, onCompleteTask }) {
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

function NoTask({ filteredTask, filterTask, filterPriority }) {
  return (
    <div className="w-full">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-16 w-16 mx-auto text-gray-500"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <path
            d="M11 19.5H21"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M11 12.5H21"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M11 5.5H21"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M3 5.5L4 6.5L7 3.5"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M3 12.5L4 13.5L7 10.5"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M3 19.5L4 20.5L7 17.5"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </g>
      </svg>
      {filteredTask.length === 0 && filterTask === 0 && (
        <p className="text-center text-gray-500">
          No tasks yet. Please create a task!
        </p>
      )}
      {filterTask === 1 && (
        <p className="text-center text-gray-500">
          No task {filterPriority !== "" && `with ${filterPriority} priority`}{" "}
          completed yet
        </p>
      )}
      {filterTask === 2 && (
        <p className="text-center text-gray-500">
          No uncomplete tasks{" "}
          {filterPriority !== "" && `with ${filterPriority} priority`} available
        </p>
      )}
    </div>
  );
}

function App() {
  const [taskData, setTaskData] = useState([]);
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [filterTask, setFilterTask] = useState(0);
  const [filterPriority, setFilterPriority] = useState("");

  function handleDateFormat(dueDate) {
    const splitDate = dueDate.split("-");
    return `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`;
  }

  function handleAddTask(e) {
    e.preventDefault();

    const newTask = {
      title: search.trim(),
      dueDate: handleDateFormat(dueDate),
      dueTime: dueTime,
      priority: priority,
      isComplete: false,
    };

    const TaskCheck = () => {
      if (search.trim() === "") return alert("Please input the task!");
      if (priority === "") return alert("Please choose priority level!");
      if (dueDate === "") return alert("Please select the due date!");
      if (dueTime === "") return alert("Please select the due time!");

      setTaskData((tasks) => [...tasks, newTask]);
      setSearch("");
      setPriority("");
      setDueDate("");
      setDueTime("");
    };

    TaskCheck();
  }

  function handleClearCompleteTask() {
    setTaskData((taskData) =>
      taskData.filter((task) => task.isComplete === false)
    );
  }

  function toogleCompleteTask(taskIndex) {
    setTaskData((currTasks) =>
      currTasks.map((task, index) =>
        index === taskIndex ? { ...task, isComplete: !task.isComplete } : task
      )
    );
  }

  const filteredTask = taskData.filter((task) => {
    if (filterTask === 1 && !task.isComplete) return false;
    if (filterTask === 2 && task.isComplete) return false;
    if (filterPriority && task.priority !== filterPriority) return false;
    return true;
  });

  return (
    <div className="h-screen w-full flex flex-col items-center">
      <Header />
      <BoxTask>
        <BoxTop onAddTask={handleAddTask}>
          <Search search={search} onSearch={setSearch} />
          <Priority priority={priority} onSetPriority={setPriority} />
          <DueDate dueDate={dueDate} onSetDueDate={setDueDate} />
          <DueTime dueTime={dueTime} onSetDueTime={setDueTime} />
          <ButtonAddTask />
        </BoxTop>
        <TaskFilter
          filterTask={filterTask}
          onFilterTask={setFilterTask}
          filterPriority={filterPriority}
          onFilterPriority={setFilterPriority}
        />
        <CompleteTask
          filteredTask={filteredTask}
          filterTask={filterTask}
          filterPriority={filterPriority}
          onClearCompletedTask={handleClearCompleteTask}
        />
        <TaskList
          filterTask={filterTask}
          filterPriority={filterPriority}
          onCompleteTask={toogleCompleteTask}
          filteredTask={filteredTask}
        />
      </BoxTask>
    </div>
  );
}

export default App;
