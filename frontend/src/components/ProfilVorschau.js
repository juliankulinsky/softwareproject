import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { StudooAPI } from '../api';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import AktuellesProfil from "./AktuellesProfil";

/**
 * Hier wird die Vorschau des Profils initional angestoßen, diese Komponente ruft über die gegebene Person
 * alle zugehörigen Informationen dazu auf.
 */
class ProfilVorschau extends Component {

  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
      person: null,
      deleteButtonPressed: false,
      error: null,
      loadingInProgress: false
    };
  }

  /**
   * API Call eines Person Objekts aus der Datenbank anhand der Google User ID des aktuell angemeldeten Benutzer
   * */
  getCurrentPerson = () => {
    StudooAPI.getAPI().getPersonByUID(this.props.person.getGoogleUserID())
        .then(personBO => {
            this.setState({
                person: personBO,
                error: null,
                loadingInProgress: false
            });
        }).catch(e => this.setState({
            profil: "No profil received.",
            error: e,
            loadingInProgress: false
        }));
	}


	deletePerson = () => {
      this.setState({
          deleteButtonPressed: true,
      })
      StudooAPI.getAPI().deletePerson(this.props.person.getID())
    }

  /** Lifecycle Methode, welche aufgerufen wird wenn die Komponente in den DOM des Browsers eingefügt wird */
  componentDidMount() {
    this.getCurrentPerson()
  }

  /** Rendern der Komponente ProfilVorschau */
  render() {
    const { selfperson} = this.props;
    const { person, loadingInProgress, error } = this.state;

    return (
        <div>
            {
            person ?
                /** Aufruf der Komponente AktuellesProfil mit den Properties person und selfperson */
                <AktuellesProfil person={person} selfperson={selfperson}/>
                : null
          }
          <LoadingProgress show={loadingInProgress}/>
          <ContextErrorMessage error={error} contextErrorMsg={`The list of personen could not be loaded.`}
                               onReload={this.getCurrentPerson}/>
        </div>
    );
  }
}

/** Komponent-spezifische Styles */
const styles = theme => ({
  root: {
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  personFilter: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  avatarButton: {
    marginLeft: 'auto',
    marginRight: 'auto'
  }
});

/** PropTypes */
ProfilVorschau.propTypes = {
  /** @ignore */
  classes: PropTypes.object
}

export default withRouter(withStyles(styles)(ProfilVorschau));