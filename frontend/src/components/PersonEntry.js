import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Slider, Card, CardContent, Grid } from '@material-ui/core';
import { Button } from '@material-ui/core';
import ProfilForm from "./dialogs/ProfilForm";
import StudooAPI from "../api/StudooAPI";
import LoadingProgress from "./dialogs/LoadingProgress";
import PersonDeleteDialog from "./dialogs/PersonDeleteDialog";


/**
 *  Zeigt alle Informationen einer Person und deren Lernvorlieben an
 */
class PersonEntry extends Component {

  constructor(props) {
    super(props);

    // Init the state
    this.state = {
      person: props.person,
      lerngruppe: props.lerngruppe,
      lernvorliebe: props.lernvorliebe,
      profil: props.profil,
      showProfilForm: false,
      showPersonDeleteDialog: false,
    };
  }

  /** Handles onAccountDelete events from an AccountListEntry */
  deleteAccountHandler = (deletedAccount) => {
    // console.log(deletedAccount.getID());
    this.setState({
      accounts: this.state.accounts.filter(account => account.getID() !== deletedAccount.getID())
    })
  }

  /** Verarbeitet das onClick Event des Profil anpassen Buttons */
  editProfilButtonClicked = (event) => {
    event.stopPropagation();
    this.setState({
      showProfilForm: true
    });
  }

  /** Verarbeitet das onClose Event der ProfilForm der Person */
  profilFormClosed = (person) => {
    if (person) {
      this.setState({
        person: person,
        showProfilForm: false,
        loadingInProgress: true
      });
    } else {
      this.setState({
        showProfilForm: false,
        loadingInProgress: false
      });
    }
  }

  /** Verarbeitet das onClose Event der ProfilForm des Profils */
  profilFormClosedP = (profil) => {
    if (profil) {
      this.setState({
        profil: profil,
        showProfilForm: false,
        loadingInProgress: true
      });
    } else {
      this.setState({
        showProfilForm: false,
        loadingInProgress: false
      });
    }
  }

  deleteButtonClicked = () => {
      this.setState({
        showPersonDeleteDialog: true
      })
    }

  personDeleteClosed = () => {
    this.setState({
      showPersonDeleteDialog: false
    })}

  /** Verarbeitet das onClose Event der ProfilForm der Lernvorlieben */
  profilFormClosedL = (lernvorliebe) => {

    this.setState({loadingInProgress: true})
    if (lernvorliebe) {
      this.setState({
        lernvorliebe: lernvorliebe,
        showProfilForm: false,
        loadingInProgress: false
      });
    } else {
      this.setState({
        showProfilForm: false,
        loadingInProgress: false
      });
    }
  }

  /** Rendern der Komponente PersonEntry */
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

    const {classes, selfperson, show} = this.props;
    // Use the states customer
    const {person, profil, lernvorliebe, lerngruppe, showProfilForm, showPersonDeleteDialog, loadingInProgress} = this.state;

