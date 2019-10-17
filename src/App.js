import React, { Component } from 'react';
import Palette from './Palette';
import seedPalette from './seedPalette';
import { generatePalette } from './colorHelpers';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Palette palette={generatePalette(seedPalette[4])}/>
      </div>
    );
  }
  
}

export default App;
