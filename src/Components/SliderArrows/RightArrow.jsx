import React, { useState } from "react";
import { BsArrowRightCircleFill } from "react-icons/bs";

const RightArrow = ({ className, style, onClick }) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <BsArrowRightCircleFill
      className={className}
      style={{
        ...style,
        display: "block",
        color: "black",
        width: "2rem",
        height: "2rem",
        right: "45px",
        zIndex: "2",
        ...(isFocused
          ? { width: "1.8rem", height: "1.8rem", opacity: ".6" }
          : { width: "2rem", height: "2rem" }),
      }}
      onClick={onClick}
      onMouseDown={() => setIsFocused(true)}
      onMouseUp={() => setIsFocused(false)}
    />
  );
};

export default RightArrow;
