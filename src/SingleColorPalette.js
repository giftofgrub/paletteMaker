import React, { Component } from 'react';
import ColorBox from './ColorBox';

class SingleColorPalette extends Component {
  constructor(props) {
    super(props);
    this.shades = this.gatherShades(this.props.palette, this.props.colorId);
    console.log(this.shades)
  }

  gatherShades(palette,targetColor) {
    //return all shades of a singular color
    let shades = [];
    let allColors = palette.colors;
    for (let key in allColors) {
      shades = [...shades, ...allColors[key].filter( (color) => color.id === targetColor) ]
    }
    return shades.slice(1);
  }

  render() {
    const colorBoxes = this.shades.map( (color) => (
      <ColorBox 
        key={color.id} 
        name={color.name} 
        background={color.hex} 
        showLink={false}/>
    ));
    return (
      <div className="Palette">
        <h1>Single Color Palette</h1>
        <div className="Palette-colors">{colorBoxes}</div>
      </div>
    );
  }
}

export default SingleColorPalette;