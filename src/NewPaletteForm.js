import React from "react";
import PaletteFormNav from "./PaletteFormNav";
import ColorPickerForm from "./ColorPickerForm";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Button from "@material-ui/core/Button";
import DraggableColorList from "./DraggableColorList";
import { arrayMove } from "react-sortable-hoc";
import useStyles from "./styles/NewPaletteFormStyles";
import seedPalette from "./seedPalette";

function NewPaletteForm(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [colors, setColors] = React.useState(seedPalette[0].colors);

  // componentDidMount() {} --> class component
  // React.useEffect(() => {

  // }) ---> functional component;

  const paletteIsFull = colors.length >= props.maxColors;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const addNewColor = (newColor) => {
    setColors([...colors, newColor]);
  };

  // const handleChange = (evt) => {
  //   // https://stackoverflow.com/questions/54679928/using-dynamic-var-with-set-state-in-react-hooks
  //   const { name, value } = evt.target;
  //   name === "newColorName" ? setNewColorName(value) : setPaletteName(value);
  // }

  const handleSubmit = (newPalette) => {
    newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, "-");
    newPalette.colors = colors;
    props.savePalette(newPalette);
    props.history.push("/");
  };

  const removeColor = (colorName) => {
    let colorRemoved = [...colors].filter((color) => color.name !== colorName);
    setColors(colorRemoved);
  };

  const clearColors = () => {
    setColors([]);
  };

  const addRandomColor = () => {
    // const palettesToChooseFrom = props.palettes.length !== 0 ? props.palettes : seedPalette;
    // const allColors = [].concat( ...palettesToChooseFrom.map( p => p.colors) );
    // // prevent existing color to be used
    // const filteredColors = allColors.filter( color => !colors.includes(color))
    // var rand = Math.floor(Math.random() * allColors.length);
    // var randomColor = filteredColors[rand];
    const allPalettes = [...props.palettes, ...seedPalette];
    const allColors = allPalettes.map((p) => p.colors).flat();
    let isDuplicate = true;
    let rand;
    let randomColor;
    while (isDuplicate) {
      rand = Math.floor(Math.random() * allColors.length);
      randomColor = allColors[rand];
      isDuplicate = colors.some((color) => color.name === randomColor.name);
    }

    setColors([...colors, randomColor]);
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setColors(arrayMove(colors, oldIndex, newIndex));
  };

  return (
    <div className={classes.root}>
      <PaletteFormNav
        open={open}
        palettes={props.palettes}
        handleSubmit={handleSubmit}
        handleDrawerOpen={handleDrawerOpen}
      />
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

        <div className={classes.container}>
          {/* gutterBottom adds margin below component */}
          <Typography variant="h6" gutterBottom>
            Design Your Palette
          </Typography>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="secondary"
              onClick={clearColors}
              className={classes.button}
            >
              Clear Palette
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={addRandomColor}
              disabled={paletteIsFull}
              className={classes.button}
            >
              Random Color
            </Button>
          </div>

          <ColorPickerForm
            paletteIsFull={paletteIsFull}
            addNewColor={addNewColor}
            colors={colors}
          />
        </div>
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
          onSortEnd={onSortEnd}
          distance={10}
        />
      </main>
    </div>
  );
}

NewPaletteForm.defaultProps = {
  maxColors: 20,
};

export default NewPaletteForm;
