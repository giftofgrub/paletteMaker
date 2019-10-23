import React from 'react';
import {withStyles} from '@material-ui/core/styles';
const styles = {
  root: {
    height: props => props.showingFullPalette ? "25%" : "50%",
    width: "20%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-3.5px",
    "&:hover button": {
      opacity: "1",
    }
  }
}

function DraggableColorBox(props) {
  return (
    <div 
      style={{backgroundColor: props.color}}
      className={props.classes.root}>
      {props.color}
    </div>
  );
}

export default withStyles(styles)(DraggableColorBox);
