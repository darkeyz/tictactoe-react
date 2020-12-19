import { useState } from "react";

const { default: Cell } = require("./Cell");

const Grid = (props) => {
  const initialState = {
    message: "",
    dimension: props.dimension,
    cells: Array(props.dimension * props.dimension).fill(null),
    nextPlayer: "X",
  };
  const [state, setState] = useState(initialState);

  function handlePlay(i) {
    if (findWinner().found || state.cells[i]) {
      return false;
    }
    const cloned_cells = state.cells.slice();
    cloned_cells[i] = !cloned_cells[i] ? state.nextPlayer : cloned_cells[i];
    setState(
      state.nextPlayer === "X"
        ? { ...state, cells: cloned_cells, nextPlayer: "O" }
        : { ...state, cells: cloned_cells, nextPlayer: "X" }
    );
    if (draw()) {
      return false;
    }
    return true;
  }

  function findWinner() {
    const rows = () => {
      const output = [];
      for (let i = 0; i < state.cells.length; i += state.dimension) {
        const row = [];
        for (let j = i; j < i + state.dimension; j++) {
          row.push(j);
        }
        output.push(row);
      }
      return output;
    };
    const columns = () => {
      const output = [];
      for (let i = 0; i < state.dimension; i++) {
        const column = [];
        for (let j = i; j < state.cells.length; j += state.dimension) {
          column.push(j);
        }
        output.push(column);
      }
      return output;
    };
    const diagonals = () => {
      const output = [[], []];
      const step = parseInt(state.dimension + state.dimension / 2);
      const stepInvert = parseInt(state.dimension / 2 + 1);
      for (let i = 0; i < state.cells.length; i += step) {
        output[0].push(i);
      }
      for (
        let i = state.dimension - 1;
        i < state.cells.length - 1;
        i += stepInvert
      ) {
        output[1].push(i);
      }
      return output;
    };
    const winCombos = rows().concat(columns()).concat(diagonals());
    const found = winCombos.some((set) => {
      return set.every(
        (val) => {
          return state.cells[val] && state.cells[val] === state.cells[set[0]]
        }
      );
    });
    const winner = winCombos.find((set) => {
      return set.every(
        (val) => {
          return state.cells[val] && state.cells[val] === state.cells[set[0]]
        }
      );
    });
    if (typeof winner !== "undefined") {
      return {found, winner: state.cells[winner[0]]};
    }
    return {found, winner: ""};
  }


  function draw() {
    const draw = state.cells.every((val) => val != null);
    if (draw) {
      console.log("draw");
    }
    return draw;
  }

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <Cell
              value={state.cells[0]}
              state={state}
              handlePlay={() => handlePlay(0)}
            />
            <Cell
              value={state.cells[1]}
              state={state}
              handlePlay={() => handlePlay(1)}
            />
            <Cell
              value={state.cells[2]}
              state={state}
              handlePlay={() => handlePlay(2)}
            />
          </tr>
          <tr>
            <Cell
              value={state.cells[3]}
              state={state}
              handlePlay={() => handlePlay(3)}
            />
            <Cell
              value={state.cells[4]}
              state={state}
              handlePlay={() => handlePlay(4)}
            />
            <Cell
              value={state.cells[5]}
              state={state}
              handlePlay={() => handlePlay(5)}
            />
          </tr>
          <tr>
            <Cell
              value={state.cells[6]}
              state={state}
              handlePlay={() => handlePlay(6)}
            />
            <Cell
              value={state.cells[7]}
              state={state}
              handlePlay={() => handlePlay(7)}
            />
            <Cell
              value={state.cells[8]}
              state={state}
              handlePlay={() => handlePlay(8)}
            />
          </tr>
        </tbody>
      </table>
      <div className={draw() || findWinner().found ? "info" : "info-hidden"}>{draw() ? "DRAW" : findWinner().found ? `WINNER ${findWinner().winner}` : ""}</div>
    </div>
  );
};

export default Grid;
