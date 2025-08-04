export default function Input(props) {
  const {
    type = "text",
    placeholder = "",
    className = "",
    name,
    id,
    value,
    onChange,
    disabled,
    required,
    ...rest
  } = props;

  return (
    <input
      type={type}
      name={name}
      id={id || name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      required={required}
      className={`
        w-full p-2 rounded border-2 border-gray-200
        focus:outline-none focus:ring-2 focus:ring-blue-500
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      {...rest}
    />
  );
}
