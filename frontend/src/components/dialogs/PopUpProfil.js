import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import {StudooAPI, PersonBO, LernvorliebeBO, ProfilBO} from '../../api';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';
import ProfilVorschau from "../ProfilVorschau";

/**
 * Shows a Form for the currently logged in Person which allows to edit the Alter, Wohnort, Studiengang and Semester
 */
class PopUpProfil extends Component {

  constructor(props) {
    super(props);

    // Init the state
    this.state = {

    };
    // save this state for canceling
    this.baseState = this.state;
  }


  /** Handles the close / cancel button click event */
  handleClose = () => {
    // Reset the state
    this.setState(this.baseState);
    this.props.onClose(null);
  }

  /** Renders the component */
  render() {
    const { classes, person, profil, lernvorliebe, show } = this.props;
    const { name, addingInProgress, updatingInProgress, updatingError } = this.state;

    let header = '';

    if (person) {
      // person defindet, so ist an edit dialog
      header = `Person ID: ${person.getID()}`;
    } else {

    }

    return (
      show ?
        <Dialog open={show} onClose={this.handleClose} maxWidth='xs'>
          <DialogTitle id='form-dialog-title'>
            <IconButton className={classes.closeButton} onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {header}
            </DialogContentText>
              <ProfilVorschau person={person} lernvorlieben={lernvorliebe} profil={profil} />
            </DialogContent>
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
PopUpProfil.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  person: PropTypes.object,
  profil: PropTypes.object,
  lernvorliebe: PropTypes.object,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default withStyles(styles)(PopUpProfil);