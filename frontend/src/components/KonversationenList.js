import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, TextField, InputAdornment, IconButton, Grid, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear'
import { withRouter } from 'react-router-dom';
import StudooAPI from '../api/StudooAPI'
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import KonversationListEntry from "./KonversationListEntry";

class KonversationenList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            konversationen: [],
            error: null,
            loadingInProgress: false
        };
    }

    getKonversationen = () => {
        StudooAPI.getAPI().getKonversationenForPersonID(this.props.person.getID())
            .then(konversationenBOs => {
                this.setState({
                    konversationen: konversationenBOs,
                    error: null,
                    loadingInProgress: false
                });
            }).catch(e => this.setState({
            konversationen: [],
            error: e,
            loadingInProgress: false
        }));

        this.setState({
            loadingInProgress: true,
            error: null
        })
    }

    componentDidMount() {
        this.getKonversationen();
    }

    KeineKonversationen = () => {
        return <Typography>Du nimmst an keinen Konversationen teil.</Typography>
    }

    Anzeige = () => {
        let konversationen = this.state.konversationen
        if (konversationen.length===0) {
            return this.KeineKonversationen()
        }
        else return konversationen.map(konversation =>
                        <KonversationListEntry
                            key={konversation.getID()}
                            konversation={konversation}
                            person={this.props.person}
                            />)
    }

    render() {
        const { classes } = this.props;
        const { konversationen, error, loadingInProgress } = this.state;

        return (
            <div className={classes.root}>
                <Typography>
                    Das sind die Konversationen von:&nbsp;
                    {
                        this.props.person.getName()
                    }
                    <br/><br/>
                </Typography>
                {
                    this.Anzeige()
                }
                <LoadingProgress show={loadingInProgress} />
                <ContextErrorMessage
                    error={error} contextErrorMsg={`Nicht geklappt`}
                    onReload={this.getKonversationen}
                />
            </div>
        )
    }
}

const styles = theme => ({
  root: {
    width: '100%',
  },
});

/** PropTypes */
KonversationenList.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired
}

export default withRouter(withStyles(styles)(KonversationenList));