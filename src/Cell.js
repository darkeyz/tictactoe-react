import { useState } from "react";

const Cell = (props) => {
  const [value, setValue] = useState("");
  function check() {
    if (value === "" && props.handlePlay()) {
      setValue(props.state.nextPlayer);
    }
  }
  return (
    <td className="cell" onClick={check}>
      <span className={value !== "" ? "checked" : ""}>{value}</span>
    </td>
  );
};

export default Cell;
