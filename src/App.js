import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Palette from './Palette';
import seedPalette from './seedPalette';
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
        render={ () => <h1>Palette List goes here</h1>}/>
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
      
      </Switch>
      // <div className="App">
      //   <Palette palette={generatePalette(seedPalette[4])}/>
      // </div>
    );
  }
  
}

export default App;
