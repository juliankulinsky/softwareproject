import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    withStyles,
    Button,
    TextField,
    InputAdornment,
    IconButton,
    Grid,
    Typography,
    Card,
    CardContent
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear'
import { withRouter } from 'react-router-dom';
import StudooAPI from '../api/StudooAPI'
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import PartnervorschlaegeEntry from "./PartnervorschlaegeEntry";
import {GruppenVorschlagBO, LerngruppeBO} from "../api";

class LerngruppenExplorer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            gruppenvorschlag: null,
            currentPerson: this.props.person,
            lerngruppe: null,
            entscheidung: null,
            matchpoints: 0,
            error: null,
            loadingInProgress: false,
            updatingInProgress: false,
            updatingError: null,
            buttonPressed: false
        }
        this.baseState = this.state;
    }

    getLerngruppe = () => {
        StudooAPI.getAPI().getLerngruppe(this.state.gruppenvorschlag.getGruppenID())
            .then(lerngruppe => {
                this.setState({
                    lerngruppe: lerngruppe
                })
            })
    }

    getBestGruppenvorschlag = () => {
        StudooAPI.getAPI().getGruppenVorschlagForPersonID(this.props.person.getID())
            .then(gruppenvorschlagBO => {
                this.setState({
                    gruppenvorschlag: gruppenvorschlagBO,
                    error: null,
                    loadingInProgress: false
                });
                if (this.state.gruppenvorschlag != null) {
                    this.setState({
                        matchpoints: gruppenvorschlagBO.getMatchpoints()
                    })
                    this.getLerngruppe()
                }
            }).catch(e => this.setState({
            gruppenvorschlag: null,
            matchpoints: 0,
            error: e,
            loadingInProgress: false
        }));

        this.setState({
            loadingInProgress: true,
            error: null
        });
    }

    entscheidungTrue = () => {
        this.setState({
            entscheidung: true,
            buttonPressed: true
        }, function () {
            this.updateGruppenvorschlag()
        });
    }

    entscheidungFalse = () => {
        this.setState({
            entscheidung: false,
            buttonPressed: true
        }, function () {
            this.updateGruppenvorschlag()
        });
    }

    updateGruppenvorschlag = () => {
        let updatedGruppenVorschlag = Object.assign(new GruppenVorschlagBO(), this.state.gruppenvorschlag);
        updatedGruppenVorschlag.setEntscheidungPerson(true);
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

    componentDidMount() {
        this.getBestGruppenvorschlag()
    }


    render() {
        const {classes} = this.props;
        const {gruppenvorschlag, lerngruppe, error, loadingInProgress} = this.state;

        return (
            <div className={classes.root}>
                {
                    (gruppenvorschlag && lerngruppe) ?
                        <Typography>
                            Auf dich zugeschnittener Gruppenvorschlag mit der ID#{gruppenvorschlag.getID()}<br/>
                            GruppenID: {lerngruppe.getID()}&nbsp;
                            mit einer Ähnlichkeit von: {gruppenvorschlag.getAehnlichkeit()}
                            <Typography>
                                Gruppenname: {lerngruppe.getGruppenname()}<br/>
                                Matchpoints: {gruppenvorschlag.getMatchpoints()}
                            </Typography>
                            Willst du der Gruppe "{lerngruppe.getGruppenname()}" eine Beitrittsanfrage senden?
                            <br/>
                            <Button disabled={this.state.buttonPressed} variant='contained' onClick={this.entscheidungTrue}>
                                JA
                            </Button>
                            <Button disabled={this.state.buttonPressed} variant='contained' onClick={this.entscheidungFalse}>
                                NEIN
                            </Button>
                        </Typography>
                        :
                        <Typography>
                            Es gibt momentan leider keine Gruppenvorschläge für dich :/
                        </Typography>
                }

                <ContextErrorMessage
                    error={error} contextErrorMsg={`Nicht geklappt`}
                    onReload={this.getBestGruppenvorschlag}
                />
            </div>
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
LerngruppenExplorer.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired
}

export default withRouter(withStyles(styles)(LerngruppenExplorer));