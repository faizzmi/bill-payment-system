export default function Card({ children }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow duration-200">
      <div className="space-y-2 text-gray-800">{children}</div>
    </div>
  );
}
