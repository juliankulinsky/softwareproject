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


class GruppenAnfragenListEntry extends Component {
    constructor(props) {
        super(props);

        this.state = {
            anfrage: this.props.anfrage,
            lerngruppe: this.props.lerngruppe,
            anfragendePerson: null,
            matchpoints: this.props.anfrage.getMatchpoints(),
            entscheidung: null,
            buttonPressed: false
        }
    }

    entscheidungTrue = () => {
        this.setState({
            entscheidung: true,
            buttonPressed: true
        }, function () {
            this.updateGruppenvorschlagsAnfrage()
        });
    }

    entscheidungFalse = () => {
        this.setState({
            entscheidung: false,
            buttonPressed: true
        }, function () {
            this.updateGruppenvorschlagsAnfrage()
        });
    }

    updateGruppenvorschlagsAnfrage = () => {
        let updatedGruppenVorschlag = Object.assign(new GruppenVorschlagBO(), this.state.anfrage);
        updatedGruppenVorschlag.setEntscheidungGruppe(true)
        if (this.state.entscheidung) {
            updatedGruppenVorschlag.setMatchpoints(this.state.matchpoints += 1)
        }
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

    getAnfragendePerson = () => {
        StudooAPI.getAPI().getPerson(this.state.anfrage.getPersonID())
            .then(anfragendePerson => {
                this.setState({
                    anfragendePerson: anfragendePerson
                    }
                )
            })
    }

    componentDidMount() {
        this.getAnfragendePerson()
    }

    render() {
        const {classes} = this.props;
        const {anfrage, lerngruppe, buttonPressed, anfragendePerson} = this.state;

        return (
            <>
                {
                    (anfrage && anfragendePerson) ?
                        <Typography>
                            Beitrittsanfrage von {anfragendePerson.getName()}&nbsp;&nbsp;&nbsp;&nbsp;
                            <Button disabled={buttonPressed} color={"primary"}
                                    onClick={this.entscheidungTrue}>
                                Annehmen
                            </Button>
                            <Button disabled={buttonPressed} color={"secondary"}
                                    onClick={this.entscheidungFalse}>
                                Ablehnen
                            </Button>
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
GruppenAnfragenListEntry.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,

}

export default withStyles(styles)(GruppenAnfragenListEntry);