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
import AusgehendeKonversationsAnfragenListEntry from "./AusgehendeKonversationsAnfragenListEntry";
import AusgehendeGruppenbeitrittsAnfragenListEntry from "./AusgehendeGruppenbeitrittsAnfragenListEntry";
//import AccountList from './AccountList';

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
            <>
                <Typography>
                    {
                        ausgehendeKonversationsAnfragen.length > 0 ?
                            <Typography>
                                Das sind alle ausgehenden Konversationsanfragen von {this.props.person.getName()}: <br/>
                                {
                                    ausgehendeKonversationsAnfragen.map( anfrage =>
                                        <AusgehendeKonversationsAnfragenListEntry
                                            person={this.props.person}
                                            anfrage={anfrage}
                                        />
                                    )
                                }
                            </Typography>
                            :
                            <Typography>
                                Du hast keine ausgehenden Konversationsanfragen :/
                            </Typography>
                    }
                </Typography>
                <Typography>
                    {
                        ausgehendeGruppenbeitrittsAnfragen.length > 0 ?
                            <Typography>
                                Das sind alle ausgehenden Gruppenbeitrittsanfragen von {this.props.person.getName()}: <br/>
                                {
                                    ausgehendeGruppenbeitrittsAnfragen.map( anfrage =>
                                        <AusgehendeGruppenbeitrittsAnfragenListEntry
                                            person={this.props.person}
                                            anfrage={anfrage}
                                        />
                                    )
                                }
                            </Typography>
                            :
                            <Typography>
                                Du hast keine ausgehenden Gruppenbeitrittsanfragen :/
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
AusgehendeAnfragenList.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,

}

export default withStyles(styles)(AusgehendeAnfragenList);