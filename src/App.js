import React, { Component } from 'react';
import Palette from './Palette';
import seedPalette from './seedPalette';
import { generatePalette } from './colorHelpers';

class App extends Component {
  render() {
    console.log(generatePalette(seedPalette[4]));
    return (
      <div className="App">
        <Palette {...seedPalette[4]}/>
      </div>
    );
  }
  
}

export default App;
