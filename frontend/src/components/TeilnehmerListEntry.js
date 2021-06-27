import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import {StudooAPI} from "../api";
import PopUpProfil from "./dialogs/PopUpProfil";

/**
 * Rendert einen Teilnehmer, mit der Option diesen aus der Gruppe zu entfernen, falls die Teilnehmer-PersonBO nicht
 * die aktuelle Person ist. Das Entfernen geschieht über den "Entfernen"-Button
 */
class TeilnehmerListEntry extends Component {
    constructor(props) {
        super(props);

        this.state = {
            aktuelleGruppenTeilnahme: props.gruppenteilnahme,
            teilnehmerPerson: null,
            lerngruppe: props.lerngruppe,
            buttonPressed: false,
            showProfilPopUp: false
        }
    }

    /**
     * Das PersonBO des Teilnehmers der übergebenen GruppenTeilnahme aus dem Backend auslesen.
     */
    getAktuellenTeilnehmer = () => {
        StudooAPI.getAPI().getPerson(this.state.aktuelleGruppenTeilnahme.get_person_id())
            .then(teilnehmerPerson => {
                this.setState({
                    teilnehmerPerson: teilnehmerPerson
                })
            })
    }

    /**
     * Durch den Button "Verwalten" aufgerufene Funktion, durch die die aktuelle GruppenTeilnahmeBO, sowie die zur
     * Gruppe gehörende ChatTeilnahmeBO im Backend gelöscht wird.
     */
    deleteAktuelleTeilnahme = () => {
        StudooAPI.getAPI().deleteGruppenTeilnahme(this.state.aktuelleGruppenTeilnahme.getID())
            .then(gruppenTeilnahme => {
                this.setState({
                    buttonPressed: true
                })
            })
        StudooAPI.getAPI().getChatTeilnahmeByPersonIDundKonversationID(this.state.teilnehmerPerson.getID(), this.props.lerngruppe.getKonversationId())
            .then(chatTeilnahme => {
                StudooAPI.getAPI().deleteChatTeilnahme(chatTeilnahme.getID())
            })

    }

    /**
     * Event für Klicken auf den Person-Button (öffnen), zum Anschauen des Profils des Teilnehmers
     */
    popUpButtonClicked = (event) => {
        event.stopPropagation();
        this.setState({
            showProfilPopUp: true
        });
    }

    /**
     * Handhabt das Schließen des Profil-Popups
     */
    popUpClosed = (event) => {
        this.setState({
            showProfilPopUp: false
        });
    }

    /**
     * Lifecycle Methode, which is called when the component gets inserted into the browsers DOM.
     * Ruft die Methoden auf, welche die Daten aus dem Backend laden.
     */
    componentDidMount() {
        this.getAktuellenTeilnehmer()
    }

    /** Rendert die Komponente */
    render() {
        const {classes} = this.props;
        const { teilnehmerPerson, buttonPressed, showProfilPopUp } = this.state;

        return (
            <Typography>
                {
                    teilnehmerPerson ?
                        <>
                            <Button onClick={this.popUpButtonClicked}>
                                {
                                    teilnehmerPerson.getName()
                                }
                            </Button>
                            {
                                teilnehmerPerson.getID() !== this.props.currentperson.getID() ?
                                    <Button disabled={buttonPressed} color={"secondary"}
                                            onClick={this.deleteAktuelleTeilnahme}>
                                        Entfernen
                                    </Button>
                                    : <>(Du)</>
                            }
                        </>
                        : null
                }
                <PopUpProfil show={showProfilPopUp} person={teilnehmerPerson} onClose={this.popUpClosed}/>
            </Typography>
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
TeilnehmerListEntry.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(TeilnehmerListEntry);