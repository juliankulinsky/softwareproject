import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography } from '@material-ui/core';
import { Button, Card, CardContent } from '@material-ui/core';
import {PartnerVorschlagBO, StudooAPI} from "../api";
import PopUpProfil from "./dialogs/PopUpProfil";
import "./components-theme.css";

/**
 * Rendert eine eingehende KonversationsAnfrage mit der Option, diese anzunehmen oder abzulehnen.
 * Es handelt sich um ein spezifisches PartnerVorschlagBO-Objekt, das als Props übergeben wurde,
 * welches durch den "Annehmen" und "Ablehnen"-Button bearbeitet werden kann.
 */
class EingehendeKonversationsAnfragenListEntry extends Component {
    constructor(props) {
        super(props);

        this.state = {
            anfrage: this.props.anfrage,
            anderePerson: null,
            entscheidung: null,
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

    /** Wird durch "Annehmen"-Button aufgerufen, setzt die Entscheidung auf true und ruft die Update-Funktion auf */
    entscheidungTrue = () => {
        this.setState({
            entscheidung: true,
            buttonPressed: true
        }, function () {
            this.updatePartnervorschlag()
        });
    }

    /** Wird durch "Ablehnen"-Button aufgerufen, setzt die Entscheidung auf false und ruft die Update-Funktion auf */
    entscheidungFalse = () => {
        this.setState({
            entscheidung: false,
            buttonPressed: true
        }, function () {
            this.updatePartnervorschlag()
        });
    }

    /**
     * Updaten des PartnerVorschlagBO, wobei die Matchpoints abhängig von der Entscheidung um 1 höher gesetzt werden
     * oder so bleiben. Die Entscheidung der "Person" oder des "Partners" (abhängig davon welche "Rolle" die aktuelle
     * Person im Vorschlag spielt) wird auf true gesetzt, was bedeutet, dass eine Entscheidung getroffen wurde.
     */
    updatePartnervorschlag = () => {
        let updatedPartnerVorschlag = Object.assign(new PartnerVorschlagBO(), this.state.anfrage);
        if (this.props.person.getID() === this.state.anfrage.getPersonID()) {
            updatedPartnerVorschlag.setEntscheidungPerson(true);
            if (this.state.entscheidung) {
                updatedPartnerVorschlag.setMatchpoints(this.state.matchpoints += 1)
            }
        } else if (this.props.person.getID() === this.state.anfrage.getPartnerID()) {
            updatedPartnerVorschlag.setEntscheidungPartner(true);
            if (this.state.entscheidung) {
                updatedPartnerVorschlag.setMatchpoints(this.state.matchpoints += 1)
            }
        }
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
     * Lifecycle Methode, which is called when the component gets inserted into the browsers DOM.
     * Ruft die Methode auf, welche die Daten aus dem Backend lädt.
     */
    componentDidMount() {
        this.getAnderePerson()
    }

    /** Rendert die Komponente */
    render() {
        const {classes} = this.props;
        const {anfrage, anderePerson, buttonPressed, showProfilPopUp} = this.state;

        return (
            <>
                {
                    (anfrage && anderePerson) ?
                        <Card className="anfragencard">
                            <CardContent>

                                <Typography variant="h6">
                                    {anderePerson.getName()} möchte mit dir chatten!
                                </Typography>

                                <Typography>
                                    Sehe dir <Button onClick={this.popUpButtonClicked}>
                                        {
                                            anderePerson.getName()
                                        }'s
                                    </Button> Profil an:&nbsp;

                                </Typography>

                                <br/>

                                <div className="buttonAlign">
                                    <Button disabled={buttonPressed} variant={"contained"} color={"primary"}
                                            onClick={this.entscheidungTrue}>
                                        Annehmen
                                    </Button> &nbsp;

                                    <Button disabled={buttonPressed} variant={"contained"} color={"secondary"}
                                            onClick={this.entscheidungFalse}>
                                        Ablehnen
                                    </Button>
                                </div>

                                <PopUpProfil show={showProfilPopUp} person={anderePerson} onClose={this.popUpClosed}/>

                            </CardContent>
                        </Card>
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
EingehendeKonversationsAnfragenListEntry.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,

}

export default withStyles(styles)(EingehendeKonversationsAnfragenListEntry);