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
//import AccountList from './AccountList';


class TeilnehmerListEntry extends Component {
    constructor(props) {
        super(props);

        this.state = {
            aktuelleGruppenTeilnahme: props.gruppenteilnahme,
            teilnehmerPerson: null,
            lerngruppe: props.lerngruppe,
            buttonPressed: false
        }
    }

    getAktuellenTeilnehmer = () => {
        StudooAPI.getAPI().getPerson(this.state.aktuelleGruppenTeilnahme.get_person_id())
            .then(teilnehmerPerson => {
                this.setState({
                    teilnehmerPerson: teilnehmerPerson
                })
            })
    }

    deleteAktuelleTeilnahme = () => {
        StudooAPI.getAPI().deleteGruppenTeilnahme(this.state.aktuelleGruppenTeilnahme.getID())
            .then(gruppenTeilnahme => {
                this.setState({
                    buttonPressed: true
                })
            })
        StudooAPI.getAPI().getChatTeilnahmeByPersonIDundKonversationID(this.state.teilnehmerPerson.getID(),this.props.lerngruppe.getKonversationId())
            .then(chatTeilnahme => {
                StudooAPI.getAPI().deleteChatTeilnahme(chatTeilnahme.getID())
            })

    }

    componentDidMount() {
        this.getAktuellenTeilnehmer()
    }

    render() {
        const { classes } = this.props;
        const { lerngruppe, aktuelleGruppenTeilnahme, teilnehmerPerson, buttonPressed } = this.state;

        return (
            <Typography>
                {
                    teilnehmerPerson ?
                        <>
                            {teilnehmerPerson.getName()}
                            {
                                teilnehmerPerson.getID()!==this.props.currentperson.getID() ?
                                    <Button disabled={buttonPressed} color={"secondary"}
                                            onClick={this.deleteAktuelleTeilnahme}>
                                        Entfernen
                                    </Button>
                                    : <> (DU)</>
                            }
                        </>
                        : null
                }
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
  /** @ignore */
  classes: PropTypes.object.isRequired,

}

export default withStyles(styles)(TeilnehmerListEntry);