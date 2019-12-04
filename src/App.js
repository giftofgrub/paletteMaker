import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Palette from './Palette';
import seedPalette from './seedPalette';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm'
import { generatePalette } from './colorHelpers';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import "./App.css"

class App extends Component {
  constructor(props) {
    super(props);
    const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
    this.state = {
      palettes: savedPalettes || seedPalette
    }
    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
  }
  
  findPalette(id) {
    return this.state.palettes.find( (palette) => 
    palette.id === id
    );
  }

  deletePalette(id) {
    this.setState(st => (
      { palettes : st.palettes.filter( palette => palette.id !== id)}),
      this.syncLocalStorage
    );
  }

  savePalette(newPalette) {
    this.setState(
      { palettes : [...this.state.palettes, newPalette] },
      this.syncLocalStorage
    );
  }

  syncLocalStorage() {
    window.localStorage.setItem(
      "palettes", 
      JSON.stringify(this.state.palettes)
    );
  }
  
  render() {
    return (
      // for animating route transition
      <Route render={({location}) => (
        <TransitionGroup>
          <CSSTransition key={location.key} classNames='fade' timeout={500}>
            <Switch location={location}>
              <Route 
                exact
                path="/palette/new"
                render={(rtProps) => 
                  <div className='page'>
                    <NewPaletteForm 
                      savePalette={this.savePalette} 
                      palettes={this.state.palettes}
                      {...rtProps}
                    />
                  </div>
                }/>
              
              <Route 
                exact
                path="/palette/:paletteId/:colorId"
                render={ (rtProps) => 
                  <div className='page'>
                    <SingleColorPalette 
                      colorId={rtProps.match.params.colorId}
                      palette={
                        generatePalette( this.findPalette(rtProps.match.params.paletteId) )
                      }
                    >  
                    </SingleColorPalette>
                  </div>
                }
              />

              <Route 
                exact
                path="/" 
                render={ (rtProps) => 
                  <div className='page'>
                    <PaletteList 
                      palettes={this.state.palettes} 
                      deletePalette={this.deletePalette}
                      {...rtProps}/>
                  </div>
                }
              />

              <Route 
                exact 
                path="/palette/:id" 
                render={ (rtProps) => 
                  <div className='page'>
                    <Palette 
                      palette={
                        generatePalette( this.findPalette(rtProps.match.params.id) )
                      }
                    />  
                  </div>
                }/>
              
            
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )}/>
    );
  }
  
}

export default App;
