import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
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
    const {classes, selfperson} = this.props;
    // Use the states customer
    const {person, profil, lernvorliebe, showProfilForm} = this.state;

    return (
        <div>
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
                  Name:
                  {
                    person.getName()
                  }
                  Alter:
                  {
                    person.getAlter()
                  }
                  Wohnort:
                  {
                    person.getWohnort()
                  }
                  Studiengang:
                  {
                    person.getStudiengang()
                  }
                  Semester:
                  {
                    person.getSemester()
                  }
                </Typography>
                : null
          }
          {
            profil ?
                <Typography className={classes.heading}>
                  Beschreibung:
                  {
                    profil.getBeschreibung()
                  }
                </Typography>
                : null
          }
          {
            lernvorliebe ?
                <Typography className={classes.heading}>
                  Lerntyp:
                  {
                    lernvorliebe.get_lerntyp()
                  }

                  Frequenz:
                  {
                    lernvorliebe.get_frequenz()
                  }

                  Extro:
                  {
                    lernvorliebe.get_extrovertiertheit()
                  }

                  RemPra:
                  {
                    lernvorliebe.get_remote_praesenz()
                  }

                  Vorkenntnisse:
                  {
                    lernvorliebe.get_vorkenntnisse()
                  }

                  Lerninteressen:
                  {
                    lernvorliebe.get_lerninteressen()
                  }
                </Typography> : null
          }
          {
            <ProfilForm show={showProfilForm} profil={profil} person={person} lernvorliebe={lernvorliebe}
                        onClose={this.profilFormClosed} onCloseP={this.profilFormClosedP} onCloseL={this.profilFormClosedL}/>
          }
        </div>

    );
  }
}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%',
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
