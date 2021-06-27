import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    withStyles
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import StudooAPI from '../api/StudooAPI'
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import EineLernvorliebe from "./EineLernvorliebe";


/**
 * Gets the currently logged in Person and displays information of PersonBO and LernvorliebenBO
 * */
class AktuellesProfil extends Component {

    constructor(props) {
        super(props);

        this.state = {
            profil: null,
            person: props.person,
            error: null
        }
    }

    /**
     * API Call eines Profil Objektes der angemeldeten Person anhand der Profil ID welche in PersonBO gespeichert ist
     * */
    getProfil = () => {
        StudooAPI.getAPI().getProfil(this.props.person.getProfilId())
        .then(profilBO => {
            this.setState({
                profil: profilBO,
                error: null
            });
        }).catch(e => this.setState({
            profil: "No profil received.",
            error: e
        }));

        this.setState({
            loadingInProgress: true,
            error: null
        });
    }

    /** Lifecycle Methode, welche aufgerufen wird wenn die Komponente in den DOM des Browsers eingefügt wird */
    componentDidMount() {
    this.getProfil();
    }

  /** Rendern der Komponente AktuellesProfil */
    render() {
        const {selfperson} = this.props;
        const {profil, person, error} = this.state;
        return (
            <div>
                {
                    profil ?
                        /** Aufruf der Komponente EineLernvorliebe mit den Properties lvId, person, profil und selfperson */
                        <EineLernvorliebe lvId={profil.getLernvorliebeID()} person={person} profil={profil} selfperson={selfperson} />
                    : null
                }
                <ContextErrorMessage
                    error={error} contextErrorMsg={`Nicht geklappt`}
                    onReload={this.getProfile}
                />
            </div>
        )
    }
}


/** Komponent-spezifische Styles */
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
AktuellesProfil.propTypes = {
    /** @ignore */
}

export default withRouter(withStyles(styles)(AktuellesProfil));