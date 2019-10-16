import React from 'react';
import Palette from './Palette';
import seedPalette from './seedPalette'

function App() {
  return (
    <div className="App">
      <Palette {...seedPalette[4]}/>
    </div>
  );
}

export default App;
