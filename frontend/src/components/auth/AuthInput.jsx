export default function AuthInput({ type = "text", placeholder, label, id }) {
    return (
      <div className="w-full">
        {/* Label */}
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
        )}
  
        {/* Input */}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring focus:ring-[#162D3A]"
        />
      </div>
    );
  }
  