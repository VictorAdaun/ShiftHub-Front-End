import React from "react";
import Close from "../assets/svgs/close-circle.svg";
import Check from "../assets/svgs/check.svg";


const Icon = ({ name }) => {
  const allIcons = {
    close: Close,
    check: Check
  };

  const DynamicIcon = allIcons[name];

  if (DynamicIcon) {
    return <img src={DynamicIcon} alt={name}/>;
  }

  throw new Error(`Icon '${name}' does not exist`);
};

export default Icon;
