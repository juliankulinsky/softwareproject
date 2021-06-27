import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Box } from '@material-ui/core';
import {StudooAPI} from "../api";
import TeilnehmerListEntry from "./TeilnehmerListEntry";

/**
 * Kontrolliert eine Liste an TeilnehmerListEntrys
 */
class TeilnehmerList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lerngruppe: props.lerngruppe,
            alleGruppenTeilnahmen: []
        }
    }

    /**
     * Alle GruppenTeilnahmeBOs einer übergebenen Lerngruppe aus dem Backend auslesen.
     */
    getAlleGruppenTeilnahmenForGruppe = () => {
        StudooAPI.getAPI().getGruppenTeilnahmenForGruppenID(this.props.lerngruppe.getID())
            .then(gruppenTeilnahmen => {
                this.setState({
                    alleGruppenTeilnahmen: gruppenTeilnahmen
                })
            })
    }

    /**
     * Lifecycle Methode, which is called when the component gets inserted into the browsers DOM.
     * Ruft die Methoden auf, welche die Daten aus dem Backend laden.
     */
    componentDidMount() {
        this.getAlleGruppenTeilnahmenForGruppe()
    }

    /** Rendert die Komponente */
    render() {
        const { classes } = this.props;
        const { lerngruppe, alleGruppenTeilnahmen } = this.state;

        return (
            <Typography>
                {
                    alleGruppenTeilnahmen ?
                        <Box>
                            <Typography variant="h6" style={{marginTop: "2%", marginBottom: "2%"}}>Gruppenmitglieder</Typography>
                            {
                                alleGruppenTeilnahmen.map(gruppenteilnahme =>
                                    <TeilnehmerListEntry
                                        currentperson={this.props.currentperson}
                                        gruppenteilnahme={gruppenteilnahme}
                                        lerngruppe={lerngruppe}
                                    />
                                )
                            }
                        </Box>
                        :
                        null
                }
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
TeilnehmerList.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(TeilnehmerList);