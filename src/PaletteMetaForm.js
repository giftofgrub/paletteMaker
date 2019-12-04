import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

function PaletteMetaForm(props) {
  const [open, setOpen] = React.useState(false);
  const [newPaletteName, setNewPaletteName] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          
          <ValidatorForm onSubmit={() => props.handleSubmit(newPaletteName)}>
            <TextValidator 
              name="newPaletteName"
              label="Palette Name"
              value={newPaletteName}
              onChange={handleChange}
              validators={['required', 'isPaletteNameUnique']}
              errorMessages={['Enter a palette name', 'Palette name already taken']}
              />
            
            <Button 
              variant="contained" 
              color="primary" 
              type="submit">
                Save Palette
            </Button>
            

          </ValidatorForm>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default PaletteMetaForm;