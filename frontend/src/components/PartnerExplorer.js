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
import {PartnerVorschlagBO} from "../api";
import ProfilVorschau from "./ProfilVorschau";

class PartnerExplorer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            partnervorschlag: null,
            currentPerson: this.props.person,
            anderePerson: null,
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

    getAnderePerson = () => {
        if (this.props.person.getID() === this.state.partnervorschlag.getPersonID()) {
            StudooAPI.getAPI().getPerson(this.state.partnervorschlag.getPartnerID())
                .then(anderePerson =>
                this.setState({
                    anderePerson: anderePerson
                }))
        } else if (this.props.person.getID() === this.state.partnervorschlag.getPartnerID()) {
            StudooAPI.getAPI().getPerson(this.state.partnervorschlag.getPersonID())
                .then(anderePerson =>
                this.setState({
                    anderePerson: anderePerson
                }))
        }
    }

    getBestPartnervorschlag = () => {
        StudooAPI.getAPI().getPartnerVorschlagByPersonID(this.props.person.getID())
            .then(partnervorschlagBO => {
                this.setState({
                    partnervorschlag: partnervorschlagBO,
                    error: null,
                    loadingInProgress: false
                });
                if (this.state.partnervorschlag != null) {
                    this.setState({
                        matchpoints: partnervorschlagBO.getMatchpoints()
                    })
                    this.getAnderePerson()
                }
            }).catch(e => this.setState({
            partnervorschlag: null,
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
            this.updatePartnervorschlag()
        });
    }

    entscheidungFalse = () => {
        this.setState({
            entscheidung: false,
            buttonPressed: true
        }, function () {
            this.updatePartnervorschlag()
        });
    }

    updatePartnervorschlag = () => {
        let updatedPartnerVorschlag = Object.assign(new PartnerVorschlagBO(), this.state.partnervorschlag);
        if (this.props.person.getID() === this.state.partnervorschlag.getPersonID()) {
            updatedPartnerVorschlag.setEntscheidungPerson(true);
            if (this.state.entscheidung) {
                updatedPartnerVorschlag.setMatchpoints(this.state.matchpoints += 1)
            }
        } else if (this.props.person.getID() === this.state.partnervorschlag.getPartnerID()) {
            updatedPartnerVorschlag.setEntscheidungPartner(true);
            if (this.state.entscheidung) {
                updatedPartnerVorschlag.setMatchpoints(this.state.matchpoints += 1)
            }
        }
        StudooAPI.getAPI().updatePartnerVorschlag(updatedPartnerVorschlag)
            .then(partnerVorschlag => {
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
        this.getBestPartnervorschlag()
    }


    render() {
        const {classes} = this.props;
        const {partnervorschlag, anderePerson, error, loadingInProgress} = this.state;

        return (
            <div className={classes.root}>
                {
                    (partnervorschlag && anderePerson) ?
                        <Typography>
                            Auf dich zugeschnittener Partnervorschlag mit der ID#{partnervorschlag.getID()}<br/>
                            PartnerID: {anderePerson.getID()}&nbsp;
                            mit einer Ähnlichkeit von: {partnervorschlag.getAehnlichkeit()}
                            <ProfilVorschau person={anderePerson} selfperson={false}/>
                            <Typography>
                                Name: {anderePerson.getName()}<br/>
                                Matchpoints: {partnervorschlag.getMatchpoints()}
                            </Typography>
                            Willst du eine Konversation mit {anderePerson.getName()} anfangen?
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
                            Es gibt momentan leider keine Partnervorschläge für dich :/
                        </Typography>
                }

                <ContextErrorMessage
                    error={error} contextErrorMsg={`Nicht geklappt`}
                    onReload={this.getBestPartnervorschlag}
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
PartnerExplorer.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired
}

export default withRouter(withStyles(styles)(PartnerExplorer));