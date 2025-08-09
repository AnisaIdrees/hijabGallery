import React, { useState } from "react";


export default function ReviewText({ text, limit = 100, className = "" }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!text) return null;

  const toggleText = () => setIsExpanded(!isExpanded);

  return (
    <span
      onClick={toggleText}
      className={`${className} cursor-pointer select-none block`}
    >

      {isExpanded || text.length <= limit ? (
        text
      ) : (
        <>
          {text.slice(0, limit)}
           <span className="text-blue-600"> {" "}  see more...</span>
        </>
      )}

    </span>
  );
}
