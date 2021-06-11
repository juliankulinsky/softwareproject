import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withStyles, Button, TextField, InputAdornment, IconButton, Grid, Typography, Avatar} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear'
import { withRouter } from 'react-router-dom';
import { StudooAPI } from '../api';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import PersonForm from './dialogs/PersonForm';
import PersonListEntry from './PersonListEntry';
import {PersonBO} from "../api";
import LernvorliebenList from "./LernvorliebenList";
import AllNachrichten from "./AllNachrichten";
import AllProfile from "./AllProfile";
import AktuellesProfil from "./AktuellesProfil";
import PersonEntry from "./PersonEntry";

/**
 * Controlls a list of CustomerListEntrys to create a accordion for each customer.
 *
 * @see See [CustomerListEntry](#customerlistentry)
 *
 * @author [Christoph Kunz](https://github.com/christophkunz)
 */
class ProfilVorschau extends Component {

  constructor(props) {
    super(props);

    // console.log(props);
    let expandedID = null;

    if (this.props.location.expandPerson) {
      expandedID = this.props.location.expandPerson.getID();
    }

    // Init an empty state
    this.state = {
      person: props.person,
      error: null,
      loadingInProgress: false
    };
  }

  /** Lifecycle method, which is called when the component gets inserted into the browsers DOM*/
  componentDidMount() {

  }

  /** Renders the component */
  render() {
    const {classes, user} = this.props;
    const {
      person,
      loadingInProgress,
      error
    } = this.state;

    return (
        <div className={classes.root}>
          <IconButton className={classes.avatarButton}  >
            <Avatar src={user.photoURL} />
          </IconButton>

            {
            person ?
                <PersonEntry key={person.getID()}
                    person={person}
                />
                : null
          }
          {/*
            person ?
                <AktuellesProfil person={person}/>
                : null*/
          }
          <LoadingProgress show={loadingInProgress}/>
          <ContextErrorMessage error={error} contextErrorMsg={`The list of personen could not be loaded.`}
                               onReload={this.getPerson}/>
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
ProfilVorschau.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** @ignore */
  location: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(ProfilVorschau));