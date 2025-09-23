export default function Message({ text }) {
    let colorClass = "text-red-600";
    if (text.includes("success")) colorClass = "text-green-600";
    else if (text.includes("Please")) colorClass = "text-yellow-600";
  
    return <p className={`mt-4 font-medium ${colorClass}`}>{text}</p>;
  }
  