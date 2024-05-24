import React from "react";

const colorClasses = {
  red: "bg-red-500",
  green: "bg-green-500",
  blue: "bg-blue-500",
};

function Message({ children, color }) {
  const bgColorClass = colorClasses[color] || "bg-blue-500";

  return (
    <div className={`relative block w-full p-4 mb-4 text-base leading-5 text-white rounded-lg opacity-100 font-regular ${bgColorClass}`}>
      {children}
    </div>
  );
}

export default Message;
