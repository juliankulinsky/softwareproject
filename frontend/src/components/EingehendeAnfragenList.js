import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button, Box } from '@material-ui/core';
import {StudooAPI} from "../api";
import EingehendeKonversationsAnfragenListEntry from "./EingehendeKonversationsAnfragenListEntry";
import EingehendeGruppenbeitrittsAnfragenListEntry from "./EingehendeGruppenbeitrittsAnfragenListEntry";
import {NavLink} from "react-router-dom";
import "./components-theme.css";
/**
 * Kontrolliert eine Liste von EingehendeKonversationsAnfragenListEntrys und EingehendeGruppenbeitrittsAnfragenListEntrys
 */
class EingehendeAnfragenList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            eingehendeKonversationsAnfragen: [],
            eingehendeGruppenbeitrittsAnfragen: []
        }
    }

    /**
     * Lädt alle eingehenden KonversationsAnfragen einer Person aus dem Backend, also alle PartnervorschlagBOs,
     * bei der die aktuelle Person teilnimmt, die andere Person des Vorschlags sich für den Vorschlag entschieden hat
     * und die aktuelle Person noch keine Entscheidung getroffen hat.
     */
    getEingehendeKonversationsAnfragen = () => {
        StudooAPI.getAPI().getEingehendePartnerVorschlaegeForPersonID(this.props.person.getID())
            .then(anfragen => {
                this.setState({
                    eingehendeKonversationsAnfragen: anfragen
                })
            })
    }

    /**
     * Lädt alle eingehenden GruppenbeitrittsAnfragen einer Person aus dem Backend, also alle GruppenvorschlagBOs,
     * bei der die aktuelle Person teilnimmt, die Gruppe des Vorschlags sich für den Vorschlag entschieden hat und die
     * aktuelle Person noch keine Entscheidung getroffen hat.
     * Dies kommt nur vor, wenn eine andere Person in einem Partnerchat mit der aktuellen Person eine Gruppe erstellt.
     */
    getEingehendeGruppenbeitrittsAnfragen = () => {
        StudooAPI.getAPI().getEingehendeGruppenVorschlaegeForPersonID(this.props.person.getID())
            .then(anfragen => {
                this.setState({
                    eingehendeGruppenbeitrittsAnfragen: anfragen
                })
            })
    }

    getAnfragen = () => {
        this.getEingehendeKonversationsAnfragen()
        this.getEingehendeGruppenbeitrittsAnfragen()
    }

    /**
     * Lifecycle Methode, which is called when the component gets inserted into the browsers DOM.
     * Ruft die Methode auf, welche die Daten aus dem Backend lädt.
     */
    componentDidMount() {
        this.getAnfragen();
        this.interval = setInterval(() => this.getAnfragen(), 3000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    /** Rendert die Komponente */
    render() {
        const { classes } = this.props;
        const { eingehendeKonversationsAnfragen, eingehendeGruppenbeitrittsAnfragen } = this.state;

        return (
            <div>
                <div className="toggleExplore">
                    <NavLink to="/anfragen" className="toggleExploreNavLink">
                        <Button className="toggleExploreButtonPartner">
                            <Typography style={{color: '#04A2CA'}}>Eingehend</Typography>
                        </Button>
                    </NavLink>
                    <NavLink to="/anfragenausgehend" className="toggleExploreNavLink">
                        <Button className="toggleExploreButton">
                            <Typography>Ausgehend</Typography>
                        </Button>
                    </NavLink>
                </div>
                <Typography variant="h4" align="center" style={{padding: '2%', marginBottom: '1%'}}>
                                Das sind deine eingehenden Anfragen
                </Typography>
                <div style={{display: "flex", flexDirection:"row", justifyContent: "space-around"}}>
                <Box>
                    {
                        eingehendeKonversationsAnfragen.length > 0 ?
                            <Box>
                                <Typography variant="h6" align="center">
                                    Chats
                                </Typography>
                                {
                                    eingehendeKonversationsAnfragen.map( anfrage =>
                                        <EingehendeKonversationsAnfragenListEntry
                                            person={this.props.person}
                                            anfrage={anfrage}
                                        />
                                    )
                                }
                            </Box>
                            :
                            <Box>
                                <Typography variant="h6" align="center">
                                    Chats
                                </Typography>
                                <Typography>
                                    Keine Anfragen vorhanden.
                                </Typography>
                            </Box>
                    }
                </Box>
                <Box>
                    {
                        eingehendeGruppenbeitrittsAnfragen.length > 0 ?
                            <Box>
                                <Typography variant="h6" align="center">
                                    Gruppen
                                </Typography>
                                {
                                    eingehendeGruppenbeitrittsAnfragen.map( anfrage =>
                                        <EingehendeGruppenbeitrittsAnfragenListEntry
                                            person={this.props.person}
                                            anfrage={anfrage}
                                        />
                                    )
                                }
                            </Box>
                            :
                            <Typography>
                                Du hast keine eingehenden Gruppenbeitrittsanfragen.
                            </Typography>
                    }
                </Box>
                </div>
            </div>
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
EingehendeAnfragenList.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,

}

export default withStyles(styles)(EingehendeAnfragenList);