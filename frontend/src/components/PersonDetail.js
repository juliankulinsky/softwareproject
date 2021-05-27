import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Paper } from '@material-ui/core';
import { StudooAPI } from '../api';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';

/**
 * Renders a AccountBO object within a ListEntry and provides a delete button to delete it.
 *
 * @see See Material-UIs [Lists](https://material-ui.com/components/lists/)
 * @see See Material-UIs [ListItem](https://material-ui.com/api/list-item/)
 *
 * @author [Christoph Kunz](https://github.com/christophkunz)
 */
class PersonDetail extends Component {

  constructor(props) {
    super(props);

    // Init state
    this.state = {
      person: null,
      loadingInProgress: false,
      loadingError: null,
    };
  }

  /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
  componentDidMount() {
    this.getPerson();
  }

  /** gets the balance for this account */
  getPerson = () => {
    StudooAPI.getAPI().getPerson(this.props.personID).then(person =>
      this.setState({
        person: person,
        loadingInProgress: false,
        loadingError: null
      })).catch(e =>
        this.setState({ // Reset state with error from catch
          person: null,
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
    const { classes, personID } = this.props;
    const { person, loadingInProgress, loadingError } = this.state;

    return (
      <Paper variant='outlined' className={classes.root}>

        <Typography variant='h6'>
          Account
        </Typography>
        {
          person ?
            <Typography>
              Person: {person.getNachname()}, {person.getVorname()}
            </Typography>
            : null
        }
        <LoadingProgress show={loadingInProgress} />
        <ContextErrorMessage error={loadingError} contextErrorMsg={`The data of customer id ${personID} could not be loaded.`} onReload={this.getPerson} />
      </Paper>
    );
  }
}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%',
    padding: theme.spacing(1),
    marginTop: theme.spacing(1)
  }
});

/** PropTypes */
PersonDetail.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The customerID to be rendered */
  personID: PropTypes.string.isRequired
}

export default withStyles(styles)(PersonDetail);
