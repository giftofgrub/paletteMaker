import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import { SortableElement } from 'react-sortable-hoc';
const styles = {
  root: {
    height: props => props.showingFullPalette ? "25%" : "50%",
    width: "20%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-3.5px",
    "&:hover svg": {
      color: "white",
      transform: "scale(1.5)"
    }
  },
  boxContent: {
    position: "absolute",
    width: "100%",
    left: "0px",
    bottom: "0px",
    color: "rgba(0, 0, 0, 0.5)",
    padding: "10px",
    textTransform: "uppercase",
    fontSize: "12px",
    display: "flex",
    justifyContent: "space-between",
  },
  deleteIcon: {
    color: "rgba(0, 0, 0, 0.5)",
    transition: "all 0.3s ease-in-out"
  },
}

function DraggableColorBox(props) {
  const {classes, handleClick, name, color} = props;
  return (
    <div 
      style={{backgroundColor: color}}
      className={classes.root}>
      
      <div className={classes.boxContent}>
        <span>{name}</span>
        <DeleteForeverOutlinedIcon 
          className={classes.deleteIcon}
          onClick={handleClick}
        />
      </div>
    </div>
  );
}

export default withStyles(styles)(SortableElement(DraggableColorBox));
