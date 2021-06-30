import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Button} from '@material-ui/core';
import {GruppenVorschlagBO, StudooAPI} from "../api";
import "./components-theme.css"
import PopUpProfil from "./dialogs/PopUpProfil";

/**
 * Rendert eine GruppenAnfrage mit der Option diese anzunehmen oder abzulehnen.
 * Es handelt sich um ein spezifisches GruppenVorschlagBO Objekt, welches durch die Buttons "Annehmen" und "Ablehnen"
 * geupdatet werden können.
 */
class GruppenAnfragenListEntry extends Component {
    constructor(props) {
        super(props);

        this.state = {
            anfrage: this.props.anfrage,
            lerngruppe: this.props.lerngruppe,
            anfragendePerson: null,
            matchpoints: this.props.anfrage.getMatchpoints(),
            entscheidung: null,
            buttonPressed: false,
            showProfilPopUp: false
        }
    }

    /** Wird durch "Annehmen"-Button aufgerufen, setzt die Entscheidung auf true und ruft die Update-Funktion auf
     * Die Gruppenanfrage annehmen
     */
    entscheidungTrue = () => {
        this.setState({
            entscheidung: true,
            buttonPressed: true
        }, function () {
            this.updateGruppenvorschlagsAnfrage()
        });
    }

    /** Wird durch "Ablehnen"-Button aufgerufen, setzt die Entscheidung auf false und ruft die Update-Funktion auf
     * Die Gruppenanfrage ablehnen
     */
    entscheidungFalse = () => {
        this.setState({
            entscheidung: false,
            buttonPressed: true
        }, function () {
            this.updateGruppenvorschlagsAnfrage()
        });
    }

    /**
     * Updaten des GruppenVorschlagBO, wobei die Matchpoints abhängig von der Entscheidung um 1 höher gesetzt werden
     * oder so bleiben und die Entscheidung der Gruppe auf true gesetzt wird, was bedeutet, dass die Gruppe sich
     * entschieden hat.
     */
    updateGruppenvorschlagsAnfrage = () => {
        let updatedGruppenVorschlag = Object.assign(new GruppenVorschlagBO(), this.state.anfrage);
        updatedGruppenVorschlag.setEntscheidungGruppe(true)
        if (this.state.entscheidung) {
            updatedGruppenVorschlag.setMatchpoints(this.state.matchpoints += 1)
        }
        StudooAPI.getAPI().updateGruppenVorschlag(updatedGruppenVorschlag)
            .then(gruppenVorschlag => {
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

    /** Lädt die Person des GruppenVorschlagBO aus dem Backend
     * Anfragende Person auslesen
     */
    getAnfragendePerson = () => {
        StudooAPI.getAPI().getPerson(this.state.anfrage.getPersonID())
            .then(anfragendePerson => {
                this.setState({
                        anfragendePerson: anfragendePerson
                    }
                )
            })
    }

    /** Handles the onClick event of the Popup person button */
    popUpButtonClicked = (event) => {
        event.stopPropagation();
        this.setState({
          showProfilPopUp: true
        });
    }

    popUpClosed = (event) => {
        this.setState({
          showProfilPopUp: false
        });
    }

    /**
     * Lifecycle Methode, which is called when the component gets inserted into the browsers DOM.
     * Ruft die Methode auf, welche die Daten aus dem Backend lädt.
     */
    componentDidMount() {
        this.getAnfragendePerson()
    }

    /** Rendert die Komponente */
    render() {
        const {classes} = this.props;
        const {anfrage, buttonPressed, anfragendePerson, showProfilPopUp} = this.state;

        return (
            <>
                {
                    (anfrage && anfragendePerson) ?
                        <div className="anfrageRequest">
                            {/*
                            <Typography style={{display: 'flex', alignItems: 'center'}}>
                                {anfragendePerson.getName()}
                            </Typography>*/}

                            <Typography style={{display: 'flex', alignItems: 'center'}}>
                                Beitrittsanfrage von <Button onClick={this.popUpButtonClicked}>
                                        {
                                            anfragendePerson.getName()
                                        }
                                    </Button>&nbsp;&nbsp;&nbsp;&nbsp;
                            </Typography>
                            <Button disabled={buttonPressed} color={"primary"}
                                    onClick={this.entscheidungTrue}>
                                Annehmen
                            </Button>

                            <Button disabled={buttonPressed} color={"secondary"}
                                    onClick={this.entscheidungFalse}>
                                Ablehnen
                            </Button>
                            <PopUpProfil show={showProfilPopUp} person={anfragendePerson}  onClose={this.popUpClosed} />
                        </div>

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
GruppenAnfragenListEntry.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(GruppenAnfragenListEntry);