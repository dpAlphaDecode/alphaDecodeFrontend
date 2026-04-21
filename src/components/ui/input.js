export const Input = ({ type = "text", placeholder, value, onChange, className }) => {
    return (
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`border border-gray-300 rounded-md p-2 w-full ${className}`}
      />
    );
  };