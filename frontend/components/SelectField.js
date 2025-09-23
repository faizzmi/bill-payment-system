export default function SelectField({ label, name, value, onChange, options }) {
    return (
      <label className="block w-full">
        <span className="text-gray-700">{label}</span>
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </label>
    );
  }
  