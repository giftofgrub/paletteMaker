import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

function PaletteMetaForm(props) {
  const [open, setOpen] = React.useState(true);
  const [newPaletteName, setNewPaletteName] = React.useState("");
  const { handleSubmit, hideForm } = props;

  const handleClose = () => {
    hideForm();
  };

  const handleChange = (evt) => {
    //   // https://stackoverflow.com/questions/54679928/using-dynamic-var-with-set-state-in-react-hooks
      const { value } = evt.target;
      setNewPaletteName(value);
  }

  React.useEffect( () => {
    ValidatorForm.addValidationRule("isPaletteNameUnique", value => {
      return props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      );
    });
  })

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Enter Palette Name</DialogTitle>
        <ValidatorForm onSubmit={() => handleSubmit(newPaletteName)}>
          <DialogContent>
            <DialogContentText>
              Please enter a name for your new palette. Make sure the name is unique!
            </DialogContentText>

            <Picker />

            <TextValidator 
              name="newPaletteName"
              label="Palette Name"
              fullWidth
              margin="normal"
              value={newPaletteName}
              onChange={handleChange}
              validators={['required', 'isPaletteNameUnique']}
              errorMessages={['Enter a palette name', 'Palette name already taken']}
              />
              
          </DialogContent>
          
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button 
              variant="contained" 
              color="primary" 
              type="submit">
                Save Palette
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </div>
  );
}

export default PaletteMetaForm;