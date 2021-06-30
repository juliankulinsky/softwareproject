import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Slider,
  Typography,
  Grid
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import {StudooAPI, PersonBO, LernvorliebeBO, ProfilBO} from '../../api';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';

/**
 * Zeigt ein Formular der aktuell angemeldeten Person an, um das Profil zu bearbeiten
 */
class ProfilForm extends Component {

  constructor(props) {
    super(props);

    /**
     * Initialisieren leerer Variablen und setzen der Werte gemäß der gegeben Person
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

    /**
     * Initialisieren einer leeren Variable und setzen den Wert gemäß der dem gegeben Profil
     * */
    let be = '';
    if (props.profil) {
      be = props.profil.getBeschreibung();
    }

    /**
     * Initialisieren leerer Variablen und setzen der Werte gemäß der gegeben Lernvorlieben
     * */
    let lt = 0, fq = 0, ex = 0, rp = 0, vk = '', li = '';
    if (props.lernvorliebe) {
      lt = props.lernvorliebe.get_lerntyp();
      fq = props.lernvorliebe.get_frequenz();
      ex = props.lernvorliebe.get_extrovertiertheit();
      rp = props.lernvorliebe.get_remote_praesenz();
      vk = props.lernvorliebe.get_vorkenntnisse();
      li = props.lernvorliebe.get_lerninteressen();
    }

    /** Initialisieren des states
     *
     */
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
      updatingError: null,
      valuetext: 2,
      edited: false
    };

