import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import {StudooAPI, PersonBO, LernvorliebeBO} from '../../api';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';


/**
 * Shows a modal form dialog for a CustomerBO in prop customer. If the customer is set, the dialog is configured
 * as an edit dialog and the text fields of the form are filled from the given CustomerBO object.
 * If the customer is null, the dialog is configured as a new customer dialog and the textfields are empty.
 * In dependency of the edit/new state, the respective backend calls are made to update or create a customer.
 * After that, the function of the onClose prop is called with the created/update CustomerBO object as parameter.
 * When the dialog is canceled, onClose is called with null.
 *
 * @see See Material-UIs [Dialog](https://material-ui.com/components/dialogs)
 * @see See Material-UIs [TextField](https://material-ui.com/components/text-fields//)
 *
 * @author [Christoph Kunz](https://github.com/christophkunz)
 */
class ProfilLernvorliebenForm extends Component {

  constructor(props) {
    super(props);

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

  /** Updates the Lernvorliebe */
  updateLernvorliebe = () => {
    // clone the original person, in case the backend call fails
    let updatedLernvorliebe = Object.assign(new LernvorliebeBO(), this.props.lernvorliebe);
    // set the new attributes from our dialog
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
  }

  /** Handles value changes of the forms textfields and validates them */
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

  /** Handles the close / cancel button click event */
  handleClose = () => {
    // Reset the state
    this.setState(this.baseState);
    this.props.onClose(null);
  }

  /** Renders the component */
  render() {
    const { classes, lernvorliebe, show } = this.props;
    const { lerntyp, lerntypValidationFailed, lerntypEdited, frequenz, frequenzValidationFailed, frequenzEdited,
      extrovertiertheit, extrovertiertheitValidationFailed, extrovertiertheitEdited, remote, remoteValidationFailed,
      remoteEdited, vorkenntnisse, vorkenntnisseValidationFailed, vorkenntnisseEdited, lerninteressen,
      lerninteressenValidationFailed, lerninteressenEdited,addingInProgress, addingError, updatingInProgress,
      updatingError } = this.state;

    let title = '';
    let header = '';

    if (lernvorliebe) {
      // person defindet, so ist an edit dialog
      title = 'Update Lernvorlieben';
    } else {
      title = 'Create a new Person';
      header = 'Enter Person data';
    }

    return (
      show ?
        <Dialog open={show} onClose={this.handleClose} maxWidth='xs'>
          <DialogTitle id='form-dialog-title'>{title}
            <IconButton className={classes.closeButton} onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {header}
            </DialogContentText>
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
              // Show error message in dependency of customer prop
              lernvorliebe ?
                <ContextErrorMessage error={updatingError} contextErrorMsg={`The person ${lernvorliebe.getID()} could not be updated.`} onReload={this.updateLernvorliebe} />
                :
                <ContextErrorMessage error={addingError} contextErrorMsg={`The customer could not be added.`} onReload={this.addPerson} />
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='secondary'>
              Cancel
            </Button>
            {
              // If a customer is given, show an update button, else an add button
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

/** Component specific styles */
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

/** PropTypes */
ProfilLernvorliebenForm.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The CustomerBO to be edited */
  lernvorliebe: PropTypes.object,
  /** If true, the form is rendered */
  show: PropTypes.bool.isRequired,
  /**
   * Handler function which is called, when the dialog is closed.
   * Sends the edited or created CustomerBO as parameter or null, if cancel was pressed.
   *
   * Signature: onClose(CustomerBO customer);
   */
  onClose: PropTypes.func.isRequired,
}

export default withStyles(styles)(ProfilLernvorliebenForm);
