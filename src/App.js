import './App.css';

const Cell = () => {
  return (
    <td className="cell"></td>
  )
}

const Row = () => {
  const cells = []
  for (let i = 0; i < 3; i++) {
    cells.push(<Cell />)
  }
  return (
    <tr className="row">
      {cells}
    </tr>
  )
} 
  
function App() {
  const rows = []
  for (let i = 0; i < 3; i++) {
    rows.push(<Row />)
  }
  return (
    <div className="App">
      <table>
        <tbody>
          {rows}
        </tbody> 
      </table> 
    </div>
  );
}

export default App;
