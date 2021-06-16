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

class PartnerExplorer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            partnervorschlag: null,
            currentPerson: this.props.person,
            partnerPerson: null,
            entscheidung: null,
            error: null,
            loadingInProgress: false,
            updatingInProgress: false,
            updatingError: null
        }
        this.baseState = this.state;
    }

    getPartnerPerson = () => {
        StudooAPI.getAPI().getPerson(this.state.partnervorschlag.getPartnerVorschlagID())
            .then(partnerPersonBO => {
                this.setState({
                    partnerPerson: partnerPersonBO,
                    error: null,
                    loadingInProgress: false
                });

            }).catch(e => this.setState({
            partnerPerson: null,
            error: e,
            loadingInProgress: false
        }));

        this.setState({
            loadingInProgress: true,
            error: null
        });
    }

    getBestPartnervorschlag = () => {
        StudooAPI.getAPI().getPartnerVorschlagByPersonID(this.props.person.getID())
            .then(partnervorschlagBO => {
                this.setState({
                    partnervorschlag: partnervorschlagBO,
                    error: null,
                    loadingInProgress: false
                });
                if (this.state.partnervorschlag != null){
                    this.getPartnerPerson()
                }
            }).catch(e => this.setState({
            partnervorschlag: null,
            error: e,
            loadingInProgress: false
        }));

        this.setState({
            loadingInProgress: true,
            error: null
        });
    }

    entscheidungTrue = () => {
        console.log("HALLO")
        this.setState({
            entscheidung: true
        }, function (){
            console.log(this.state.entscheidung)
            this.updatePartnervorschlag()
        });
    }

    entscheidungFalse = () => {
        this.setState({
            entscheidung: false
        }, function (){
            console.log(this.state.entscheidung)
            this.updatePartnervorschlag()
        });
    }

    updatePartnervorschlag = () => {
        let updatedPartnerVorschlag = Object.assign(new PartnerVorschlagBO(), this.state.partnervorschlag);
        console.log(updatedPartnerVorschlag)
        updatedPartnerVorschlag.setEntscheidungPerson(!!this.state.entscheidung);
        updatedPartnerVorschlag.setEntscheidungPartner(!!this.state.partnervorschlag.getEntscheidungPartner())
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
        const {partnervorschlag, partnerPerson, error, loadingInProgress} = this.state;

        return (
            <div className={classes.root}>
                {partnervorschlag ?
                    <Typography>
                        Auf dich zugeschnittener Partnervorschlag mit der ID:{partnervorschlag.getID()}<br/>
                        PartnerID: {partnervorschlag.getPartnerVorschlagID()}&nbsp;
                        mit einer Ähnlichkeit von: {partnervorschlag.getAehnlichkeit()}
                        {
                            partnerPerson ?
                                <Typography>
                                    Name: {partnerPerson.getName()}
                                </Typography>
                                : null
                        }
                        Willst du eine Konversation mit der Person anfangen?
                        <Button variant='contained' onClick={this.entscheidungTrue}>
                            JA (In Arbeit)
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