import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import {StudooAPI, PersonBO, LernvorliebeBO, ProfilBO, LerngruppeBO, KonversationBO, GruppenTeilnahmeBO, ChatTeilnahmeBO} from '../../api';
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
class UpdateGruppennameDialog extends Component {

  constructor(props) {
    super(props);

    // Init the state
    this.state = {
      lerngruppe: props.lerngruppe,
      gruppenname: null,
      gruppennameEdited: false,
      gruppennameValidationFailed: false,
      updatingInProgress: false,
      updatingError: null
    };
    // save this state for canceling
    this.baseState = this.state;
  }

  /** Erstellt die Lerngruppe mit allem was dazu gehört */
  updateLerngruppe = () => {
    let updatedLerngruppe = Object.assign(new LerngruppeBO(), this.props.lerngruppe);
    updatedLerngruppe.setGruppenname(this.state.gruppenname)
    StudooAPI.getAPI().updateLerngruppe(updatedLerngruppe).then(lerngruppe => {
      this.setState({
        updatingInProgress: false,
        updatingError: null
      });
      this.baseState.lerngruppe = this.state.lerngruppe
      this.props.onClose(updatedLerngruppe)
    }).catch(e =>
      this.setState({
        updatingInProgress: false,
        updatingError: e
      })
    )
    this.setState({
      updatingInProgress: true,
      updatingError: null
    })
  }

  /** Handles value changes of the forms textfields and validates them */
  textFieldValueChange = (event) => {
    const value = event.target.value;

    let error = false;
    if (value.trim().length < 3) {
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
    const { classes, person, show } = this.props;
    const { lerngruppe, gruppenname, gruppennameEdited, gruppennameValidationFailed, updatingInProgress,updatingError } = this.state;

    let title = '';
    let header = '';

    title = 'Ändern des Gruppenamens';
    header = 'Gebe hier den Lerngruppenname ein';

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
              <TextField autoFocus type='text' required fullWidth margin='normal' id='gruppenname' label='neuer Gruppenname:' value={gruppenname}
                onChange={this.textFieldValueChange} error={gruppennameValidationFailed}
                helperText={gruppennameValidationFailed ? 'Der Gruppenname muss mindestens 3 Zeichen lang sein' : ' '} />
            </form>
            <LoadingProgress show={updatingInProgress} />
            <ContextErrorMessage error={updatingError} contextErrorMsg={`Die Lerngruppe konnte nicht geändert werden.`} onReload={this.updateLerngruppe} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='secondary'>
              Abbrechen
            </Button>
            <Button disabled={!(gruppennameEdited && !gruppennameValidationFailed)} variant='contained' onClick={this.updateLerngruppe} color='primary'>
                Ändern
            </Button>
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
UpdateGruppennameDialog.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The CustomerBO to be edited */
  person: PropTypes.object,
  /** Das LerngruppeBO-Objekt, das man ändern will */
  lerngruppe: PropTypes.object,
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

export default withStyles(styles)(UpdateGruppennameDialog);
