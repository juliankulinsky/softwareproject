import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Typography, withStyles} from '@material-ui/core';
import {StudooAPI} from '../api';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import PersonDetail from './PersonDetail';

/**
 * Shows all accounts of the bank.
 *
 * @author [Christoph Kunz](https://github.com/christophkunz)
 */
class AllPersonenList extends Component {

  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
      personen: [],
      loadingInProgress: false,
      loadingError: null,
    };
  }

  /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
  componentDidMount() {
    this.loadPersonen();
  }

  /** gets the account list for this account */
  loadPersonen = () => {
    StudooAPI.getAPI().getPersonen()
        .then(personen =>
      this.setState({
        personen: personen,
        loadingInProgress: false, // loading indicator
        loadingError: null
      })).catch(e =>
        this.setState({ // Reset state with error from catch
          loadingInProgress: false,
          loadingError: e
        })
      );

    // set loading to true
    this.setState({
      loadingInProgress: true,
      loadingError: null
    });
  }

  /** Renders the component */
  render() {
    const { classes } = this.props;
    const { personen, loadingInProgress, loadingError } = this.state;

    return (
      <div className={classes.root}>
          {
            personen.map(person => <PersonDetail key={person.getID()}
            personID={person.getID().toString()}/>)
          }
          <Typography variant='h6'>
          Account
        </Typography>
          <LoadingProgress show={loadingInProgress} />
          <ContextErrorMessage error={loadingError} contextErrorMsg={`The list of all accounts of the bank could not be loaded.`} onReload={this.loadPersonen} />
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
AllPersonenList.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(AllPersonenList);