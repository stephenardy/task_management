export default function DueTime({ dueTime, onSetDueTime }) {
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
