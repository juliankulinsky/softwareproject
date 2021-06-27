{/*import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import {StudooAPI, PersonBO, LernvorliebeBO} from '../../api';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';

/**
 * Form which displays the Lernvorlieben of the current Person in Textfields and allows to edit the given information.
 *
class ProfilLernvorliebenForm extends Component {

  constructor(props) {
    super(props);

    /**
     * Init empty variable and set Lernvorliebe values of the given Person
     *
    let lt = 0, fq = 0, ex = 0, rp = 0, vk = '', li = '';
    if (props.lernvorliebe) {
      lt = props.lernvorliebe.get_lerntyp();
      fq = props.lernvorliebe.get_frequenz();
      ex = props.lernvorliebe.get_extrovertiertheit();
      rp = props.lernvorliebe.get_remote_praesenz();
      vk = props.lernvorliebe.get_vorkenntnisse();
      li = props.lernvorliebe.get_lerninteressen();
    }

    // Init the state
    this.state = {
      lerntyp: lt,
      lerntypValidationFailed: false,
      lerntypEdited: false,
      frequenz: fq,
      frequenzValidationFailed: false,
      frequenzEdited: false,
      extrovertiertheit: ex,
      extrovertiertheitValidationFailed: false,
      extrovertiertheitEdited: false,
      remote : rp,
      remoteValidationFailed: false,
      remoteEdited: false,
      vorkenntnisse: vk,
      vorkenntnisseValidationFailed: false,
      vorkenntnisseEdited: false,
      lerninteressen: li,
      lerninteressenValidationFailed: false,
      lerninteressenEdited: false,
      addingInProgress: false,
      updatingInProgress: false,
      addingError: null,
      updatingError: null
    };
    // save this state for canceling
    this.baseState = this.state;
  }

  /** Updates the Lernvorliebe
  updateLernvorliebe = () => {
    // clone the Person, in case the backend call fails
    let updatedLernvorliebe = Object.assign(new LernvorliebeBO(), this.props.lernvorliebe);
    // set new attributes from Textfields
    updatedLernvorliebe.set_lerntyp(parseInt(this.state.lerntyp));
    updatedLernvorliebe.set_frequenz(parseInt(this.state.frequenz));
    updatedLernvorliebe.set_extrovertiertheit(parseInt(this.state.extrovertiertheit));
    updatedLernvorliebe.set_remote_praesenz(parseInt(this.state.remote));
    updatedLernvorliebe.set_vorkenntnisse(this.state.vorkenntnisse);
    updatedLernvorliebe.set_lerninteressen(this.state.lerninteressen);
    StudooAPI.getAPI().updateLernvorliebe(updatedLernvorliebe).then(lernvorliebe => {
      this.setState({
        updatingInProgress: false,              // disable loading indicator
        updatingError: null                     // no error message
      });
      // keep the new state as base state
      this.baseState.lerntyp = this.state.lerntyp;
      this.baseState.frequenz = this.state.frequenz;
      this.baseState.extrovertiertheit = this.state.extrovertiertheit;
      this.baseState.remote = this.state.remote;
      this.baseState.vorkenntnisse = this.state.vorkenntnisse;
      this.baseState.lerninteressen = this.state.lerninteressen;
      this.props.onClose(updatedLernvorliebe);      // call the parent with the new customer
    }).catch(e =>
        this.setState({
          updatingInProgress: false,              // disable loading indicator
          updatingError: e                        // show error message
        })
    );
    // set loading to true
    this.setState({
      updatingInProgress: true,                 // show loading indicator
      updatingError: null                       // disable error message
    });
  }

  /** Handles value changes of the forms textfields and validates them
  textFieldValueChange = (event) => {
    const value = event.target.value;

    let error = false;
    if (value.trim().length === 0) {
      error = true;
    }

    this.setState({
      [event.target.id]: event.target.value,
      [event.target.id + 'ValidationFailed']: error,
      [event.target.id + 'Edited']: true
    });
  }

  /** Handles the close / cancel button click event
  handleClose = () => {
    // Reset the state
    this.setState(this.baseState);
    this.props.onClose(null);
  }

  /** Renders the component
  render() {
    const { classes, lernvorliebe, show } = this.props;
    const { lerntyp, lerntypValidationFailed, lerntypEdited, frequenz, frequenzValidationFailed, frequenzEdited,
      extrovertiertheit, extrovertiertheitValidationFailed, extrovertiertheitEdited, remote, remoteValidationFailed,
      remoteEdited, vorkenntnisse, vorkenntnisseValidationFailed, vorkenntnisseEdited, lerninteressen,
      lerninteressenValidationFailed, lerninteressenEdited,addingInProgress, addingError, updatingInProgress,
      updatingError } = this.state;

    let title = '';
      title = 'Update Lernvorlieben';

    return (
      show ?
        <Dialog open={show} onClose={this.handleClose} maxWidth='xs'>
          <DialogTitle id='form-dialog-title'>{title}
            <IconButton className={classes.closeButton} onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <form className={classes.root} noValidate autoComplete='off'>
              <TextField type='text' required fullWidth margin='normal' id='lerntyp' label='Lerntyp:' value={lerntyp}
                onChange={this.textFieldValueChange} error={lerntypValidationFailed}
                helperText={lerntypValidationFailed ? 'The last name must contain at least one character' : ' '} />
              <TextField type='text' required fullWidth margin='normal' id='frequenz' label='Frequenz:' value={frequenz}
                onChange={this.textFieldValueChange} error={frequenzValidationFailed}
                helperText={frequenzValidationFailed ? 'The alter must contain at least one character' : ' '} />
              <TextField type='text' required fullWidth margin='normal' id='extrovertiertheit' label='Extrovertiertheit:' value={extrovertiertheit}
                onChange={this.textFieldValueChange} error={extrovertiertheitValidationFailed}
                helperText={extrovertiertheitValidationFailed ? 'The last name must contain at least one character' : ' '} />
              <TextField type='text' required fullWidth margin='normal' id='remote' label='Remote/Präsenz:' value={remote}
                onChange={this.textFieldValueChange} error={remoteValidationFailed}
                helperText={remoteValidationFailed ? 'The last name must contain at least one character' : ' '} />
              <TextField type='text' required fullWidth margin='normal' id='vorkenntnisse' label='Vorkenntnisse:' value={vorkenntnisse}
                onChange={this.textFieldValueChange} error={vorkenntnisseValidationFailed}
                helperText={vorkenntnisseValidationFailed ? 'The last name must contain at least one character' : ' '} />
              <TextField type='text' required fullWidth margin='normal' id='lerninteressen' label='Lerninteressen:' value={lerninteressen}
                onChange={this.textFieldValueChange} error={lerninteressenValidationFailed}
                helperText={lerninteressenValidationFailed ? 'The last name must contain at least one character' : ' '} />
            </form>
            <LoadingProgress show={addingInProgress || updatingInProgress} />
            {
              // Show error message in dependency of Lernvorliebe prop
              lernvorliebe ?
                <ContextErrorMessage error={updatingError} contextErrorMsg={`The Lernvorliebe ${lernvorliebe.getID()} could not be updated.`} onReload={this.updateLernvorliebe} />
                : null
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='secondary'>
              Cancel
            </Button>
            {
              // If Lernvorliebe is given, show an update button, else show null
              lernvorliebe ?
                <Button disabled={ lerntypValidationFailed || frequenzValidationFailed ||
                extrovertiertheitValidationFailed || remoteValidationFailed || vorkenntnisseValidationFailed ||
                lerninteressenValidationFailed} variant='contained' onClick={this.updateLernvorliebe} color='primary'>
                  Update
                </Button>
                : null
            }
          </DialogActions>
        </Dialog>
        : null
    );
  }
}

/** Component specific styles
const styles = theme => ({
  root: {
    width: '100%',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

/** PropTypes
ProfilLernvorliebenForm.propTypes = {
  /** @ignore
  classes: PropTypes.object.isRequired,
  lernvorliebe: PropTypes.object,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default withStyles(styles)(ProfilLernvorliebenForm);
*/}
