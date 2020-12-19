import { useState } from 'react';
import './App.css';
import Grid from './Grid';
  
function App() {
  const [dimension] = useState(3)
  /*
  async function changeDimension(e) {
    await setDimension(e.target.value)
    console.log(dimension)
  } */
  return (
    <div className="App">
      {/* // ToDo */}
      {/* <select onChange={(e) => changeDimension(e)} value={dimension}>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
      </select> */}
       <Grid dimension={dimension} />
    </div>
  );
}

export default App;
