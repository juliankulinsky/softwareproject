import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Box} from '@material-ui/core';
import {StudooAPI} from "../api";
import GruppenAnfragenListEntry from "./GruppenAnfragenListEntry";

/**
 * Kontrolliert eine Liste von GruppenAnfragenListEntrys
 */
class GruppenAnfragenList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gruppenBeitrittsAnfragen: [],
            lerngruppe: this.props.lerngruppe
        }
    }

    /**
     * Lädt alle eingehende Gruppenanfragen einer Gruppe, also alle GruppenVorschlagBOs, bei denen die Entscheidung der
     * Person des Vorschlags getroffen wurde (true ist), die Matchpoints auf 1 sind (also die Person sich für den
     * Vorschlag entschieden hat) und die Gruppe sich noch nicht entschieden hat.
     */
    getAlleGruppenbeitrittsAnfragen = () => {
        StudooAPI.getAPI().getEingehendeGruppenVorschlaegeForGruppenID(this.props.lerngruppe.getID())
            .then(anfragen => {
                this.setState({
                    gruppenBeitrittsAnfragen: anfragen
                })
            })
    }

    /**
     * Lifecycle Methode, which is called when the component gets inserted into the browsers DOM.
     * Ruft die Methode auf, welche die Daten aus dem Backend lädt.
     */
    componentDidMount() {
        this.getAlleGruppenbeitrittsAnfragen();
    }

    /** Rendert die Komponente */
    render() {
        const {classes} = this.props;
        const {gruppenBeitrittsAnfragen, lerngruppe} = this.state;

        return (
            <>
                <Box>
                    {
                        gruppenBeitrittsAnfragen.length > 0 ?
                            <Box>
                                <Typography variant="h6" style={{marginTop: "2%", marginBottom: "2%"}}>
                                    Eingehende Gruppenbeitrittsanfragen für {this.props.lerngruppe.getGruppenname()}:
                                </Typography>
                                {
                                    gruppenBeitrittsAnfragen.map(anfrage =>
                                        <GruppenAnfragenListEntry
                                            person={this.props.person}
                                            anfrage={anfrage}
                                            lerngruppe={lerngruppe}
                                        />
                                    )
                                }
                            </Box>
                            :
                            <Typography>
                                Es gibt keine Gruppenbeitrittsanfragen
                            </Typography>
                    }
                </Box>
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
GruppenAnfragenList.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(GruppenAnfragenList);
