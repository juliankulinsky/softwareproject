import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid, Box } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import {StudooAPI} from "../api";
import AusgehendeKonversationsAnfragenListEntry from "./AusgehendeKonversationsAnfragenListEntry";
import AusgehendeGruppenbeitrittsAnfragenListEntry from "./AusgehendeGruppenbeitrittsAnfragenListEntry";
import {NavLink} from "react-router-dom";
import "./components-theme.css";

/**
 * Kontrolliert eine Liste von AusgehendeKonversationsAnfragenListEntrys und AusgehendeGruppenbeitrittsAnfragenListEntrys
 */
class AusgehendeAnfragenList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ausgehendeKonversationsAnfragen: [],
            ausgehendeGruppenbeitrittsAnfragen: [],
        }
    }

    /**
     * Lädt alle ausgehenden KonversationsAnfragen einer Person aus dem Backend, also alle PartnervorschlagBOs,
     * bei der die aktuelle Person teilnimmt, sich für den Vorschlag entschieden hat und die andere Person des
     * Vorschlags noch keine Entscheidung getroffen hat.
     */
    getAusgehendeKonversationsAnfragen = () => {
        StudooAPI.getAPI().getAusgehendePartnerVorschlaegeForPersonID(this.props.person.getID())
            .then(anfragen => {
                this.setState({
                    ausgehendeKonversationsAnfragen: anfragen
                })
            })
    }

    /**
     * Lädt alle ausgehenden GruppenbeitrittsAnfragen einer Person aus dem Backend, also alle GruppenvorschlagBOs,
     * bei der die aktuelle Person teilnimmt, sich für den Vorschlag entschieden hat und die Gruppe des
     * Vorschlags noch keine Entscheidung getroffen hat.
     */
    getAusgehendeGruppenbeitrittsAnfragen = () => {
        StudooAPI.getAPI().getAusgehendeGruppenVorschlaegeForPersonID(this.props.person.getID())
            .then(anfragen => {
                this.setState({
                    ausgehendeGruppenbeitrittsAnfragen: anfragen
                })
            })
    }

    /**
     * Lifecycle Methode, which is called when the component gets inserted into the browsers DOM.
     * Ruft die Methoden auf, welche die Daten aus dem Backend laden.
     */
    componentDidMount() {
        this.getAusgehendeKonversationsAnfragen();
        this.getAusgehendeGruppenbeitrittsAnfragen();
    }

    /** Rendert die Komponente */
    render() {
        const { classes } = this.props;
        const { ausgehendeKonversationsAnfragen, ausgehendeGruppenbeitrittsAnfragen } = this.state;

        return (
            <div>
                <div className="toggleExplore">
                    <NavLink to="/anfragen" className="toggleExploreNavLink">
                        <Button className="toggleExploreButtonPartner">
                            <Typography>Eingehend</Typography>
                        </Button>
                    </NavLink>
                    <NavLink to="/anfragenausgehend" className="toggleExploreNavLink">
                        <Button className="toggleExploreButton">
                            <Typography style={{color: '#04A2CA'}}>Ausgehend</Typography>
                        </Button>
                    </NavLink>
                </div>
                <Typography variant="h4" align="center" style={{padding: '2%', marginBottom: '1%'}}>
                    Das sind deine ausgehenden Anfragen
                </Typography>

                <div style={{display: "flex", flexDirection:"row", justifyContent: "space-around"}}>
                <Box>
                    {
                        ausgehendeKonversationsAnfragen.length > 0 ?
                            <Box>
                                <Typography variant="h6" align="center">
                                    Chats
                                </Typography>
                                {
                                    ausgehendeKonversationsAnfragen.map( anfrage =>
                                        <AusgehendeKonversationsAnfragenListEntry
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
                        ausgehendeGruppenbeitrittsAnfragen.length > 0 ?
                            <Box>
                                <Typography variant="h6" align="center">
                                    Gruppen
                                </Typography>
                                {
                                    ausgehendeGruppenbeitrittsAnfragen.map( anfrage =>
                                        <AusgehendeGruppenbeitrittsAnfragenListEntry
                                            person={this.props.person}
                                            anfrage={anfrage}
                                        />
                                    )
                                }
                            </Box>
                            :
                            <Typography>
                                Du hast keine ausgehenden Gruppenbeitrittsanfragen.
                            </Typography>
                    }
                </Box>
                </div>
            </div>
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
AusgehendeAnfragenList.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,

}

export default withStyles(styles)(AusgehendeAnfragenList);