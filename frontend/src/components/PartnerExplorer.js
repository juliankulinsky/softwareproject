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

class PartnerExplorer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            partnervorschlag: null,
            currentPerson: this.props.person,
            partnerPerson: null,
            error: null,
            loadingInProgress: false
        }
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