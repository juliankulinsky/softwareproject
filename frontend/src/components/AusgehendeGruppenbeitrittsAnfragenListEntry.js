import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PersonForm from './dialogs/PersonForm';
import PersonDeleteDialog from './dialogs/PersonDeleteDialog';
import {GruppenVorschlagBO, PartnerVorschlagBO, StudooAPI} from "../api";
import LoadingProgress from "./dialogs/LoadingProgress";
import ContextErrorMessage from "./dialogs/ContextErrorMessage";
import TeilnehmerListEntry from "./TeilnehmerListEntry";
//import AccountList from './AccountList';


class AusgehendeGruppenbeitrittsAnfragenListEntry extends Component {
    constructor(props) {
        super(props);

        this.state = {
            anfrage: this.props.anfrage,
            lerngruppe: null,
            matchpoints: this.props.anfrage.getMatchpoints(),
            buttonPressed: false
        }
    }

    getLerngruppe = () => {
        StudooAPI.getAPI().getLerngruppe(this.state.anfrage.getGruppenID())
            .then(lerngruppe => {
                this.setState({
                    lerngruppe: lerngruppe
                })
            })
    }

    updateGruppenvorschlagsAnfrage = () => {
        this.setState({
            buttonPressed: true
        })
        let updatedGruppenVorschlag = Object.assign(new GruppenVorschlagBO(), this.state.anfrage);
        updatedGruppenVorschlag.setMatchpoints(this.state.matchpoints -= 1)
        StudooAPI.getAPI().updateGruppenVorschlag(updatedGruppenVorschlag)
            .then(gruppenVorschlag => {
                this.setState({
                    updatingInProgress: false,
                    updatingError: null
                });
                this.baseState.entscheidung = this.state.entscheidung;
            }).catch(e =>
            this.setState({
                updatingInProgress: false,
                updatingError: e
            }));
        this.setState({
            updatingInProgress: true,
            updatingError: null
        })
    }

    componentDidMount() {
        this.getLerngruppe()
    }

    render() {
        const {classes} = this.props;
        const {anfrage, lerngruppe, buttonPressed} = this.state;

        return (
            <>
                {
                    (anfrage && lerngruppe) ?
                        <Typography>
                            -------------- <br/>
                            Das ist eine ausgehende Gruppenbeitrittsanfrage #{anfrage.getID()}<br/>
                            Matchpoints des Vorschlags: {anfrage.getMatchpoints()} &nbsp;&nbsp;&nbsp;&nbsp;
                            <Button disabled={buttonPressed} variant={"contained"} color={"secondary"}
                                    onClick={this.updateGruppenvorschlagsAnfrage}>
                                Zurückziehen
                            </Button>
                            <br/>
                            Partnername: {lerngruppe.getGruppenname()}
                            <br/>--------------
                        </Typography>
                        :
                        null
                }
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
AusgehendeGruppenbeitrittsAnfragenListEntry.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,

}

export default withStyles(styles)(AusgehendeGruppenbeitrittsAnfragenListEntry);