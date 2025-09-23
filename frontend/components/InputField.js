export default function InputField({ label, type, name, value, onChange, placeholder }) {
    return (
      <label className="block w-full">
        <span className="text-gray-700">{label}</span>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </label>
    );
  }
  