export default function DueDate({ dueDate, onSetDueDate }) {
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
