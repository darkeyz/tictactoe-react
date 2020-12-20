import { useState } from "react";

const { default: Cell } = require("./Cell");

const Grid = (props) => {
  const CIRCLE = 'O'
  const CROSS = 'X'
  const intialParams = {
    dimension: props.dimension,
    nextPlayer: CROSS,
  };
  const [state, setState] = useState(intialParams);
  const [grid, setGrid] = useState(drawGrid);

  async function handlePlay(i, j) {
    if (grid[i][j] || foundWinner() || draw()) {
      return false
    } 
    else if(!foundWinner()) {
      const grid_clone = grid.slice()
      grid_clone[i][j] = state.nextPlayer
      await setGrid(grid_clone)
      await setState({...state, nextPlayer: state.nextPlayer === CIRCLE ? CROSS : CIRCLE})
      // console.log(grid)
      return foundWinner()
    }
    return false
  }

  // Check if all cell values are equal 
  const winCondition = (cells) => cells.every((cell) => cell && cell === cells[0])

  function foundWinner() {
    // Build rows values array
    const rows = () => grid.some((row) => winCondition(row))

    // Build columns values array
    const columns = () => {
      return grid.some((row, i) => {
        let columns = []
        for (let j = 0; j < grid.length; j++) {
          columns.push(grid[j][i])
        }
        return winCondition(columns)
      })
    };

    // Build diagonal values array
    const diagonals = () => {
      const first_diagonal = () => grid.map((row, index) => grid[index][index])
      // making a row inversion to make it work with the win function
      const grid_clone = grid.slice()
      const second_diagonal = () => grid_clone.reverse().map((row, index) => grid_clone[index][index])
      return winCondition(first_diagonal()) || winCondition(second_diagonal())
    };

    return rows() || columns() || diagonals()
  }

  function draw() {
    return !foundWinner() && grid.every((row) => {
      return row.every((cell) => {
        return cell
      })
    })
  }

  function gameEnd() {
    return draw() || foundWinner();
  }

  function info() {
    return draw()
      ? "DRAW"
      : foundWinner()
      ? `WINNER ${state.nextPlayer === CIRCLE ? CROSS : CIRCLE}`
      : "";
  }

  function drawGrid() {
    let rows = [];
    for (let i = 0; i < state.dimension; i++) {
      rows[i] = [];
      for (let j = 0; j < state.dimension; j++) {
        rows[i].push(null);
      }
    }
    return rows;
  }

  async function restart() {
    if (gameEnd()) {
      const newGrid = drawGrid()
      await setGrid(newGrid)
      setState(intialParams)
    }
  }

  return (
    <div className='wrapper'>
      <div className={gameEnd() ? "info" : "info-hidden"}>{info()}</div>
      <table>
        <tbody>
          {grid.map((row, i) => {
            return (
              <tr key={i}>
                {row.map((cell, j) => {
                  return (
                    <Cell
                      key={`${i}-${j}`}
                      value={grid[i][j]}
                      state={state}
                      handlePlay={() => handlePlay(i, j)}
                    />
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {(
        <div className={gameEnd() ? "btn show" : "btn"} onClick={() => restart()}>
          Restart
        </div>
      )}
    </div>
  );
};

export default Grid;