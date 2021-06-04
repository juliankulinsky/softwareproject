import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, TextField, InputAdornment, IconButton, Grid, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear'
import { withRouter } from 'react-router-dom';
import { StudooAPI } from '../api';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import PersonForm from './dialogs/PersonForm';
import PersonListEntry from './PersonListEntry';
import TestListEntry from './TestListEntry';

/**
 * Controlls a list of CustomerListEntrys to create a accordion for each customer.
 *
 * @see See [CustomerListEntry](#customerlistentry)
 *
 * @author [Christoph Kunz](https://github.com/christophkunz)
 */
class PersonenList extends Component {

  constructor(props) {
    super(props);

    // console.log(props);
    let expandedID = null;

    if (this.props.location.expandPerson) {
      expandedID = this.props.location.expandPerson.getID();
    }

    // Init an empty state
    this.state = {
      personen: [],
      filteredPersonen: [],
      personFilter: '',
      error: null,
      loadingInProgress: false,
      expandedPersonID: expandedID,
      showPersonForm: false
    };
  }

  /** Fetches all PersonenBO from the backend */
  getPersonen = () => {
    StudooAPI.getAPI().getPersonen()
      .then(personBOs =>
        this.setState({               // Set new state when CustomerBOs have been fetched
          personen: personBOs,
          filteredPersonen: [...personBOs], // store a copy
          loadingInProgress: false,   // disable loading indicator
          error: null
        })).catch(e =>
          this.setState({             // Reset state with error from catch
            personen: [],
            loadingInProgress: false, // disable loading indicator
            error: e
          })
        );

    // set loading to true
    this.setState({
      loadingInProgress: true,
      error: null
    });
  }

  /** Lifecycle method, which is called when the component gets inserted into the browsers DOM
  componentDidMount() {
    this.getPersonen();
  }
*/
  /**
   * Handles onExpandedStateChange events from the CustomerListEntry component. Toggels the expanded state of
   * the CustomerListEntry of the given CustomerBO.
   *
   * @param {PersonBO} person of the CustomerListEntry to be toggeled
   */
  onExpandedStateChange = person => {
    // console.log(personID);
    // Set expandend person entry to null by default
    let newID = null;

    // If same person entry is clicked, collapse it else expand a new one
    if (person.getID() !== this.state.expandedPersonID) {
      // Expand the customer entry with customerID
      newID = person.getID();
    }
    // console.log(newID);
    this.setState({
      expandedPersonID: newID,
    });
  }

  /**
   * Handles onCustomerDeleted events from the CustomerListEntry component
   *
   * @param {PersonBO} person of the CustomerListEntry to be deleted
   */
  personDeleted = person => {
    const newPersonList = this.state.personen.filter(personFromState => personFromState.getID() !== person.getID());
    this.setState({
      personen: newPersonList,
      filteredPersonen: [...newPersonList],
      showPersonForm: false
    });
  }

  /** Handles the onClick event of the add customer button */
  addPersonButtonClicked = event => {
    // Do not toggle the expanded state
    event.stopPropagation();
    //Show the PersonForm
    this.setState({
      showPersonForm: true
    });
  }

  /** Handles the onClose event of the CustomerForm */
  personFormClosed = person => {
    // customer is not null and therefore created
    if (person) {
      const newPersonList = [...this.state.personen, person];
      this.setState({
        personen: newPersonList,
        filteredPersonen: [...newPersonList],
        showPersonForm: false
      });
    } else {
      this.setState({
        showPersonForm: false
      });
    }
  }

  /** Handels onChange events of the customer filter text field */
  filterFieldValueChange = event => {
    const value = event.target.value.toLowerCase();
    this.setState({
      filteredPersonen: this.state.personen.filter(person => {
        let vornameContainsValue = person.getVorname().toLowerCase().includes(value);
        let nachnameContainsValue = person.getNachname().toLowerCase().includes(value);
        return vornameContainsValue || nachnameContainsValue;
      }),
      personFilter: value
    });
  }

  /** Handles the onClose event of the clear filter button */
  clearFilterFieldButtonClicked = () => {
    // Reset the filter
    this.setState({
      filteredPersonen: [...this.state.personen],
      personFilter: ''
    });
  }

  /** Renders the component */
  render() {
    const { classes } = this.props;
    const { filteredPersonen, personFilter, expandedPersonID, loadingInProgress, error, showPersonForm } = this.state;

    return (
      <div className={classes.root}>
        <Grid className={classes.personFilter} container spacing={1} justify='flex-start' alignItems='center'>
          <Grid item>
            <Typography>
              Filter person list by name:
              </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              autoFocus
              fullWidth
              id='personFilter'
              type='text'
              value={personFilter}
              onChange={this.filterFieldValueChange}
              InputProps={{
                endAdornment: <InputAdornment position='end'>
                  <IconButton onClick={this.clearFilterFieldButtonClicked}>
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs />
          <Grid item>
            <Button variant='contained' color='primary' startIcon={<AddIcon />} onClick={this.addPersonButtonClicked}>
              Add Person
          </Button>
          </Grid>
        </Grid>
        {
          // Show the list of CustomerListEntry components
          // Do not use strict comparison, since expandedCustomerID maybe a string if given from the URL parameters
          filteredPersonen.map(person =>
            <PersonListEntry key={person.getID()} person={person} expandedState={expandedPersonID === person.getID()}
              onExpandedStateChange={this.onExpandedStateChange}
              onPersonDeleted={this.personDeleted}
            />)
        }
        <LoadingProgress show={loadingInProgress} />
        <ContextErrorMessage error={error} contextErrorMsg={`The list of personen could not be loaded.`} onReload={this.getPersonen} />
        <PersonForm show={showPersonForm} onClose={this.personFormClosed} />
      </div>
    );
  }
}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%',
  },
  personFilter: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  }
});

/** PropTypes */
PersonenList.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** @ignore */
  location: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(PersonenList));