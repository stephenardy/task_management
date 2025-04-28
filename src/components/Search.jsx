export default function Search({ search, onSearch }) {
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
