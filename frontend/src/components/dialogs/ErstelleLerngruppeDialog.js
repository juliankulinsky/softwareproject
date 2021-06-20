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
class ErstelleLerngruppeDialog extends Component {

  constructor(props) {
    super(props);

    // Init the state
    this.state = {
      gruppenname: null,
      gruppennameEdited: false,
      gruppennameValidationFailed: false,
      addingInProgress: false,
      addingError: null
    };
    // save this state for canceling
    this.baseState = this.state;
  }

  /** Erstellt die Lerngruppe mit allem was dazu gehört */
  erstelleLerngruppe = () => {
    /** Zuerst neue Lernvorlieben, neues Profil, das auf diese Lernvorlieben weist und eine neue Konversation erstellen */
    let newLernvorlieben = new LernvorliebeBO()
    StudooAPI.getAPI().addLernvorliebe(newLernvorlieben).then(lernvorlieben => {
      let newProfil = new ProfilBO(lernvorlieben.getID())
      StudooAPI.getAPI().addProfil(newProfil).then(profil => {
        let newKonversation = new KonversationBO(true)
        StudooAPI.getAPI().addKonversation(newKonversation).then(konversation => {
          /** Mit dem eingegebenen Gruppenname, diesem erstellten Profil und der Konversation eine neue Gruppe erstellen */
          let newLerngruppe = new LerngruppeBO(this.state.gruppenname,profil.getID(),konversation.getID())
          StudooAPI.getAPI().addLerngruppe(newLerngruppe).then(lernguppe => {
            /** Hier werden automatisch Gruppenvorschläge für alle Personen mit dieser Gruppe erstellt.
             *  Im Folgenden wird der Gruppenvorschlag für die aktuelle Person aktualisiert, damit dieser ihr nicht angezeigt wird */
            StudooAPI.getAPI().getGruppenVorschlagByPersonIDundGruppenID(this.props.person.getID(),lernguppe.getID())
                .then(eigenerGruppenvorschlag => {
                  eigenerGruppenvorschlag.setEntscheidungGruppe(true)
                  eigenerGruppenvorschlag.setEntscheidungPerson(true)
                  eigenerGruppenvorschlag.setMatchpoints(2)
                  StudooAPI.getAPI().updateGruppenVorschlag(eigenerGruppenvorschlag).then(neweigenerGruppenvorschlag => {
                    /** Hier wird automatisch eine zugehörige Gruppen- & Chateilnahme für die Person erstellt, weil Matchpoints=2.
                     *  Die neue Gruppenteilnahme der aktuellen Person zur neuen Gruppe wird ausgelesen */
                    StudooAPI.getAPI().getGruppenTeilnahmeByPersonIDundGruppenID(this.props.person.getID(),lernguppe.getID())
                      .then(eigeneGruppenteilnahme => {
                        /** Die aktuelle Person wird als Admin der Gruppe gesetzt */
                        eigeneGruppenteilnahme.set_ist_admin(true)
                        StudooAPI.getAPI().updateGruppenTeilnahme(eigeneGruppenteilnahme)
                      })
                  })
                })
            /** "Einladung" an Chatpartner senden, indem automatisch erstellter Gruppenvorschlag ausgelesen und angepasst wird. */
            StudooAPI.getAPI().getGruppenVorschlagByPersonIDundGruppenID(this.props.chatpartner.getID(),lernguppe.getID())
                .then(partnerGruppenvorschlag => {
                  partnerGruppenvorschlag.setEntscheidungGruppe(true)
                  partnerGruppenvorschlag.setMatchpoints(1)
                  StudooAPI.getAPI().updateGruppenVorschlag(partnerGruppenvorschlag)
                })
            this.setState(this.baseState);
            this.props.onClose(lernguppe);
          })
        })
      })
    })
        .catch(e =>
      this.setState({
        addInProgress: false,    // disable loading indicator
        addError: e              // show error message
      })
    );

    // set loading to true
    this.setState({
      addInProgress: true,       // show loading indicator
      addError: null             // disable error message
    });
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
    const { gruppenname, gruppennameEdited, gruppennameValidationFailed, addingInProgress, addingError } = this.state;

    let title = '';
    let header = '';

    title = 'Erstelle eine Lerngruppe';
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
              <TextField autoFocus type='text' required fullWidth margin='normal' id='gruppenname' label='Gruppenname:' value={gruppenname}
                onChange={this.textFieldValueChange} error={gruppennameValidationFailed}
                helperText={gruppennameValidationFailed ? 'Der Gruppenname muss mindestens 3 Zeichen lang sein' : ' '} />
            </form>
            <LoadingProgress show={addingInProgress} />
            <ContextErrorMessage error={addingError} contextErrorMsg={`Die Lerngruppe konnte nicht erstellt werden.`} onReload={this.erstelleLerngruppe} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='secondary'>
              Abbrechen
            </Button>
            <Button disabled={!(gruppennameEdited && !gruppennameValidationFailed)} variant='contained' onClick={this.erstelleLerngruppe} color='primary'>
                Erstellen
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
ErstelleLerngruppeDialog.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The CustomerBO to be edited */
  person: PropTypes.object,
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

export default withStyles(styles)(ErstelleLerngruppeDialog);
