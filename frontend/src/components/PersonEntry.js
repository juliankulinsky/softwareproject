import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Slider, Card, CardContent, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PersonDeleteDialog from './dialogs/PersonDeleteDialog';
import ProfilForm from "./dialogs/ProfilForm";
import StudooAPI from "../api/StudooAPI";


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
      showProfilForm: true
    });
  }

  /** Handles the onClose event of the ProfilForm */
  profilFormClosed = (person) => {
    console.log("Person", person)
    // customer is not null and therefore changed
    if (person) {
      this.setState({
        person: person,
        showProfilForm: false
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

  /** Handles the onClose event of the ProfilForm */
  profilFormClosedL = (lernvorliebe) => {

    // customer is not null and therefore changed
    if (lernvorliebe) {
      this.setState({
        lernvorliebe: lernvorliebe,
        showProfilForm: false
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
    const marks = [{value: 1, label: '1',}, {value: 5, label: '5',}]
    const {classes, selfperson} = this.props;
    // Use the states customer
    const {person, profil, lernvorliebe, showProfilForm} = this.state;

    return (
        <div>
          <Card className={classes.root}>
            <CardContent max-width="500px" flex-direction="row" align-items="center" justify-content="space-around" >
          {
            selfperson ?
                <ButtonGroup variant='text' size='small'>
                  <Button color='primary' onClick={this.editProfilButtonClicked}>
                    edit
                  </Button>
                </ButtonGroup> :
                null
          }
          {
            person ?
                <Typography className={classes.heading}>
                  Name:&nbsp;
                  {
                    person.getName()
                  }&nbsp;
                  Alter:&nbsp;
                  {
                    person.getAlter()
                  }&nbsp;
                  Wohnort:&nbsp;
                  {
                    person.getWohnort()
                  }&nbsp;
                  Studiengang:&nbsp;
                  {
                    person.getStudiengang()
                  }&nbsp;
                  Semester:&nbsp;
                  {
                    person.getSemester()
                  }
                </Typography>
                : null
          }
          {
            profil ?
                <Typography className={classes.heading}>
                  Beschreibung:&nbsp;
                  {
                    profil.getBeschreibung()
                  }
                </Typography>
                : null
          }
          {
            lernvorliebe ?
                <Grid>
                  <Typography className={classes.heading}>
                    <br/>
                    Lerntyp:&nbsp;
                    {/*
                      lernvorliebe.get_lerntyp()
                    */}
                    <Slider value={lernvorliebe.get_lerntyp()} getAriaValueText={this.valuetext}
                            aria-labelledby="discrete-slider"
                            valueLabelDisplay="on" step={1} marks={marks} min={1} max={5}/>
                    &nbsp;
                    Frequenz:&nbsp;
                    {/*
                      lernvorliebe.get_frequenz()
                    */}
                    <Slider value={lernvorliebe.get_frequenz()} getAriaValueText={this.valuetext}
                            aria-labelledby="discrete-slider"
                            valueLabelDisplay="on" step={1} marks={marks} min={1} max={5}/>
                    &nbsp;
                    Extro:&nbsp;
                    {/*
                      lernvorliebe.get_extrovertiertheit()
                    */}
                    <Slider value={lernvorliebe.get_extrovertiertheit()} getAriaValueText={this.valuetext}
                            aria-labelledby="discrete-slider"
                            valueLabelDisplay="on" step={1} marks={marks} min={1} max={5}/>&nbsp;
                    RemPra:&nbsp;
                    {/*
                      lernvorliebe.get_remote_praesenz()
                    */}
                    <Slider value={lernvorliebe.get_remote_praesenz()} getAriaValueText={this.valuetext}
                            aria-labelledby="discrete-slider"
                            valueLabelDisplay="on" step={1} marks={marks} min={1} max={5}/>&nbsp;
                    Vorkenntnisse:&nbsp;
                    {
                      lernvorliebe.get_vorkenntnisse()
                    }&nbsp;

                    Lerninteressen:&nbsp;
                    {
                      lernvorliebe.get_lerninteressen()
                    }
                  </Typography>
                  </Grid>
                 : null
          }</CardContent>
            </Card>
          {
            <ProfilForm show={showProfilForm} profil={profil} person={person} lernvorliebe={lernvorliebe}
                        onClose={this.profilFormClosed} onCloseP={this.profilFormClosedP}
                        onCloseL={this.profilFormClosedL}/>
          }
        </div>

    );
  }
}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%',
    minWidth: 300,
    maxWidth: 600,
    alignContent: 'center'
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
