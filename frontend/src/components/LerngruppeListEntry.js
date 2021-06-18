import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PersonForm from './dialogs/PersonForm';
import PersonDeleteDialog from './dialogs/PersonDeleteDialog';
import {StudooAPI} from "../api";
import TeilnehmerListEntry from "./TeilnehmerListEntry";
import TeilnehmerList from "./TeilnehmerList";
import GruppenAnfragenList from "./GruppenAnfragenList";
//import AccountList from './AccountList';


class LerngruppeListEntry extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lerngruppe: props.lerngruppe,
            eigeneGruppenTeilnahme: null,
            expandedState: false
        }
    }

    /**
     * Um schauen zu können, ob man Admin in der Gruppe ist
     */
    getEigeneGruppenTeilnahme = () => {
        StudooAPI.getAPI().getGruppenTeilnahmeByPersonIDundGruppenID(this.props.currentperson.getID(),this.props.lerngruppe.getID())
            .then (gruppenTeilnahme => {
                this.setState({
                    eigeneGruppenTeilnahme: gruppenTeilnahme
                })
            })
    }

    deleteTeilnahme = () => {
        StudooAPI.getAPI().deleteGruppenTeilnahme(this.state.eigeneGruppenTeilnahme.getID())
        StudooAPI.getAPI().getChatTeilnahmeByPersonIDundKonversationID(this.props.currentperson.getID(),this.props.lerngruppe.getKonversationId())
            .then(chatTeilnahme => {
                StudooAPI.getAPI().deleteChatTeilnahme(chatTeilnahme.getID())
            })
    }

    switchExpandedState = () => {
        if (this.state.expandedState){
            this.setState({
                expandedState: false
            })
        } else {
            this.setState({
                expandedState: true
            })
        }
    }

    componentDidMount() {
        this.getEigeneGruppenTeilnahme()
    }

    render() {
        const { classes } = this.props;
        const { lerngruppe, eigeneGruppenTeilnahme, expandedState } = this.state;

        return (
                <Typography className={classes.heading}>
                    ------------- <br/>
                    Gruppenname:
                    {
                        lerngruppe.getGruppenname()
                    } &nbsp;
                    <Button color="secondary" variant="contained" onClick={this.deleteTeilnahme}>
                        Teilnahme beenden
                    </Button>
                    {
                        eigeneGruppenTeilnahme && eigeneGruppenTeilnahme.get_ist_admin() ?
                            <>
                                &nbsp;
                                <Button color={expandedState ? "disabled":"primary"} variant={"contained"} onClick={this.switchExpandedState}>
                                    Verwalten { expandedState ? <> ˄</> : <> ˅</> }
                                </Button>
                                {
                                    expandedState ?
                                        <>
                                            <br/><br/>
                                            <GruppenAnfragenList
                                                currentperson={this.props.currentperson}
                                                lerngruppe={lerngruppe}
                                            />
                                            <br/>
                                            <TeilnehmerList
                                                currentperson={this.props.currentperson}
                                                lerngruppe={lerngruppe}
                                            />
                                        </>
                                        : null
                                }
                            </>
                            :
                            null
                    }
                    <br/>-------------
                </Typography>
        )
    }
}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%',
  }
});

/** PropTypes */
LerngruppeListEntry.propTypes = {
  /** @ignore */
  //classes: PropTypes.object.isRequired,
  /** The CustomerBO to be rendered */
  lerngruppe: PropTypes.object.isRequired,

}

export default withStyles(styles)(LerngruppeListEntry);