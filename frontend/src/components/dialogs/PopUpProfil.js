import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ProfilVorschau from "../ProfilVorschau";

/**
 * Öffnet einen Dialog der gegeben Person mit Informationen über die Person, Beschreibung und Lernvorlieben.
 */
class PopUpProfil extends Component {

  constructor(props) {
    super(props);

    // Initialisieren des states
    this.state = {

    };
  }


  /** Handles the close / cancel button click event */
  handleClose = () => {
    this.props.onClose(null);
  }

  /** Rendern des Dialogs PopUpProfil */
  render() {
    const { classes, person, profil, lernvorliebe, show } = this.props;

    let header = '';

    if (person) {
      // person defindet, so ist an edit dialog
      header = `Person ID: ${person.getID()}`;
    } else {

    }

    return (
      show ?
        <Dialog open={show} onClose={this.handleClose} maxWidth='md'>
          <DialogTitle id='form-dialog-title'>
            <IconButton className={classes.closeButton} onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {header}
            </DialogContentText>
              {/** Öffnen der Komponente ProfilVorschau mit den Props person, lernvorlieben und Profil,
                 * der gegeben Person.
               * */}
              <ProfilVorschau person={person} lernvorlieben={lernvorliebe} profil={profil} />
            </DialogContent>
        </Dialog>
        : null
    );
  }
}

/** Komponent spezifische styles */
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
  show: PropTypes.bool,
  onClose: PropTypes.func,
}

export default withStyles(styles)(PopUpProfil);