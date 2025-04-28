export default function NoTask({ filteredTask, filterTask, filterPriority }) {
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
