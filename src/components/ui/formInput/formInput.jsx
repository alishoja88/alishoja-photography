"use client";

const FormInput = ({ type = "text", name, value, onChange, placeholder, required = false , autoComplete = "off"  }) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      autoComplete={autoComplete}
      className="w-full px-4 py-3 rounded-lg bg-gray-700/50 border border-white/20 
                 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
    />
  );
};

export default FormInput;
