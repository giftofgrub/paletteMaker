import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import PaletteFooter from './PaletteFooter';
import { withStyles } from '@material-ui/styles';

import styles from './styles/PaletteStyles';

class SingleColorPalette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      format: "hex",
    }
    this.changeFormat = this.changeFormat.bind(this);
    this.shades = this.gatherShades(this.props.palette, this.props.colorId);
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

  changeFormat(value) {
    this.setState({ format: value });
  }

  render() {
    const { format } = this.state;
    const { classes } = this.props;
    const { paletteName, emoji, id } = this.props.palette;
    const colorBoxes = this.shades.map( (color) => (
      <ColorBox 
        key={color.name} 
        name={color.name} 
        background={color[format]} 
        showingFullPalette={false}/>
    ));
    return (
      <div className={classes.Palette}>
        <Navbar handleChange={this.changeFormat} singleColor={true}/>
        <div className={classes.colors}>
          {colorBoxes}
          <div className={classes.goBack}>
            <Link to={`/palette/${id}`} className="back-button">Go Back</Link>
          </div>
        </div>
        <PaletteFooter paletteName={paletteName} emoji={emoji}/>
      </div>
    );
  }
}

export default withStyles(styles)(SingleColorPalette);