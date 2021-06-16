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
  profilFormClosed = (person, lernvorliebe) => {
    // customer is not null and therefor changed
    if (person && lernvorliebe) {
      this.setState({
        person: person,
        lernvorliebe: lernvorliebe,
        showProfilForm: false
      });
    } else {
      this.setState({
        showProfilForm: false
      });
    }
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
          {
          <ProfilForm show={showProfilForm} person={person} lernvorliebe={lernvorliebe} onClose={this.profilFormClosed} />
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
  expandedState: PropTypes.bool.isRequired,
  onExpandedStateChange: PropTypes.func.isRequired,
  onProfilDeleted: PropTypes.func.isRequired
}

export default withStyles(styles)(PersonEntry);
