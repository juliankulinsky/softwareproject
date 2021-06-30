import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    withStyles
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import StudooAPI from '../api/StudooAPI'
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import PersonEntry from "./PersonEntry";


/** Liest ein einzelnes Lernvorliebe-Objekt aus der Datenbank der aktuellen Person anhand des Profils aus */
class EineLernvorliebe extends Component {

    constructor(props) {
        super(props);

        this.state = {
            lernvorliebe: null,
            person: props.person,
            error: null,
            loadingInProgress: false
        };
    }

    /**
     * API Call eines Lernvorlieben Objektes der angemeldeten Person anhand der Lernvorliebe ID welche in ProfilBO
     * gespeichert ist
     * */
    getLernvorliebe = () => {
        StudooAPI.getAPI().getLernvorliebe(this.props.lvId)
            .then(lernvorliebeBO => {
                this.setState({
                    lernvorliebe: lernvorliebeBO,
                    error: null,
                    loadingInProgress: false
                });
            }).catch(e => this.setState({
            personen: ["wtf"],
            error: e,
            loadingInProgress: false
        }));

        this.setState({
            loadingInProgress: true,
            error: null
        });
    }

    /** Lifecycle Methode, welche aufgerufen wird wenn die Komponente in den DOM des Browsers eingefügt wird */
    componentDidMount() {
        this.getLernvorliebe();
    }

    /** Rendern der Komponente EineLernvorliebe */
    render() {
        const {selfperson, profil} = this.props;
        const {lernvorliebe, person, error, loadingInProgress} = this.state;

        return (
            <div>
                {
                    person ?
                        profil ?
                            lernvorliebe ?
                                /** Aufruf der Komponente PersonEntry mit den Properties profil, person, lernvorliebe und
                                * selfperson */
                                <PersonEntry profil={profil} person={person} lernvorliebe={lernvorliebe} selfperson={selfperson}/>
                            : null
                        :null
                    :null
                }
                <LoadingProgress show={loadingInProgress}/>
                <ContextErrorMessage
                    error={error} contextErrorMsg={`Nicht geklappt`}
                    onReload={this.getLernvorlieben}
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
EineLernvorliebe.propTypes = {
  /** @ignore */
  classes: PropTypes.object
}

export default withRouter(withStyles(styles)(EineLernvorliebe));