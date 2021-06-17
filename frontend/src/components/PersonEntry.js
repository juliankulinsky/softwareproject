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
    // customer is not null and therefor changed
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
  profilFormClosedL = (lernvorliebe) => {
    console.log("Lernvorliebe", lernvorliebe)
    // customer is not null and therefor changed
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
    //window.location.reload();
  }

  /** Renders the component */
  render() {
    const { classes, expandedState } = this.props;
    // Use the states customer
    const { person, lernvorliebe, showProfilForm } = this.state;

     console.log(this.state);
    return (
        <div>
          <ButtonGroup variant='text' size='small'>
                  <Button color='primary' onClick={this.editProfilButtonClicked}>
                    edit
                  </Button>
            </ButtonGroup>
            <Typography className={classes.heading}>
                Name:
                {
                  person ?
                    person.getName()
                      :null
                }
                  Alter:
                {
                  person ?
                    person.getAlter()
                      :null
                }
                  Wohnort:
                {
                  person ?
                    person.getWohnort()
                      :null
                }
                  Studiengang:
                {
                  person ?
                    person.getStudiengang()
                      :null
                }
                  Semester:
                {
                  person ?
                    person.getSemester()
                      :null
                }
            </Typography>
          {
          <ProfilForm show={showProfilForm} person={person} lernvorliebe={lernvorliebe} onClose={this.profilFormClosed} onCloseL={this.profilFormClosedL} />
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
  lernvorliebe: PropTypes.object.isRequired,
  expandedState: PropTypes.bool.isRequired,
  onExpandedStateChange: PropTypes.func.isRequired,
  onProfilDeleted: PropTypes.func.isRequired
}

export default withStyles(styles)(PersonEntry);