    /** Speichern des States im Falle eines Abbruchs */
    this.baseState = this.state;
  }

  /** Aufrufen aller Update funktionen der drei Business Objekte*/
  updateProfil = () => {
    this.updatePerson()
    this.updateProfilBeschreibung()
    this.updateLernvorliebe()
  }

  /** Updated die Person */
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


  /** Updated die Profilbeschreibung */
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


  /** Updated die Lernvorlieben */
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
    }else if (value <= 0) {
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
    if(this.state.edited == true){
      this.setState({loadingInProgress: true})
    }


  }

   valuetext = (value) =>{/*
    return `${value}°C`;
  }

  handleChange = (event, value) => {
    this.setState({
            lerntyp: value
          }
      );*/
  }

  /** Verarbeitet die Wertänderung des Sliders Lerntyp */
  handleChangeLerntyp = (event, value) => {
      this.setState({
            lerntyp: value,
            edited: true
          }
      );

  }

  /** Verarbeitet die Wertänderung des Sliders Frequenz */
  handleChangeFrequenz = (event, value) => {
      this.setState({
            frequenz: value,
            edited: true
          }
      );
  }

  /** Verarbeitet die Wertänderung des Sliders Extrovertiertheit */
  handleChangeExtrovertiertheit = (event, value) => {
    this.setState({
          extrovertiertheit: value,
            edited: true
        }
    );
  }

  /** Verarbeitet die Wertänderung des Sliders Remote/Präsenz */
  handleChangeRemote = (event, value) => {
    this.setState({
          remote: value,
            edited: true
        }
    );
  }

  /** Rendern des Dialogs ProfilForm */
  render() {

    /** Legt die verschieden Beschriftungen der Slider fest */
    const marksLerntyp = [{value: 1, label: 'Motorisch',},{value: 2, label: 'Auditiv',},,{value: 3,
      label: 'Kommunikativ',}, {value: 4, label: 'Visuell',}]
    const marksfrequenz = [{value: 1, label: 'Selten',},{value: 2, label: '',},,{value: 3,
      label: '',}, {value: 4, label: '',}, {value: 5, label: 'häufig',}]
    const marksExtro = [{value: 1, label: 'Introvertiert',},{value: 2, label: '',},,{value: 3,
      label: '',}, {value: 4, label: '',}, {value: 5, label: 'Extrovertiert',}]
    const marksRemote = [{value: 1, label: 'Präsenz',},{value: 2, label: '',},,{value: 3,
      label: '',}, {value: 4, label: '',}, {value: 5, label: 'Remote',}]

    /** Legt die Properties fest */
    const { classes, person, profil, lernvorliebe, show } = this.props;

    /** Legt die states fest */
    const { name, nameValidationFailed, NameEdited, alter, alterValidationFailed, alterEdited, wohnort,
        wohnortValidationFailed, wohnortEdited, studiengang, studiengangValidationFailed, studiengangEdited,
        semester, semesterValidationFailed, semesterEdited, profilID, profilIDValidationFailed, profilIDEdited,
        beschreibung, beschreibungValidationFailed, beschreibungEdited, lerntyp, lerntypValue, lerntypValidationFailed,
      lerntypEdited, frequenz, frequenzValidationFailed, frequenzEdited, extrovertiertheit,
      extrovertiertheitValidationFailed, extrovertiertheitEdited, remote, remoteValidationFailed, remoteEdited,
      vorkenntnisse, vorkenntnisseValidationFailed, vorkenntnisseEdited, lerninteressen,
      lerninteressenValidationFailed, lerninteressenEdited,addingInProgress, addingError, updatingInProgress,
      updatingError, loadingInProgress } = this.state;

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
        <Dialog open={show} onClose={this.handleClose} maxWidth='md'>
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
              <Grid container spacing={3}>
                  <Grid xs={5}>
                    <TextField type='text' InputProps={{readOnly: true}} fullWidth margin='normal' id='name' label='Name:' value={name}
                      onChange={this.textFieldValueChange} error={nameValidationFailed}
                      helperText={nameValidationFailed ? 'Dein Name muss mindestens einen Buchstaben haben' : ' '} />
                    <TextField type='text' required fullWidth margin='normal' id='alter' label='Alter:' value={alter}
                      onChange={this.textFieldValueChange} error={alterValidationFailed}
                      helperText={alterValidationFailed ? 'Dein Alter muss mindestens eine Ziffer sein und eine realistische eingabe' : ' '} />
                    <TextField type='text' required fullWidth margin='normal' id='wohnort' label='Wohnort:' value={wohnort}
                      onChange={this.textFieldValueChange} error={wohnortValidationFailed}
                      helperText={wohnortValidationFailed ? 'Dein Wohnort muss mindestens einen Buchstaben haben' : ' '} />
                    <TextField type='text' required fullWidth margin='normal' id='studiengang' label='Studiengang:' value={studiengang}
                      onChange={this.textFieldValueChange} error={studiengangValidationFailed}
                      helperText={studiengangValidationFailed ? 'Dein Studiengang muss mindestens einen Buchstaben haben' : ' '} />
                    <TextField type='text' required fullWidth margin='normal' id='semester' label='Semester:' value={semester}
                      onChange={this.textFieldValueChange} error={semesterValidationFailed}
                      helperText={semesterValidationFailed ? 'Dein Semester muss mindestens eine Ziffer sein und eine realistische eingabe' : ' '} />
                    <Grid xs={12}>
                      <TextField type='text' required fullWidth margin='normal' id='beschreibung' label='Beschreibung:' value={beschreibung}
                        onChange={this.textFieldValueChange} error={beschreibungValidationFailed}
                        helperText={beschreibungValidationFailed ? 'Deine Beschreibung muss mindestens einen Buchstaben haben' : ' '} />
                    </Grid>
                  </Grid>
                  <Grid xs={2}>

                  </Grid>
                  <Grid xs={5}>
                    <Typography>
                      Lerntyp:
                    </Typography>
                    <br/>
                    <Slider defaultValue={lerntyp} getAriaValueText={this.valuetext} aria-labelledby="discrete-slider"
                            valueLabelDisplay="off" step={1} marks={marksLerntyp} min={1} max={4} onChange={this.handleChangeLerntyp} />
                    <Typography>
                      Frequenz:
                    </Typography>
                    <br/>
                    <Slider defaultValue={frequenz} getAriaValueText={this.valuetext} aria-labelledby="discrete-slider"
                            valueLabelDisplay="off" step={1} marks={marksfrequenz} min={1} max={5} onChange={this.handleChangeFrequenz} />
                    <Typography>
                      Extrovertiertheit:
                    </Typography>
                    <br/>
                    <Slider defaultValue={extrovertiertheit} getAriaValueText={this.valuetext} aria-labelledby="discrete-slider"
                            valueLabelDisplay="off" step={1} marks={marksExtro} min={1} max={5} onChange={this.handleChangeExtrovertiertheit} />
                    <Typography>
                      Remote:
                    </Typography>
                    <br/>
                    <Slider defaultValue={remote} getAriaValueText={this.valuetext} aria-labelledby="discrete-slider"
                            valueLabelDisplay="off" step={1} marks={marksRemote} min={1} max={5} onChange={this.handleChangeRemote} />
                    <br/>
                    <TextField type='text' required fullWidth placeholder={"Python, React"} margin='normal' id='vorkenntnisse' label='Vorkenntnisse:' value={vorkenntnisse}
                      onChange={this.textFieldValueChange} error={vorkenntnisseValidationFailed}
                      helperText={vorkenntnisseValidationFailed ? 'Deine Vorkenntnisse müssen mindestens einen Buchstaben haben' : ' '} />
                    <TextField type='text' required fullWidth placeholder={"Java, Design, Apps"} margin='normal' id='lerninteressen' label='Lerninteressen:' value={lerninteressen}
                      onChange={this.textFieldValueChange} error={lerninteressenValidationFailed}
                      helperText={lerninteressenValidationFailed ? 'Deine Lerninteressen müssen mindestens einen Buchstaben haben' : ' '} />
                  </Grid>
              </Grid>
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
                profilIDValidationFailed || beschreibungValidationFailed || vorkenntnisseValidationFailed ||
                lerninteressenValidationFailed} variant='contained' onClick={this.updateProfil} color='primary'>
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

/** Komponent-spezifische Styles */
const styles = theme => ({
  root: {
    width: '90%',
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
  classes: PropTypes.object,
  person: PropTypes.object,
  profil: PropTypes.object,
  lernvorliebe: PropTypes.object,
  show: PropTypes.bool,
  onClose: PropTypes.func,
}

export default withStyles(styles)(ProfilForm);