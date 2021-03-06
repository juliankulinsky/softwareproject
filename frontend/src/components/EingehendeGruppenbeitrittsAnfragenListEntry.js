import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    withStyles,
    Typography,
    Card,
    CardContent,
    Button
} from '@material-ui/core';
import {GruppenVorschlagBO, StudooAPI} from "../api";
import "./components-theme.css";

/**
 * Rendert eine eingehende Gruppenbeitrittsanfrage mit der Option, diese anzunehmen oder abzulehnen.
 * Es handelt sich um ein spezifisches GruppenVorschlagBO-Objekt, das als Props übergeben wurde,
 * welches durch den "Annehmen" und den "Ablehnen"-Button bearbeitet werden kann.
 */
class EingehendeGruppenbeitrittsAnfragenListEntry extends Component {
    constructor(props) {
        super(props);

        this.state = {
            anfrage: this.props.anfrage,
            lerngruppe: null,
            matchpoints: this.props.anfrage.getMatchpoints(),
            buttonPressed: false
        }
    }

    /** Lädt das LerngruppeBO des übergebenen GruppenVorschlags aus dem Backend */
    getLerngruppe = () => {
        StudooAPI.getAPI().getLerngruppe(this.state.anfrage.getGruppenID())
            .then(lerngruppe => {
                this.setState({
                    lerngruppe: lerngruppe
                })
            })
    }

    /** Wird durch "Annehmen"-Button aufgerufen, setzt die Entscheidung auf true und ruft die Update-Funktion auf */
    entscheidungTrue = () => {
        this.setState({
            entscheidung: true,
            buttonPressed: true
        }, function () {
            this.updateGruppenvorschlagsAnfrage()
        });
    }

    /** Wird durch "Ablehnen"-Button aufgerufen, setzt die Entscheidung auf false und ruft die Update-Funktion auf */
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
     * oder so bleiben. Die Entscheidung der Person wird auf true gesetzt, was bedeutet, dass eine Entscheidung
     * getroffen wurde
     */
    updateGruppenvorschlagsAnfrage = () => {
        let updatedGruppenVorschlag = Object.assign(new GruppenVorschlagBO(), this.state.anfrage);
        updatedGruppenVorschlag.setEntscheidungPerson(true)
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

    /**
     * Lifecycle Methode, which is called when the component gets inserted into the browsers DOM.
     * Ruft die Methode auf, welche die Daten aus dem Backend lädt.
     */
    componentDidMount() {
        this.getLerngruppe()
    }

    /** Rendert die Komponente */
    render() {
        const {classes} = this.props;
        const {anfrage, lerngruppe, buttonPressed} = this.state;

        return (
            <>
                {
                    (anfrage && lerngruppe) ?
                        <Card className="anfragencard">
                            <CardContent>
                                <Typography variant="h6">
                                    {lerngruppe.getGruppenname()} lädt dich in ihre Gruppe ein!
                                </Typography>
                                <br/>
                                <div className="buttonAlign">
                                    <Button disabled={buttonPressed} variant={"contained"} color={"primary"}
                                            onClick={this.entscheidungTrue}>
                                        Annehmen
                                    </Button>&nbsp;&nbsp;
                                    <Button disabled={buttonPressed} variant={"contained"} color={"secondary"}
                                            onClick={this.entscheidungFalse}>
                                        Ablehnen
                                    </Button>
                                </div>
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
EingehendeGruppenbeitrittsAnfragenListEntry.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,

}

export default withStyles(styles)(EingehendeGruppenbeitrittsAnfragenListEntry);