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
      className="grid md:grid-rows-2 md:grid-cols-4 lg:grid-rows-1 lg:grid-cols-4 w-full h-auto gap-2"
      onSubmit={(e) => onAddTask(e)}
    >
      {children}
    </form>
  );
}

function Search({ search, onSearch }) {
  return (
    <div className=" md:col-span-full lg:col-span-2">
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
    <div className="md:col-span-2 lg:col-span-1">
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

function ButtonAddTask() {
  return (
    <div className="md:col-span-2 lg:col-span-1 text-white bg-blue-500 rounded hover:bg-blue-800 ">
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
    <div className=" flex justify-between my-4 ">
      <ul className="flex flex-wrap gap-4">
        {allStatus.map((status, index) => (
          <li
            key={index}
            className={`cursor-pointer px-2 py-1 rounded-2xl ${
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
        className="border-1 rounded px-4"
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

function CompleteTask({ taskData, onClearCompletedTask }) {
  const completedTask = taskData.filter((task) => task.isComplete === true);

  return (
    <div className="flex justify-between">
      <h2 className="text-lg text-gray-600 font-bold">
        Total {taskData.length} tasks ({completedTask.length} completed)
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

function TaskList({ taskData, filterTask, filterPriority, onCompleteTask }) {
  const allHigh = taskData.filter((task) => task.priority === "high");
  const allMedium = taskData.filter((task) => task.priority === "medium");
  const allLow = taskData.filter((task) => task.priority === "low");

  const completeAll = taskData.filter((task) => task.isComplete === true);
  const completeHigh = allHigh.filter((task) => task.isComplete === true);
  const completeMedium = allMedium.filter((task) => task.isComplete === true);
  const completeLow = allLow.filter((task) => task.isComplete === true);

  const uncompleteAll = taskData.filter((task) => task.isComplete === false);
  const uncompleteHigh = allHigh.filter((task) => task.isComplete === false);
  const uncompleteMedium = allMedium.filter(
    (task) => task.isComplete === false
  );
  const uncompleteLow = allLow.filter((task) => task.isComplete === false);

  return (
    <>
      {taskData && taskData.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {filterTask === 0
            ? filterPriority === ""
              ? taskData.map((task, index) => (
                  <TaskItem
                    key={index}
                    task={task}
                    index={index}
                    onCompleteTask={onCompleteTask}
                  />
                ))
              : filterPriority === "high"
              ? allHigh.map((task, index) => (
                  <TaskItem
                    key={index}
                    task={task}
                    index={index}
                    onCompleteTask={onCompleteTask}
                  />
                ))
              : filterPriority === "medium"
              ? allMedium.map((task, index) => (
                  <TaskItem
                    key={index}
                    task={task}
                    index={index}
                    onCompleteTask={onCompleteTask}
                  />
                ))
              : filterPriority === "low"
              ? allLow.map((task, index) => (
                  <TaskItem
                    key={index}
                    task={task}
                    index={index}
                    onCompleteTask={onCompleteTask}
                  />
                ))
              : null
            : filterTask === 1
            ? filterPriority === ""
              ? completeAll.map((task, index) => (
                  <TaskItem
                    key={index}
                    task={task}
                    index={index}
                    onCompleteTask={onCompleteTask}
                  />
                ))
              : filterPriority === "high"
              ? completeHigh.map((task, index) => (
                  <TaskItem
                    key={index}
                    task={task}
                    index={index}
                    onCompleteTask={onCompleteTask}
                  />
                ))
              : filterPriority === "medium"
              ? completeMedium.map((task, index) => (
                  <TaskItem
                    key={index}
                    task={task}
                    index={index}
                    onCompleteTask={onCompleteTask}
                  />
                ))
              : filterPriority === "low"
              ? completeLow.map((task, index) => (
                  <TaskItem
                    key={index}
                    task={task}
                    index={index}
                    onCompleteTask={onCompleteTask}
                  />
                ))
              : null
            : filterTask === 2
            ? filterPriority === ""
              ? uncompleteAll.map((task, index) => (
                  <TaskItem
                    key={index}
                    task={task}
                    index={index}
                    onCompleteTask={onCompleteTask}
                  />
                ))
              : filterPriority === "high"
              ? uncompleteHigh.map((task, index) => (
                  <TaskItem
                    key={index}
                    task={task}
                    index={index}
                    onCompleteTask={onCompleteTask}
                  />
                ))
              : filterPriority === "medium"
              ? uncompleteMedium.map((task, index) => (
                  <TaskItem
                    key={index}
                    task={task}
                    index={index}
                    onCompleteTask={onCompleteTask}
                  />
                ))
              : filterPriority === "low"
              ? uncompleteLow.map((task, index) => (
                  <TaskItem
                    key={index}
                    task={task}
                    index={index}
                    onCompleteTask={onCompleteTask}
                  />
                ))
              : null
            : null}
        </ul>
      ) : (
        <NoTask />
      )}
    </>
  );
}

function TaskItem({ task, index, onCompleteTask }) {
  return (
    <li className="p-3 shadow-sm">
      <div className="flex justify-between">
        <span className="text-yellow-500">{task.dueDate}</span>
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
          className={`break-words ${
            task.isComplete ? "line-through" : "font-bold"
          }`}
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

function NoTask() {
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
      <p className="text-center text-gray-500">
        No tasks yet. Please create a task!
      </p>
    </div>
  );
}

function App() {
  const [taskData, setTaskData] = useState([]);
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("");
  const [filterTask, setFilterTask] = useState(0);
  const [filterPriority, setFilterPriority] = useState("");

  function getDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();

    return `${day}-${month}-${year}`;
  }

  function handleAddTask(e) {
    e.preventDefault();

    const newTask = {
      title: search.trim(),
      dueDate: getDate(),
      priority: priority,
      isComplete: false,
    };

    if (search.trim() !== "" && priority !== "") {
      setTaskData((tasks) => [...tasks, newTask]);
      setSearch("");
      setPriority("");
    } else {
      alert("Please input task and choose priority level!");
    }
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

  return (
    <div className="h-screen w-full flex flex-col items-center">
      <Header />
      <BoxTask>
        <BoxTop onAddTask={handleAddTask}>
          <Search search={search} onSearch={setSearch} />
          <Priority priority={priority} onSetPriority={setPriority} />
          <ButtonAddTask />
        </BoxTop>
        <TaskFilter
          filterTask={filterTask}
          onFilterTask={setFilterTask}
          filterPriority={filterPriority}
          onFilterPriority={setFilterPriority}
        />
        <CompleteTask
          taskData={taskData}
          onClearCompletedTask={handleClearCompleteTask}
        />
        <TaskList
          taskData={taskData}
          filterTask={filterTask}
          filterPriority={filterPriority}
          onCompleteTask={toogleCompleteTask}
        />
      </BoxTask>
    </div>
  );
}

export default App;
