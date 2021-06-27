import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import {StudooAPI, PersonBO, LernvorliebeBO, ProfilBO, LerngruppeBO, KonversationBO, GruppenTeilnahmeBO, ChatTeilnahmeBO} from '../../api';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';


/**
 * Zeigt ein Form-Dialog zum Erstellen einer Lerngruppe mit Setzen des Namens und optional dessen Profilbeschreibung.
 * Falls die Daten ordnungsgemäß eingetragen wurden, kann über den "Erstellen"-Button die Gruppe und alles dazu
 * gehörende erstellt werden.
 * Durch onClose wird der Dialog geschlossen, dies passiert auch beim Abbruch.
 */
class ErstelleLerngruppeDialog extends Component {

  constructor(props) {
    super(props);

    this.state = {
      gruppenname: "",
      gruppennameEdited: false,
      gruppennameValidationFailed: false,
      gruppenbeschreibung: "",
      gruppenbeschreibungEdited: false,
      gruppenbeschreibungValidationFailed: false,
      addingInProgress: false,
      addingError: null
    };
    this.baseState = this.state;
  }

  /** Erstellt die Lerngruppe mit allem was dazu gehört */
  erstelleLerngruppe = () => {
    /** Zuerst neue Lernvorlieben, neues Profil mit der gewünschten Beschreibung, das auf diese Lernvorlieben weist
     * und eine neue Konversation erstellen */
    let newLernvorlieben = new LernvorliebeBO()
    StudooAPI.getAPI().addLernvorliebe(newLernvorlieben).then(lernvorlieben => {
      let newProfil = new ProfilBO(lernvorlieben.getID(),this.state.gruppenbeschreibung)
      StudooAPI.getAPI().addProfil(newProfil).then(profil => {
        let newKonversation = new KonversationBO(true)
        StudooAPI.getAPI().addKonversation(newKonversation).then(konversation => {
          /** Mit dem eingegebenen Gruppenname, der ID des erstellten ProfilBO und der ID des KonversationBO eine
           * neue Gruppe erstellen */
          let newLerngruppe = new LerngruppeBO(this.state.gruppenname,profil.getID(),konversation.getID())
          StudooAPI.getAPI().addLerngruppe(newLerngruppe).then(lernguppe => {
            /** An diesem Punkt werden automatisch im Hintergrund Gruppenvorschläge für alle Personen mit dieser Gruppe
             * erstellt. Im Folgenden wird der Gruppenvorschlag für die aktuelle Person aktualisiert, damit dieser
             * GruppenVorschlag ihr nicht angezeigt wird und direkt eine Teilnahme entsteht */
            StudooAPI.getAPI().getGruppenVorschlagByPersonIDundGruppenID(this.props.person.getID(),lernguppe.getID())
                .then(eigenerGruppenvorschlag => {
                  eigenerGruppenvorschlag.setEntscheidungGruppe(true)
                  eigenerGruppenvorschlag.setEntscheidungPerson(true)
                  eigenerGruppenvorschlag.setMatchpoints(2)
                  StudooAPI.getAPI().updateGruppenVorschlag(eigenerGruppenvorschlag).then(neweigenerGruppenvorschlag => {
                    /** An diesem Punkt wird automatisch im Hintergrund eine zugehörige Gruppen- & Chateilnahme für die
                     * Person erstellt, weil Matchpoints=2 (siehe Put-Methode der GruppenvorschlagOperations).
                     * Die neue Gruppenteilnahme der aktuellen Person zur neuen Gruppe wird ausgelesen */
                    StudooAPI.getAPI().getGruppenTeilnahmeByPersonIDundGruppenID(this.props.person.getID(),lernguppe.getID())
                      .then(eigeneGruppenteilnahme => {
                        /** Die aktuelle Person wird als Admin der Gruppe gesetzt */
                        eigeneGruppenteilnahme.set_ist_admin(true)
                        StudooAPI.getAPI().updateGruppenTeilnahme(eigeneGruppenteilnahme)
                      })
                  })
                })
            /** "Einladung" an Chatpartner senden, indem automatisch erstellter Gruppenvorschlag ausgelesen und
             * angepasst wird, wodurch eine Anfrage gesendet wird. */
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
    const { gruppenname, gruppennameEdited, gruppennameValidationFailed, gruppenbeschreibung, gruppenbeschreibungEdited,
      gruppenbeschreibungValidationFailed, addingInProgress, addingError } = this.state;

    let title = '';
    let header = '';

    title = 'Erstelle eine Lerngruppe';
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
              <TextField autoFocus type='text' required fullWidth margin='normal' id='gruppenname' label='Gruppenname: (mind. 3 Zeichen)' value={gruppenname}
                onChange={this.textFieldValueChange} error={gruppennameValidationFailed}/>
            </form>
            <form className={classes.root} noValidate autoComplete='off'>
              <TextField type='text' fullWidth margin='normal' id='gruppenbeschreibung' label='Gruppenbeschreibung: (optional)' value={gruppenbeschreibung}
                onChange={this.textFieldValueChange}/>
            </form>
            <LoadingProgress show={addingInProgress} />
            <ContextErrorMessage error={addingError} contextErrorMsg={`Die Lerngruppe konnte nicht erstellt werden.`} onReload={this.erstelleLerngruppe} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='secondary'>
              Abbrechen
            </Button>
            <Button disabled={!(gruppennameEdited && !gruppennameValidationFailed)}
                    variant='contained' onClick={this.erstelleLerngruppe} color='primary'>
                Erstellen
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
ErstelleLerngruppeDialog.propTypes = {
  classes: PropTypes.object.isRequired,
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

export default withStyles(styles)(ErstelleLerngruppeDialog);
