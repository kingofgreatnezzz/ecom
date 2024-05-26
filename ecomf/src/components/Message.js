import React, { useState, useEffect } from "react";

const colorClasses = {
  red: "bg-red-500",
  green: "bg-green-500",
  blue: "bg-blue-500",
};

function Message({ children, color }) {
  const [visible, setVisible] = useState(true);
  const bgColorClass = colorClasses[color] || "bg-blue-500";

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 4000); // Hide message after 4 seconds

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  if (!visible) return null;

  return (
    <div className={`relative block w-full p-3 mb-4 text-base leading-5 text-white rounded-lg opacity-100 font-regular ${bgColorClass}`}>
      {children}
    </div>
  );
}

export default Message;
