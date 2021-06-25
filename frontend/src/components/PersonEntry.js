import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Slider, Card, CardContent, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PersonDeleteDialog from './dialogs/PersonDeleteDialog';
import ProfilForm from "./dialogs/ProfilForm";
import StudooAPI from "../api/StudooAPI";
import LoadingProgress from "./dialogs/LoadingProgress";


/**
 *  Displays all information of a single Person
 */
class PersonEntry extends Component {

  constructor(props) {
    super(props);

    // Init the state
    this.state = {
      person: props.person,
      lernvorliebe: props.lernvorliebe,
      profil: props.profil,
      showProfilForm: false,
      showProfilDeleteDialog: false,
    };
  }

  /** Handles onAccountDelete events from an AccountListEntry */
  deleteAccountHandler = (deletedAccount) => {
    // console.log(deletedAccount.getID());
    this.setState({
      accounts: this.state.accounts.filter(account => account.getID() !== deletedAccount.getID())
    })
  }

  /** Handles the onClick event of the edit person button */
  editProfilButtonClicked = (event) => {
    event.stopPropagation();
    this.setState({
      showProfilForm: true,
      loadingInProgress: true
    });
  }

  /** Handles the onClose event of the ProfilForm */
  profilFormClosed = (person) => {
    console.log("Person", person)
    // customer is not null and therefore changed
    if (person) {
      this.setState({
        person: person,
        showProfilForm: false,
        loadingInProgress: true
      });
    } else {
      this.setState({
        showProfilForm: false
      });
    }
  }

  /** Handles the onClose event of the ProfilForm */
  profilFormClosedP = (profil) => {

    // customer is not null and therefore changed
    if (profil) {
      this.setState({
        profil: profil,
        showProfilForm: false
      });
    } else {
      this.setState({
        showProfilForm: false
      });
    }
  }

  deletePerson = () => {
      StudooAPI.getAPI().deletePerson(this.props.person.getID())
    }

  /** Handles the onClose event of the ProfilForm */
  profilFormClosedL = (lernvorliebe) => {

    this.setState({loadingInProgress: true})
    // customer is not null and therefore changed
    if (lernvorliebe) {
      this.setState({
        lernvorliebe: lernvorliebe,
        showProfilForm: false,
        loadingInProgress: false
      });
    } else {
      this.setState({
        showProfilForm: false
      });
    }
    console.log("Lernvorliebe", lernvorliebe)
    //window.location.reload();
  }

  /** Renders the component */
  render() {
    const marksLerntyp = [{value: 1, label: 'Motorisch',},{value: 2, label: 'Auditiv',},,{value: 3,
      label: 'Kommunikativ',}, {value: 4, label: 'Visuell',}]
    const marks = [{value: 1, label: '1',},{value: 2, label: '2',},,{value: 3,
      label: '3',}, {value: 4, label: '4',}, {value: 5, label: '5',}]
    const marksfrequenz = [{value: 1, label: 'Selten',},{value: 2, label: '',},,{value: 3,
      label: '',}, {value: 4, label: '',}, {value: 5, label: 'häufig',}]
    const marksExtro = [{value: 1, label: 'Introvertiert',},{value: 2, label: '',},,{value: 3,
      label: '',}, {value: 4, label: '',}, {value: 5, label: 'Extrovertiert',}]
    const marksRemote = [{value: 1, label: 'Präsenz',},{value: 2, label: '',},,{value: 3,
      label: '',}, {value: 4, label: '',}, {value: 5, label: 'Remote',}]
    const {classes, selfperson, show} = this.props;
    // Use the states customer
    const {person, profil, lernvorliebe, showProfilForm, loadingInProgress} = this.state;

    return (
           <Card className={classes.root}>
            <CardContent justify-content="" >
              <Grid container spacing={3}>
                  <Grid xs={12}>
                    {/*
                      selfperson ?
                        <ButtonGroup variant='text' size='small'>
                          <Button variant={"contained"} color='primary' onClick={this.editProfilButtonClicked}>
                            edit
                          </Button>
                        </ButtonGroup>:null*/
                    }
                  </Grid>
                  <Grid item xs={6}>
                    {
                      person ?
                          <Typography className={classes.setFontSize}>
                            {
                              person.getName()
                            }
                          </Typography>:null
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
                                        <Button variant={"contained"} color={"secondary"} onClick={this.deletePerson}>
                                            Profil löschen
                                        </Button>: null

                                  }

                                </Grid>
                              </Grid>:null
                        }
                      </Grid>
                  </Grid>{
               /* <Grid item xs={2}>

                </Grid>
              */}
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
                                  {/*
                                    lernvorliebe.get_lerntyp()
                                  */}
                                  <Slider value={lernvorliebe.get_lerntyp()} getAriaValueText={this.valuetext}
                                          aria-labelledby="discrete-slider"
                                          valueLabelDisplay="off"  step={1} marks={marksLerntyp} min={1} max={4}/>
                                  &nbsp;
                                  Frequenz:&nbsp;
                                  {/*
                                    lernvorliebe.get_frequenz()
                                  */}
                                  <Slider value={lernvorliebe.get_frequenz()} getAriaValueText={this.valuetext}
                                          aria-labelledby="discrete-slider"
                                          valueLabelDisplay="off"  step={1} marks={marksfrequenz} min={1} max={5}/>
                                  &nbsp;
                                  Extrovertiertheit:&nbsp;
                                  {/*
                                    lernvorliebe.get_extrovertiertheit()
                                  */}
                                  <Slider value={lernvorliebe.get_extrovertiertheit()} getAriaValueText={this.valuetext}
                                          aria-labelledby="discrete-slider"
                                          valueLabelDisplay="off"  step={1} marks={marksExtro} min={1} max={5}/>&nbsp;
                                  Remote/Präsenz:&nbsp;
                                  {/*
                                    lernvorliebe.get_remote_praesenz()
                                  */}
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

          <ProfilForm show={showProfilForm} profil={profil} person={person} lernvorliebe={lernvorliebe}
                        onClose={this.profilFormClosed} onCloseP={this.profilFormClosedP}
                        onCloseL={this.profilFormClosedL}  />
          <LoadingProgress show={loadingInProgress} />
          </CardContent>
          </Card>
    );
  }
}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%',
    minWidth: 410,
    maxWidth: 750,
    marginLeft: 'auto',
    marginRight: 'auto'
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
