import React from 'react';
import PaletteFormNav from './PaletteFormNav';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { ChromePicker } from 'react-color';
import DraggableColorList from './DraggableColorList';
import { arrayMove } from 'react-sortable-hoc';

const drawerWidth = 400;
const maxColors = 20;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    height: "calc(58vh - 64px)",
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

function NewPaletteForm(props) {
  
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [currentColor, setCurrentColor] = React.useState("teal");
  const [colors, setColors] = React.useState(props.palettes[0].colors);
  const [newColorName, setNewColorName] = React.useState("");
  const [newPaletteName, setPaletteName] = React.useState("");
  
  React.useEffect(() => {
    ValidatorForm.addValidationRule("isColorNameUnique", value => {
      return colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      );
    });
    ValidatorForm.addValidationRule("isColorUnique", value => {
      return colors.every(
        ({ color }) => color !== currentColor
      );
    });
  });

  const paletteIsFull = colors.length >= props.maxColors;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const updateCurrentColor = (newColor) => {
    setCurrentColor(newColor.hex);
  }

  const addNewColor = () => {
    const newColor = {
      color: currentColor,
      name: newColorName
    }
    setColors([...colors, newColor]);
    setNewColorName("");
  }

  const handleChange = (evt) => {
    // https://stackoverflow.com/questions/54679928/using-dynamic-var-with-set-state-in-react-hooks
    const { name, value } = evt.target;
    name === "newColorName" ? setNewColorName(value) : setPaletteName(value);
  }

  const handleSubmit = (newPaletteName) => {
    const newPalette = {
      paletteName: newPaletteName,
      id: newPaletteName.toLowerCase().replace(/ /g, "-"),
      colors: colors
    };
    props.savePalette(newPalette);
    props.history.push("/")
  }

  const removeColor = (colorName) => {
    let colorRemoved = [...colors].filter(color => color.name !== colorName);
    setColors(colorRemoved);
  }

  const clearColors = () => {
    setColors([]);
  }

  const addRandomColor = () => {
    const allColors = [].concat( ...props.palettes.map( p => p.colors) );
    // prevent existing color to be used
    const filteredColors = allColors.filter( color => !colors.includes(color))
    var rand = Math.floor(Math.random() * allColors.length) ;
    var randomColor = filteredColors[rand];
    setColors([...colors, randomColor]);
  }

  const onSortEnd = ({oldIndex, newIndex}) => {
    setColors( arrayMove(colors, oldIndex, newIndex) );
  }

  return (
    <div className={classes.root}>
      <PaletteFormNav 
        open={open} 
        classes={classes} 
        palettes={props.palettes}
        handleSubmit={handleSubmit}
        handleDrawerOpen={handleDrawerOpen}/>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <Typography variant="h4">
          Design Your Palette
        </Typography>
        <div>
          <Button 
            variant="contained" 
            color="secondary"
            onClick={clearColors}>Clear Palette</Button>
          <Button 
            variant="contained" 
            color="primary"
            onClick={addRandomColor}
            disabled={paletteIsFull}>Random Color</Button>
        </div>
        
        <ChromePicker color={currentColor} onChangeComplete={updateCurrentColor}/>
        <ValidatorForm onSubmit={addNewColor}>
          <TextValidator
            name="newColorName" 
            value={newColorName} 
            onChange={handleChange}
            validators={['required', 'isColorNameUnique', 'isColorUnique']}
            errorMessages={['Enter a color name', 'Color name must be unique', 'Color must be unique']}/>
          <Button 
            variant="contained" 
            color="primary" 
            style={{backgroundColor: paletteIsFull ? "grey" : currentColor}}
            type="submit"
            disabled={paletteIsFull}
          >
              {paletteIsFull ? "Palette Full" : "Add Color"}
          </Button>
        </ValidatorForm>
        
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <DraggableColorList 
          colors={colors} 
          removeColor={removeColor}
          axis="xy"
          onSortEnd={onSortEnd}/>
      </main>
    </div>
  );
}

NewPaletteForm.defaultProps = {
  maxColors,
}

export default NewPaletteForm;