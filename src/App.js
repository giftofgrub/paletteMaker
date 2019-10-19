import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Palette from './Palette';
import seedPalette from './seedPalette';
import PaletteList from './PaletteList';
import { generatePalette } from './colorHelpers';

class App extends Component {
  findPalette(id) {
    return seedPalette.find( (palette) => 
    palette.id === id
    );
  }
  
  render() {
    return (
      <Switch>
        <Route 
          exact
          path="/" 
          render={ (rtProps) => 
            <PaletteList palettes={seedPalette} {...rtProps}/>
          }
        />
        <Route 
          exact 
          path="/palette/:id" 
          render={ (rtProps) => 
            <Palette 
              palette={
                generatePalette( this.findPalette(rtProps.match.params.id) )
              }
            >  
            </Palette>
          }/>
        <Route 
          exact
          path="/palette/:paletteId/:colorId"
          render={ () => <h1>Single Color</h1>}>
          
        </Route>
      
      </Switch>
      // <div className="App">
      //   <Palette palette={generatePalette(seedPalette[4])}/>
      // </div>
    );
  }
  
}

export default App;
