import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Palette from './Palette';
import seedPalette from './seedPalette';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm'
import { generatePalette } from './colorHelpers';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      palettes: seedPalette
    }
    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
  }
  
  findPalette(id) {
    return this.state.palettes.find( (palette) => 
    palette.id === id
    );
  }

  savePalette(newPalette) {
    this.setState({palettes : [...this.state.palettes, newPalette]})
  }
  
  render() {
    return (
      <Switch>
        <Route 
          exact
          path="/palette/new"
          render={(rtProps) => <NewPaletteForm savePalette={this.savePalette} {...rtProps}/>}/>

        
        <Route 
          exact
          path="/palette/:paletteId/:colorId"
          render={ (rtProps) => 
            <SingleColorPalette 
              colorId={rtProps.match.params.colorId}
              palette={
                generatePalette( this.findPalette(rtProps.match.params.paletteId) )
              }
            >  
            </SingleColorPalette>
          }
        />

        <Route 
          exact
          path="/" 
          render={ (rtProps) => 
            <PaletteList palettes={this.state.palettes} {...rtProps}/>
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
        
      
      </Switch>
      // <div className="App">
      //   <Palette palette={generatePalette(seedPalette[4])}/>
      // </div>
    );
  }
  
}

export default App;
