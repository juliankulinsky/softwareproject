import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { StudooAPI } from '../api';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import AktuellesLerngruppenProfil from "./AktuellesLerngruppenProfil";

/**
 * Rendert die Profilvorschau einer gematcheten Gruppe
 * zur Förderung der Entscheidungsfindung der Person, die den Vorschlag erhält.
 *
 */

class GruppenProfilVorschau extends Component {

  constructor(props) {
    super(props);
    let expandedID = null;

    if (this.props.location.expandPerson) {
      expandedID = this.props.location.expandPerson.getID();
    }

    // Initialisieren eines leeren States
    this.state = {
      lerngruppe: props.lerngruppe,
      deleteButtonPressed: false,
      error: null,
      loadingInProgress: false
    };
  }

  /**
   * API Call eines Lerngruppen-Objekts aus der Datenbank anhand der ID der aus den props übergebenen Lerngruppe.
   * */
  getCurrentLerngruppe = () => {
    StudooAPI.getAPI().getLerngruppe(this.props.lerngruppe.getID())
        .then(lerngruppeBO => {
            this.setState({
                lerngruppe: lerngruppeBO,
                error: null,
                loadingInProgress: false
            });
        }).catch(e => this.setState({
            lerngruppe: "No group received.",
            error: e,
            loadingInProgress: false
        }));
	}

  /**  Methode, die die Lerngruppe löscht */
	deleteLerngruppe = () => {
      this.setState({
          deleteButtonPressed: true,
      })
      StudooAPI.getAPI().deleteLerngruppe(this.props.lerngruppe.getID())
    }

  /** Lifecycle Methode, welche aufgerufen wird wenn die Komponente in den DOM des Browsers eingefügt wird */
  componentDidMount() {
    this.getCurrentLerngruppe()
  }

  /** Rendern der Komponente ProfilVorschau */
  render() {
    const {selfperson} = this.props;
    const { deleteButtonPressed, lerngruppe, loadingInProgress, error } = this.state;

    return (
        <div>
            {
            lerngruppe ?
                /** Aufruf der Komponente AktuellesProfil mit den Properties person und selfperson */
                <AktuellesLerngruppenProfil lerngruppe={lerngruppe} selfperson={selfperson}/>
                : null
          }
          <LoadingProgress show={loadingInProgress}/>
          <ContextErrorMessage error={error} contextErrorMsg={`The list of groups could not be loaded.`}
                               onReload={this.getCurrentLerngruppe}/>
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
GruppenProfilVorschau.propTypes = {
  /** @ignore */
  classes: PropTypes.object,
  /** @ignore */
  location: PropTypes.object,
}

export default withRouter(withStyles(styles)(GruppenProfilVorschau));