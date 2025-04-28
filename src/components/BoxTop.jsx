export default function BoxTop({ children, onAddTask }) {
  return (
    <form
      className="grid grid-rows-3 grid-cols-2 md:grid-cols-6 w-full h-auto gap-2"
      onSubmit={(e) => onAddTask(e)}
    >
      {children}
    </form>
  );
}
