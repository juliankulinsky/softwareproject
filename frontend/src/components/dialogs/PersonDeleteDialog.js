import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { StudooAPI } from '../../api';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';
import firebase from 'firebase/app';

/**
 * Zeigt einen Dialog wenn eine Person ihr Profil löschen möchte
 *
 * @see Material-UIs [Dialog](https://material-ui.com/components/dialogs)
 */
class PersonDeleteDialog extends Component {

  constructor(props) {
    super(props);

    /** Inititialisieren des States*/
    this.state = {
      deletingInProgress: false,
      deletingError: null
    };
  }

  /** Lösche die Person */
  deletePerson = () => {
    StudooAPI.getAPI().deletePerson(this.props.person.getID())
    firebase.auth().signOut();
  }

  /** Verarbeitet das button click event */
  handleClose = () => {
    this.props.onClose(null);
  }

  /** Rendern des Dialogs PersonDeleteDialog */
  render() {
    const { classes, person, show } = this.props;
    const { deletingInProgress, deletingError } = this.state;

    return (
      show ?
        <Dialog open={show} onClose={this.handleClose}>
          <DialogTitle id='delete-dialog-title'>Studoo-Account löschen
            <IconButton className={classes.closeButton} onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Wirklich deinen Studoo-Account '{person.getName()}' (ID: {person.getID()}) löschen?
            </DialogContentText>
            <LoadingProgress show={deletingInProgress} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='secondary'>
              Abbrechen
            </Button>
            <Button variant='contained' onClick={this.deletePerson} color='primary'>
              Bestätigen
            </Button>
          </DialogActions>
        </Dialog>
        : null
    );
  }
}

/** Komponenten spezifische styles */
const styles = theme => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  }
});

/** PropTypes */
PersonDeleteDialog.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The CustomerBO to be deleted */
  customer: PropTypes.object.isRequired,
  /** If true, the dialog is rendered */
  show: PropTypes.bool.isRequired,
  /**
   * Handler function which is called, when the dialog is closed.
   * Sends the deleted CustomerBO as parameter or null, if cancel was pressed.
   *
   * Signature: onClose(CustomerBO customer);
   */
  onClose: PropTypes.func.isRequired,
}

export default withStyles(styles)(PersonDeleteDialog);