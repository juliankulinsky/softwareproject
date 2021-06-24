import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import {StudooAPI} from "../api";
import PopUpProfil from "./dialogs/PopUpProfil";


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
     * Die aktuellen Teilnehmer der entsprechenden Gruppen auslesen
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
     * Die aktuellen Teilnehmer der entsprechenden Gruppen entfernen
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
     * Event für Klicken auf den Button (öffnen)
     */
    popUpButtonClicked = (event) => {
        event.stopPropagation();
        this.setState({
            showProfilPopUp: true
        });
    }

    /**
     * Event für Klicken auf den Button (schließen)
     */
    popUpClosed = (event) => {
        this.setState({
            showProfilPopUp: false
        });
    }


    componentDidMount() {
        this.getAktuellenTeilnehmer()
    }

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

/** Component specific styles */
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