    return (
           <Card className={classes.root}>
            <CardContent justify-content="" >
              <Grid container>
                  <Grid item xs={6}>
                    {
                      person ?
                          <Typography className={classes.setFontSize}>
                            {
                              person.getName()
                            }
                          </Typography>:null
                    }
                    {
                      lerngruppe ?
                          <Typography className={classes.setFontSize}>
                            {lerngruppe.getGruppenname()}
                          </Typography>
                          : null
                    }
                      <Grid item xs={12} className={classes.pers}>
                      {
                        profil ?
                            <Typography className={classes.heading}>
                              {
                                profil.getBeschreibung()
                              }
                            </Typography>:null
                      }
                      </Grid>
                      <Grid item xs={6} className={classes.pers}>
                        {
                          person ?
                              <Grid container>
                                <Grid xs={12} className={classes.pers}>
                                  <Typography>
                                    Alter:
                                    {
                                      person.getAlter()
                                    }
                                  </Typography>
                                </Grid>
                                <Grid xs={12} className={classes.pers}>
                                <Typography>
                                  Wohnort:
                                  {
                                    person.getWohnort()
                                  }
                                </Typography>
                                </Grid>
                                <Grid xs={12} className={classes.pers}>
                                <Typography>
                                  Studiengang:
                                  {
                                    person.getStudiengang()
                                  }
                                </Typography>
                                </Grid>
                                <Grid xs={12} className={classes.pers}>
                                <Typography>
                                  Semester:
                                  {
                                    person.getSemester()
                                  }
                                </Typography>
                                </Grid>
                                <Grid xs={7} className={classes.pers}>
                                  {
                                    selfperson ?
                                        <Button variant={"contained"} color='primary'
                                                onClick={this.editProfilButtonClicked}>
                                          Profil anpassen
                                        </Button>:null
                                  }
                                </Grid>
                                <Grid xs={1} className={classes.pers}>

                                </Grid>
                                <Grid xs={4} className={classes.pers}>
                                  {
                                    selfperson ?
                                        <Button variant={"contained"} color={"secondary"} onClick={this.deleteButtonClicked}>
                                            Profil löschen
                                        </Button>: null
                                  }
                                </Grid>
                              </Grid>:null
                        }
                      </Grid>
                  </Grid>
                  <Grid xs={5}>
                    {
                      lernvorliebe ?
                          <div className={classes.lern}>
                                <Typography className={classes.setFontSize}>
                                  Lernvorlieben
                                </Typography>
                            <div className={classes.slid}>
                                <Typography className={classes.heading}>
                                  Lerntyp:&nbsp;
                                  <Slider value={lernvorliebe.get_lerntyp()} getAriaValueText={this.valuetext}
                                          aria-labelledby="discrete-slider"
                                          valueLabelDisplay="off"  step={1} marks={marksLerntyp} min={1} max={4}/>
                                  &nbsp;
                                  Frequenz:&nbsp;
                                  <Slider value={lernvorliebe.get_frequenz()} getAriaValueText={this.valuetext}
                                          aria-labelledby="discrete-slider"
                                          valueLabelDisplay="off"  step={1} marks={marksfrequenz} min={1} max={5}/>
                                  &nbsp;
                                  Extrovertiertheit:&nbsp;
                                  <Slider value={lernvorliebe.get_extrovertiertheit()} getAriaValueText={this.valuetext}
                                          aria-labelledby="discrete-slider"
                                          valueLabelDisplay="off"  step={1} marks={marksExtro} min={1} max={5}/>&nbsp;
                                  Remote/Präsenz:&nbsp;
                                  <Slider value={lernvorliebe.get_remote_praesenz()} getAriaValueText={this.valuetext}
                                          aria-labelledby="discrete-slider"
                                          valueLabelDisplay="off"  step={1} marks={marksRemote} min={1} max={5}/>&nbsp;
                                </Typography>
                            </div>
                                <div>
                                  <Typography>
                                    Vorkenntnisse:&nbsp;
                                    {
                                      lernvorliebe.get_vorkenntnisse()
                                    }&nbsp;
                                  </Typography>
                                  <Typography>
                                    Lerninteressen:&nbsp;
                                    {
                                      lernvorliebe.get_lerninteressen()
                                    }
                                  </Typography>
                                </div>
                          </div>:null
                    }
                  </Grid>
                </Grid>
              {/** Aufruf der ProfilForm Komponente zum Bearbeiten der Informationen des Profils.
               Properties welche übergeben werden sind: show, profil, person und lernvorlieben. Zusätzlich die
               passenden OnClose Funktionen.
               */}
          <ProfilForm show={showProfilForm} profil={profil} person={person} lernvorliebe={lernvorliebe}
                        onClose={this.profilFormClosed} onCloseP={this.profilFormClosedP}
                        onCloseL={this.profilFormClosedL}  />
          <PersonDeleteDialog show={showPersonDeleteDialog} profil={profil} person={person} lernvorliebe={lernvorliebe}
                        onClose={this.personDeleteClosed} />
          <LoadingProgress show={loadingInProgress} />
          </CardContent>
          </Card>
    );
  }
}

/** Komponent-spezifische Styles */
const styles = theme => ({
  root: {
    width: '100%',
    minWidth: 410,
    maxWidth: 750,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '2%'
  },
  setFontSize: {
    fontSize: 30
  },
  lern:{
    maxWidth: '90%'
  },
  slid:{
    paddingTop: '3%',
    paddingLeft: '3%',
    maxWidth: '90%',
    backgroundColor: 'White'
  },
  pers:{
    paddingTop: '5%',
    backgroundColor: 'White'
  }
});

/** PropTypes */
PersonEntry.propTypes = {
  /** @ignore */
  //classes: PropTypes.object.isRequired,
  person: PropTypes.object.isRequired,
  profil: PropTypes.object.isRequired,
  lernvorliebe: PropTypes.object.isRequired
}

export default withStyles(styles)(PersonEntry);
