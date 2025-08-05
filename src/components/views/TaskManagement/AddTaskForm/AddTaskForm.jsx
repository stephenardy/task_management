import clsx from "clsx";
import Button from "../../../ui/Button";
import Input from "../../../ui/Input";
import Loading from "../../../ui/Loading";

export default function AddTaskForm({
  onAddTask,
  formData,
  setFormData,
  isLoading,
}) {
  const { title, priority, dueDate, dueTime } = formData;

  const handleTitle = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePriority = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDueDate = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDueTime = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form
      className="grid grid-rows-3 grid-cols-2 md:grid-cols-6 w-full h-auto gap-2"
      onSubmit={(e) => onAddTask(e)}
    >
      <div className="col-span-full">
        <Input
          name="title"
          value={title}
          onChange={handleTitle}
          placeholder="What needs to be done?"
        />
      </div>

      <div className="col-span-full md:col-span-2">
        <select
          name="priority"
          className={clsx(
            "w-full p-2 border-2 border-gray-100 rounded",
            !priority && "text-gray-500"
          )}
          value={priority}
          onChange={handlePriority}
        >
          <option value="">--Choose Priority--</option>
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>
      </div>

      <div className="col-span-1 md:col-span-2" title="select due date">
        <Input
          name="dueDate"
          className={clsx(!dueDate && "text-gray-500")}
          type="date"
          value={dueDate}
          onChange={handleDueDate}
        />
      </div>

      <div className="col-span-1 md:col-span-2" title="select due time">
        <Input
          name="dueTime"
          className={clsx(!dueTime && "text-gray-500")}
          type="time"
          value={dueTime}
          onChange={handleDueTime}
        />
      </div>

      <div className="col-span-full">
        <Button
          type="submit"
          variant="primary"
          size="md"
          className="w-full cursor-pointer"
        >
          {isLoading ? <Loading color="white" /> : "+ Add Task"}
        </Button>
      </div>
    </form>
  );
}
