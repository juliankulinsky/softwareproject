import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import {StudooAPI, PersonBO, LernvorliebeBO, ProfilBO} from '../../api';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';

/**
 * Shows a Form for the currently logged in Person which allows to edit the Alter, Wohnort, Studiengang and Semester
 */
class ProfilForm extends Component {

  constructor(props) {
    super(props);

    /**
     * Init empty variable and set Lernvorliebe values of the given Person
     * */
    let vn = '', em = '', gid= '', alt = 0, wo = '', sg = '', sm = 0, pID = 0;
    if (props.person) {
      vn = props.person.getName();
      em = props.person.getEmail();
      gid = props.person.getGoogleUserID();
      alt = props.person.getAlter();
      wo = props.person.getWohnort();
      sg = props.person.getStudiengang();
      sm = props.person.getSemester();
      pID = props.person.getProfilId();
    }

    let be = '';
    if (props.profil) {
      be = props.profil.getBeschreibung();
    }

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
      name: vn,
      nameValidationFailed: false,
      nameEdited: false,
      email: em,
      emailValidationFailed: false,
      emailEdited: false,
      gid: gid,
      gidValidationFailed: false,
      gidEdited: false,
      alter : alt,
      alterValidationFailed: false,
      alterEdited: false,
      wohnort: wo,
      wohnortValidationFailed: false,
      wohnortEdited: false,
      studiengang: sg,
      studiengangValidationFailed: false,
      studiengangEdited: false,
      semester: sm,
      semesterValidationFailed: false,
      semesterEdited: false,
      profilID: pID,
      profilIDValidationFailed: false,
      profilIDEdited: false,
      beschreibung: be,
      beschreibungValidationFailed: false,
      beschreibungEdited: false,
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

  updateProfil = () => {
    this.updatePerson()
    this.updateProfilBeschreibung()
    this.updateLernvorliebe()

    console.log("Basestate", this.baseState)
  }

  /** Updates the person */
  updatePerson = () => {
    // clone the original person, in case the backend call fails
    let updatedPerson = Object.assign(new PersonBO(), this.props.person);
    // set the new attributes from our dialog
    updatedPerson.setName(this.state.name);
    updatedPerson.setEmail(this.state.email);
    updatedPerson.setGoogleUserID(this.state.gid);
    updatedPerson.setAlter(parseInt(this.state.alter));
    updatedPerson.setWohnort(this.state.wohnort);
    updatedPerson.setStudiengang(this.state.studiengang);
    updatedPerson.setSemester(parseInt(this.state.semester));
    updatedPerson.setProfilId(this.state.profilID);
    StudooAPI.getAPI().updatePerson(updatedPerson).then(person => {
      this.setState({
        updatingInProgress: false,              // disable loading indicator
        updatingError: null                     // no error message
      });
      // keep the new state as base state
      this.baseState.name = this.state.name;
      this.baseState.email = this.state.email;
      this.baseState.gid = this.state.gid;
      this.baseState.alter = this.state.alter;
      this.baseState.wohnort = this.state.wohnort;
      this.baseState.studiengang = this.state.studiengang;
      this.baseState.semester = this.state.semester;
      this.baseState.profilID = this.state.profilID;
      this.props.onClose(updatedPerson);      // call the parent with the new customer
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


  /** Updates the Profil */
  updateProfilBeschreibung = () => {
    // clone the Person, in case the backend call fails
    let updatedProfil = Object.assign(new ProfilBO(), this.props.profil);
    // set new attributes from Textfields
    updatedProfil.setBeschreibung(this.state.beschreibung);
    StudooAPI.getAPI().updateProfil(updatedProfil).then(profil => {
      this.setState({
        updatingInProgress: false,              // disable loading indicator
        updatingError: null                     // no error message
      });
      // keep the new state as base state
      this.baseState.beschreibung = this.state.beschreibung;
      this.props.onCloseP(updatedProfil);      // call the parent with the new customer
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


  /** Updates the Lernvorliebe */
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
      this.props.onCloseL(updatedLernvorliebe);      // call the parent with the new customer
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
    this.props.onCloseP(null);
    this.props.onCloseL(null);
  }

  /** Renders the component */
  render() {
    const { classes, person, profil, lernvorliebe, show } = this.props;
    const { name, nameValidationFailed, NameEdited, alter, alterValidationFailed, alterEdited, wohnort,
        wohnortValidationFailed, wohnortEdited, studiengang, studiengangValidationFailed, studiengangEdited,
        semester, semesterValidationFailed, semesterEdited, profilID, profilIDValidationFailed, profilIDEdited,
        beschreibung, beschreibungValidationFailed, beschreibungEdited, lerntyp, lerntypValidationFailed,
      lerntypEdited, frequenz, frequenzValidationFailed, frequenzEdited, extrovertiertheit,
      extrovertiertheitValidationFailed, extrovertiertheitEdited, remote, remoteValidationFailed, remoteEdited,
      vorkenntnisse, vorkenntnisseValidationFailed, vorkenntnisseEdited, lerninteressen,
      lerninteressenValidationFailed, lerninteressenEdited,addingInProgress, addingError, updatingInProgress,
      updatingError } = this.state;

    let title = '';
    let header = '';

    if (person) {
      // person defindet, so ist an edit dialog
      title = 'Update Profil';
      header = `Person ID: ${person.getID()}`;
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
              <TextField type='text' required fullWidth margin='normal' id='name' label='Name:' value={name}
                onChange={this.textFieldValueChange} error={nameValidationFailed}
                helperText={nameValidationFailed ? 'The last name must contain at least one character' : ' '} />
              <TextField type='number' required fullWidth margin='normal' id='alter' label='Alter:' value={alter}
                onChange={this.textFieldValueChange} error={alterValidationFailed}
                helperText={alterValidationFailed ? 'The alter must contain at least one character' : ' '} />
              <TextField type='text' required fullWidth margin='normal' id='wohnort' label='Wohnort:' value={wohnort}
                onChange={this.textFieldValueChange} error={wohnortValidationFailed}
                helperText={wohnortValidationFailed ? 'The last name must contain at least one character' : ' '} />
              <TextField type='text' required fullWidth margin='normal' id='studiengang' label='Studiengang:' value={studiengang}
                onChange={this.textFieldValueChange} error={studiengangValidationFailed}
                helperText={studiengangValidationFailed ? 'The last name must contain at least one character' : ' '} />
              <TextField type='number' required fullWidth margin='normal' id='semester' label='Semester:' value={semester}
                onChange={this.textFieldValueChange} error={semesterValidationFailed}
                helperText={semesterValidationFailed ? 'The last name must contain at least one character' : ' '} />
              <TextField type='text' required fullWidth margin='normal' id='beschreibung' label='Beschreibung:' value={beschreibung}
                onChange={this.textFieldValueChange} error={beschreibungValidationFailed}
                helperText={beschreibungValidationFailed ? 'The last name must contain at least one character' : ' '} />
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
              person ?
                <ContextErrorMessage error={updatingError} contextErrorMsg={`The person ${person.getID()} could not be updated.`} onReload={this.updateProfil} />
                : null
            }
            {
              // Show error message in dependency of customer prop
              profil ?
                <ContextErrorMessage error={updatingError} contextErrorMsg={`The Profil ${profil.getID()} could not be updated.`} onReload={this.updateProfilBeschreibung} />
                : null
            }
            {
              // Show error message in dependency of customer prop
              lernvorliebe ?
                <ContextErrorMessage error={updatingError} contextErrorMsg={`The person ${lernvorliebe.getID()} could not be updated.`} onReload={this.updateProfil} />
                : null
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='secondary'>
              Cancel
            </Button>
            {
              // If a customer is given, show an update button, else an add button
              person ?
                <Button disabled={ nameValidationFailed || alterValidationFailed ||
                wohnortValidationFailed || studiengangValidationFailed || semesterValidationFailed ||
                profilIDValidationFailed} variant='contained' onClick={this.updateProfil} color='primary'>
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
ProfilForm.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  person: PropTypes.object,
  profil: PropTypes.object,
  lernvorliebe: PropTypes.object,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default withStyles(styles)(ProfilForm);