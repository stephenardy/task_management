import { useState } from "react";
import Header from "./components/Header";
import BoxTask from "./components/BoxTask";
import BoxTop from "./components/BoxTop";
import Search from "./components/Search";
import Priority from "./components/Priority";
import DueDate from "./components/DueDate";
import DueTime from "./components/DueTime";
import TaskFilter from "./components/TaskFilter";
import CompleteTask from "./components/CompleteTask";
import TaskList from "./components/TaskList";
import ButtonAddTask from "./components/ButtonAddTask";

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
