import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PersonForm from './dialogs/PersonForm';
import PersonDeleteDialog from './dialogs/PersonDeleteDialog';
import {PartnerVorschlagBO, StudooAPI} from "../api";
import LoadingProgress from "./dialogs/LoadingProgress";
import ContextErrorMessage from "./dialogs/ContextErrorMessage";
import TeilnehmerListEntry from "./TeilnehmerListEntry";
import PopUpProfil from "./dialogs/PopUpProfil";
//import AccountList from './AccountList';

/**
 * Rendert eine ausgehende KonversationsAnfrage mit der Option, diese zurückzuziehen.
 * Es handelt sich um ein spezifisches PartnerVorschlagBO-Objekt, das als Props übergeben wurde,
 * welches durch den "Zurückziehen"-Button bearbeitet werden kann.
 */
class AusgehendeKonversationsAnfragenListEntry extends Component {
    constructor(props) {
        super(props);

        this.state = {
            anfrage: this.props.anfrage,
            anderePerson: null,
            matchpoints: this.props.anfrage.getMatchpoints(),
            buttonPressed: false,
            showProfilPopUp: false
        }
    }

    /**
     * Lädt die andere Person des PartnerVorschlagBO aus dem Backend. Falls die "Person" des Vorschlags die aktuelle
     * Person ist, wird der "Partner" des Vorschlags geladen, und falls der "Partner" des Vorschlags die aktuelle Person
     * ist, wird die "Person" des Vorschlags geladen.
     */
    getAnderePerson = () => {
        if (this.props.person.getID() === this.state.anfrage.getPersonID()) {
            StudooAPI.getAPI().getPerson(this.state.anfrage.getPartnerID())
                .then(anderePerson =>
                    this.setState({
                        anderePerson: anderePerson
                    }))
        } else if (this.props.person.getID() === this.state.anfrage.getPartnerID()) {
            StudooAPI.getAPI().getPerson(this.state.anfrage.getPersonID())
                .then(anderePerson =>
                    this.setState({
                        anderePerson: anderePerson
                    }))
        }
    }

    /**
     * Updaten des PartnerVorschlagBO ausgelöst durch den "Zurückziehen"-Button, wobei die Matchpoints um 1 niedriger
     * gesetzt werden, was bedeutet, dass die ausgehende KonversationsAnfrage zurückgezogen wird.
     */
    updateKonversationsAnfrage = () => {
        this.setState({
            buttonPressed: true
        })
        let updatedPartnerVorschlag = Object.assign(new PartnerVorschlagBO(), this.state.anfrage);
        updatedPartnerVorschlag.setMatchpoints(this.state.matchpoints -= 1)
        StudooAPI.getAPI().updatePartnerVorschlag(updatedPartnerVorschlag)
            .then(partnerVorschlag => {
                this.setState({
                    updatingInProgress: false,
                    updatingError: null
                });
                this.baseState.entscheidung = this.state.entscheidung;
            }).catch(e =>
            this.setState({
                updatingInProgress: false,
                updatingError: e
            }));
        this.setState({
            updatingInProgress: true,
            updatingError: null
        })
    }

    /** Handhabt das onClick-Event des Popup-Person-Buttons */
    popUpButtonClicked = (event) => {
        event.stopPropagation();
        this.setState({
          showProfilPopUp: true
        });
    }

    /** Handhabt das Schließen des Popup-Person-Buttons */
    popUpClosed = (event) => {
        this.setState({
          showProfilPopUp: false
        });
    }

    /**
     * Lifecycle method, which is called when the component gets inserted into the browsers DOM.
     * Ruft die Methode auf, welche die Daten aus dem Backend lädt.
     */
    componentDidMount() {
        this.getAnderePerson()
    }

    /** Rendert die Komponente */
    render() {
        const {classes} = this.props;
        const {anfrage, anderePerson, buttonPressed,showProfilPopUp} = this.state;

        return (
            <>
                {
                    (anfrage && anderePerson) ?
                        <Typography>
                            -------------- <br/>
                            Das ist eine ausgehende Partneranfrage #{anfrage.getID()}<br/>
                            Matchpoints des Vorschlags: {anfrage.getMatchpoints()} &nbsp;&nbsp;&nbsp;&nbsp;
                            <Button disabled={buttonPressed} variant={"contained"} color={"secondary"}
                                    onClick={this.updateKonversationsAnfrage}>
                                Zurückziehen
                            </Button>
                            <br/>
                            Partnername:
                            <button onClick={this.popUpButtonClicked}>
                                {
                                     anderePerson.getName()
                                }
                            </button>
                            <br/>--------------
                            <PopUpProfil show={showProfilPopUp} person={anderePerson} onClose={this.popUpClosed} />
                        </Typography>
                        :
                        null
                }
            </>


        )
    }

}

/** Komponent-spezifische Styles */
const styles = theme => ({
  root: {
    width: '100%',
  },
});

/** PropTypes */
AusgehendeKonversationsAnfragenListEntry.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,

}

export default withStyles(styles)(AusgehendeKonversationsAnfragenListEntry);