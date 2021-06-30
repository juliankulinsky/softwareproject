import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { StudooAPI, ProfilBO, LerngruppeBO } from '../../api';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';


/**
 * Zeigt ein Form-Dialog zum Bearbeiten des Gruppennamens eines existierenden LerngruppeBO und dessen Profilbeschreibung.
 * Die bestehenden Daten der Lerngruppe und dessen Profil werden als Defaultwerte in die Textfelder übernommen.
 * Falls diese bearbeitet wurden, kann auf "Ändern' gedrückt werden, um die Änderungen in der Datenbank zu speichern.
 * Durch onClose wird der Dialog geschlossen, dies passiert auch beim Abbruch.
 */
class UpdateGruppennameDialog extends Component {

  constructor(props) {
    super(props);

    // Init the state
    this.state = {
      lerngruppe: props.lerngruppe,
      gruppenprofil: props.gruppenprofil,
      gruppenname: props.lerngruppe.getGruppenname(),
      gruppennameEdited: false,
      gruppennameValidationFailed: false,
      gruppenbeschreibung: props.gruppenprofil.getBeschreibung(),
      gruppenbeschreibungEdited: false,
      gruppenbeschreibungValidationFailed: false,
      updatingInProgress: false,
      updatingError: null
    };
    this.baseState = this.state;
  }

  /** Aktualisiert die Lerngruppe und ihr Profil mit den neuen Daten */
  updateLerngruppe = () => {
    let updatedProfil = Object.assign(new ProfilBO(), this.state.gruppenprofil)
    updatedProfil.setBeschreibung(this.state.gruppenbeschreibung)
    StudooAPI.getAPI().updateProfil(updatedProfil)

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

  /** Handhabt den Wertwechsel der Textfelder und validiert diese */
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

  /** Handhabt das Schließen/Abbrechen-Button-Event */
  handleClose = () => {
    // Reset the state
    this.setState(this.baseState);
    this.props.onClose(null);
  }

  /** Rendert die Komponente */
  render() {
    const { classes, person, show } = this.props;
    const { lerngruppe, gruppenprofil, gruppenname, gruppennameEdited, gruppennameValidationFailed, gruppenbeschreibung,
      gruppenbeschreibungEdited, gruppenbeschreibungValidationFailed, updatingInProgress, updatingError } = this.state;

    let title = '';
    let header = '';

    title = 'Ändern der Gruppendaten';
    header = 'Gebe hier die Lerngruppendaten ein';

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
                helperText={gruppennameValidationFailed ? 'mindestens 3 Zeichen' : ' '} />
            </form>
            <form className={classes.root} noValidate autoComplete='off'>
              <TextField autoFocus type='text' required fullWidth margin='normal' id='gruppenbeschreibung' label='neue Gruppenbeschreibung:' value={gruppenbeschreibung}
                onChange={this.textFieldValueChange}/>
            </form>
            <LoadingProgress show={updatingInProgress} />
            <ContextErrorMessage error={updatingError} contextErrorMsg={`Die Lerngruppe konnte nicht geändert werden.`} onReload={this.updateLerngruppe} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='secondary'>
              Abbrechen
            </Button>
            <Button disabled={!((gruppennameEdited && !gruppennameValidationFailed) || (gruppenbeschreibungEdited && !gruppennameValidationFailed))} variant='contained' onClick={this.updateLerngruppe} color='primary'>
                Ändern
            </Button>
          </DialogActions>
        </Dialog>
        : null
    );
  }
}

/** Komponent-spezifische Styles */
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
  /** Das LerngruppeBO-Objekt, das man ändern will */
  lerngruppe: PropTypes.object,
  /** Wenn true, wird die Komponente gerendert */
  show: PropTypes.bool.isRequired,
  /**
   * Handler function welche aufgerufen wird, wenn der Dialog geschlossen wird.
   * Sendet die aktualisierte Lerngruppe, oder null, falls abgebrochen wurde zurück.
   *
   * Signature: onClose(LerngruppeBO lerngruppe);
   */
  onClose: PropTypes.func.isRequired,
}

export default withStyles(styles)(UpdateGruppennameDialog);
