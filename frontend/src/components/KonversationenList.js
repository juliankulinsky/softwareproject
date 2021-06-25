import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    withStyles,
    Box,
    Container,
    Grid,
    ListItem,
    Button,
    Card,
    TextField,
    InputAdornment,
    IconButton,
    Typography,
    ButtonBase
}
    from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear'
import { withRouter } from 'react-router-dom';
import StudooAPI from '../api/StudooAPI'
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import KonversationListEntry from "./KonversationListEntry";
import NachrichtenList from "./NachrichtenList";
import "./components-theme.css";
import {NachrichtBO} from "../api";

class KonversationenList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            konversationen: [],
            person: props.person,
            konversation: null,
            aktuellekonversation: null,
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

    setAktuelleKonversation = (konversation) => {
        this.setState({
            aktuellekonversation: null
        })
        this.setState({
            aktuellekonversation: konversation
        })
    }

    componentDidMount() {
        this.getKonversationen();
    }

    Chats = () => {
        const konversationen = this.state.konversationen

        if (konversationen.length === 0) {
            return <Typography>Du nimmst an keinen Konversationen teil.</Typography>

        } else return konversationen.map(konversation =>
            <Card>
                <ButtonBase
                    onClick={() => this.setAktuelleKonversation(konversation)}>

                    <KonversationListEntry
                        key={konversation.getID()}
                        konversation={konversation}
                        person={this.props.person}
                    />

                </ButtonBase>
            </Card>)
    }

    render() {
        const {classes, person} = this.props;
        const {konversationen, aktuellekonversation, error, loadingInProgress} = this.state;

        return (
            <Box className={classes.root}>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                    {
                        this.Chats()
                    }

                    <LoadingProgress show={loadingInProgress}/>

                    <ContextErrorMessage
                        error={error} contextErrorMsg={`Nicht geklappt`}
                        onReload={this.getKonversationen}
                    />
                    </Grid>

                    <Grid item xs>
                        {
                            aktuellekonversation ?
                                <Card className={classes.c}>
                                    {/*KonversationsID: {konversation.getID()}*/}

                                    <NachrichtenList
                                        key={aktuellekonversation.getID()}
                                        konversation={aktuellekonversation}
                                        currentPerson={person}
                                    />
                                </Card>

                                :
                                <Typography>
                                    Du hast noch <b>keine</b> Konversation ausgewählt.
                                </Typography>
                        }
                    </Grid>
                </Grid>
            </Box>
        )
    }
}

const styles = theme => ({
  root: {
      width: '100%',
      flexGrow: 1
  },

    c: {
      padding: '5px'
  },
});

/** PropTypes */
KonversationenList.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired
}

export default withRouter(withStyles(styles)(KonversationenList));