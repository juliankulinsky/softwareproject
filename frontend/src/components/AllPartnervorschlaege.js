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

class AllPartnervorschlaege extends Component {

    constructor(props) {
        super(props);

        this.state = {
            partnervorschlaege: [],
            error: null,
            loadingInProgress: false
        }
    }

    getPartnervorschlaege = () => {
        StudooAPI.getAPI().getPartnerVorschlaege()
        .then(partnervorschlaegeBOs => {
            this.setState({
                partnervorschlaege: partnervorschlaegeBOs,
                error: null,
                loadingInProgress: false
            });
            // console.log(this.state.partnervorschlaege)

        }).catch(e => this.setState({
            partnervorschlaege: "Nothing received.",
            error: e,
            loadingInProgress: false
        }));

        this.setState({
            loadingInProgress: true,
            error: null
        });
    }

    componentDidMount() {
    this.getPartnervorschlaege();
    }


    render() {
        const {classes} = this.props;
        const {partnervorschlaege=[], error, loadingInProgress} = this.state;

        return (
            <div className={classes.root} >
                <Grid>
                    <Grid item>
                        <Typography>
                            Test 1.0.0
                        </Typography>
                    </Grid>
                </Grid>
                Ich wurde zumindest bis hierhin geladen.

                Jetzt kommen Partnervorschläge:

                {
                    partnervorschlaege.map(partnervorschlag =>
                    <PartnervorschlaegeEntry
                        key={partnervorschlag.getID()}
                        partnervorschlaege={partnervorschlag}
                    />)
                }
                <ContextErrorMessage
                    error={error} contextErrorMsg={`Nicht geklappt`}
                    onReload={this.getPartnervorschlaege}
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
  personFilter: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  }
});

/** PropTypes */
AllPartnervorschlaege.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired
}

export default withRouter(withStyles(styles)(AllPartnervorschlaege));