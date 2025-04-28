export default function Priority({ priority, onSetPriority }) {
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
