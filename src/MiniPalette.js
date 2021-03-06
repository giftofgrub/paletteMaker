import React from 'react';
import { withStyles } from '@material-ui/styles';
import styles from './styles/MiniPaletteStyles';
import DeleteIconButton from '@material-ui/icons/Delete';


function MiniPalette(props) {
  const { classes, paletteName, emoji, colors, handleClick, id, openDialog } = props;
  const miniColorBoxes = colors.map( (color) => (
    <div className={ classes.miniColor }
      style={{backgroundColor: color.color}}
      key={color.name}
    >
    </div>
  ));

  const deletePalette = (evt) => {
    evt.stopPropagation();
    openDialog(id);
  }

  return (
    <div className={ classes.root } onClick={handleClick}>
      
      <DeleteIconButton 
        className={classes.deleteIcon} 
        style={{transition: "all 0.3s ease-in-out"}}
        onClick={deletePalette}
      />

      <div className={ classes.colors }>
        {/* mini color boxes */}
        {miniColorBoxes}
      </div>
      <h5 className={ classes.title }>{paletteName}<span className={ classes.emoji }>{emoji}</span></h5>
    </div>
  );
}

export default withStyles(styles)(MiniPalette);