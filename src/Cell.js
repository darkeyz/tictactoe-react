const Cell = (props) => {
  return (
    <td className="cell" onClick={props.handlePlay}>
      <span className={props.value !== "" ? "checked" : ""}>{props.value}</span>
    </td>
  );
};

export default Cell;
