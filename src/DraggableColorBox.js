import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import { SortableElement } from 'react-sortable-hoc';
import styles from './styles/DraggableColorBoxStyles';

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
