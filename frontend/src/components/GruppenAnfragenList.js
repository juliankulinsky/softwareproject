import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PersonForm from './dialogs/PersonForm';
import PersonDeleteDialog from './dialogs/PersonDeleteDialog';
import {StudooAPI} from "../api";
import LoadingProgress from "./dialogs/LoadingProgress";
import ContextErrorMessage from "./dialogs/ContextErrorMessage";
import TeilnehmerListEntry from "./TeilnehmerListEntry";
import EingehendeKonversationsAnfragenListEntry from "./EingehendeKonversationsAnfragenListEntry";
import EingehendeGruppenbeitrittsAnfragenListEntry from "./EingehendeGruppenbeitrittsAnfragenListEntry";
import GruppenAnfragenListEntry from "./GruppenAnfragenListEntry";
//import AccountList from './AccountList';

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
        this.getAlleGruppenbeitrittsAnfragen()
    }

    /** Rendert die Komponente */
    render() {
        const { classes } = this.props;
        const { gruppenBeitrittsAnfragen, lerngruppe } = this.state;

        return (
            <>
                <Typography>
                    {
                        gruppenBeitrittsAnfragen.length > 0 ?
                            <Typography>
                                Das sind alle eingehenden Gruppenbeitrittsanfragen für {this.props.lerngruppe.getGruppenname()}: <br/>
                                {
                                    gruppenBeitrittsAnfragen.map( anfrage =>
                                        <GruppenAnfragenListEntry
                                            person={this.props.person}
                                            anfrage={anfrage}
                                            lerngruppe={lerngruppe}
                                        />
                                    )
                                }
                            </Typography>
                            :
                            <Typography>
                                Es gibt keine Gruppenbeitrittsanfragen
                            </Typography>
                    }
                </Typography>
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
  /** @ignore */
  classes: PropTypes.object.isRequired,

}

export default withStyles(styles)(GruppenAnfragenList);