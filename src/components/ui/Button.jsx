import clsx from "clsx";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  type = "button",
  disabled = false,
  className = "",
  ...rest
}) {
  const base = "rounded font-medium hover:opacity-90 transition-colors";

  const variants = {
    primary: "bg-blue-600 text-white",
    secondary: "bg-gray-100 text-gray-800",
    outline: "border border-gray-300 text-gray-800 bg-white",
    danger: "bg-red-600 text-white",
  };

  const sizes = {
    sm: "text-sm px-3 py-1.5",
    md: "text-base px-4 py-2",
    lg: "text-lg px-6 py-3",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={clsx(
        base,
        variants[variant],
        sizes[size],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
