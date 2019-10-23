import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import PaletteFooter from './PaletteFooter';
import { withStyles } from '@material-ui/styles';

const styles = {
  Palette: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  colors: {
    height: "90%",
  },
  goBack: {
    height: "50%",
    width: "20%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-3.5px",
    opacity: 1,
    backgroundColor: "black",
    "& a": {
      color: "white",
      width: "100px",
      height: "30px",
      position: "absolute",
      display: "inline-block",
      top: "50%",
      left: "50%", 
      marginLeft: "-50px",
      marginTop: "-15px",
      textAlign: "center",
      outline: "none",
      background: "rgba(255,255,255,0.3)",
      fontSize: "1rem",
      lineHeight: "30px",
      textTransform: "uppercase",
      border: "none",
      textDecoration: "none",
    }
  }
  
}

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