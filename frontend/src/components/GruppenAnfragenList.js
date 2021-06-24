import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Box, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
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


class GruppenAnfragenList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gruppenBeitrittsAnfragen: [],
            lerngruppe: this.props.lerngruppe
        }
    }

    getAlleGruppenbeitrittsAnfragen = () => {
        StudooAPI.getAPI().getEingehendeGruppenVorschlaegeForGruppenID(this.props.lerngruppe.getID())
            .then(anfragen => {
                this.setState({
                    gruppenBeitrittsAnfragen: anfragen
                })
            })
    }


    componentDidMount() {
        this.getAlleGruppenbeitrittsAnfragen()
    }

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

/** Component specific styles */
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