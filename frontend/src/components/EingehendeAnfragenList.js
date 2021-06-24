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
//import AccountList from './AccountList';

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
     * Dies kommt nur vor, wenn eine Person in einem Partnerchat eine Gruppe mit
     */
    getEingehendeGruppenbeitrittsAnfragen = () => {
        StudooAPI.getAPI().getEingehendeGruppenVorschlaegeForPersonID(this.props.person.getID())
            .then(anfragen => {
                this.setState({
                    eingehendeGruppenbeitrittsAnfragen: anfragen
                })
            })
    }


    componentDidMount() {
        this.getEingehendeKonversationsAnfragen();
        this.getEingehendeGruppenbeitrittsAnfragen()
    }

    render() {
        const { classes } = this.props;
        const { eingehendeKonversationsAnfragen, eingehendeGruppenbeitrittsAnfragen } = this.state;

        return (
            <>
                <Typography>
                    {
                        eingehendeKonversationsAnfragen.length > 0 ?
                            <Typography>
                                Das sind alle eingehenden Konversationsanfragen von {this.props.person.getName()}: <br/>
                                {
                                    eingehendeKonversationsAnfragen.map( anfrage =>
                                        <EingehendeKonversationsAnfragenListEntry
                                            person={this.props.person}
                                            anfrage={anfrage}
                                        />
                                    )
                                }
                            </Typography>
                            :
                            <Typography>
                                Du hast keine eingehenden Konversationsanfragen :/
                            </Typography>
                    }
                </Typography>
                <Typography>
                    {
                        eingehendeGruppenbeitrittsAnfragen.length > 0 ?
                            <Typography>
                                Das sind alle eingehenden Gruppenbeitrittsanfragen von {this.props.person.getName()}: <br/>
                                {
                                    eingehendeGruppenbeitrittsAnfragen.map( anfrage =>
                                        <EingehendeGruppenbeitrittsAnfragenListEntry
                                            person={this.props.person}
                                            anfrage={anfrage}
                                        />
                                    )
                                }
                            </Typography>
                            :
                            <Typography>
                                Du hast keine eingehenden Gruppenbeitrittsanfragen :/
                            </Typography>
                    }
                </Typography>
            </>
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