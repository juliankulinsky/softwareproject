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

    // Init an empty state
    this.state = {
      personen: null,
      error: null,
      loadingInProgress: false
    };
  }

  /** Fetches all PersonenBO from the backend */
  getPersonen = () => {
    StudooAPI.getAPI().getPersonen()
        .then(personenBOs => this.setState({
        personen: personenBOs,
        loadingInProgress: false,
        error: null
      }));

    // set loading to true
    this.setState({
      loadingInProgress: true,
      error: null
    });
  }

  /** Fetches the current logged in PersonenBO from the backend with the user id */
  getCurrentPerson = () => {
    StudooAPI.getAPI().getPersonByUID(this.props.user.uid)
        .then(personenBOs => this.setState({
        personen: personenBOs,
        loadingInProgress: false,
        error: null
      }));

    // set loading to true
    this.setState({
      loadingInProgress: true,
      error: null
    });
  }

  /** Lifecycle method, which is called when the component gets inserted into the browsers DOM*/
  componentDidMount() {
    this.getCurrentPerson();
  }

  /** Renders the component */
  render() {
    const { classes } = this.props;
    const { personen, loadingInProgress, error } = this.state;

    return (
      <div className={classes.root}>
        TEST
        {
          personen ?
            <PersonListEntry
                person={personen}
            />
              : null
        }
        {/*
            personen.map(person =>
            <PersonListEntry key={person.getID()}
              person ={person}
            />)
            />
          )*/
        }
        <LoadingProgress show={loadingInProgress} />
        <ContextErrorMessage error={error} contextErrorMsg={`The list of personen could not be loaded.`} onReload={this.getCurrentPerson} />
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