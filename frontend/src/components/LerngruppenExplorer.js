import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    withStyles,
    Button,
    Typography,
    Card,
    CardContent,
    Fab
} from '@material-ui/core';
import {NavLink, withRouter} from 'react-router-dom';
import StudooAPI from '../api/StudooAPI'
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import {GruppenVorschlagBO, LerngruppeBO} from "../api";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "./components-theme.css";

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
                <div className="toggleExplore">
                    <NavLink to="/explorer" className="toggleExploreNavLink">
                        <Button className="toggleExploreButtonPartner">
                            <Typography>Partner</Typography>
                        </Button>
                    </NavLink>
                    <NavLink to="/groupexplorer" className="toggleExploreNavLink">
                        <Button className="toggleExploreButton">
                            <Typography style={{color: '#04A2CA'}}>Gruppen</Typography>
                        </Button>
                    </NavLink>
                </div>
                {
                    (gruppenvorschlag && lerngruppe) ?
                        <div className="partnervorschlag">
                            <Fab disabled={this.state.buttonPressed} size="large"
                                    onClick={this.entscheidungFalse} className="buttonFalse">
                                <CancelIcon fontSize="large"/>
                            </Fab>

                            <Card>
                                <CardContent className="partnercard">
                                    <div>
                                        <Typography variant="h3">
                                            It's a match! &#127881;
                                        </Typography>
                                        <Typography variant="h4">
                                            {lerngruppe.getGruppenname()}
                                        </Typography>
                                        <Typography variant="subtitle1">
                                            Euer Match basiert auf einer Ähnlichkeit von {gruppenvorschlag.getAehnlichkeit()}%!
                                        </Typography>
                                        <Typography variant="subtitle1">
                                            Du kannst nun eine Konversation mit {lerngruppe.getGruppenname()} anfangen.
                                        </Typography>
                                        <Typography variant="subtitle1">
                                            Entscheide dich, indem du das Match annimmst oder ablehnst.
                                        </Typography>
                                        <Typography variant="h5">
                                            Happy Learning! &#128640;
                                        </Typography>
                                    </div>

                                    <div>
                                        <img src={process.env.PUBLIC_URL + '/logo192.png'}/>
                                    </div>
                                </CardContent>
                            </Card>

                            <Fab disabled={this.state.buttonPressed}
                                    onClick={this.entscheidungTrue} size="large" className="buttonTrue">
                                <CheckCircleIcon fontSize="large"/>
                            </Fab>
                        </div>
                        :
                        <div className="partnervorschlag">
                            <Fab disabled={this.state.buttonPressed} size="large"
                                    onClick={this.entscheidungFalse} className="buttonFalse">
                                <CancelIcon fontSize="large"/>
                            </Fab>

                            <Card>
                                <CardContent className="partnercard">
                                    <div>
                                        <Typography variant="h3">
                                            It should be a match! &#128580;
                                        </Typography>
                                        <Typography variant="h4">
                                            Und hier sollte dein Partner stehen ...
                                        </Typography>
                                        <Typography variant="subtitle1">
                                            Irgendwas ist da nicht ganz richtig.
                                        </Typography>
                                        <Typography variant="subtitle1">
                                            Entweder du lädst die Seite neu oder kontaktierst unseren Support.
                                        </Typography>
                                        <Typography variant="h5">
                                            Happy Waiting for Solution! &#128540;
                                        </Typography>
                                    </div>

                                    <div>
                                        <img src={process.env.PUBLIC_URL + '/logo192.png'}/>
                                    </div>
                                </CardContent>
                            </Card>

                            <Fab disabled={this.state.buttonPressed}
                                    onClick={this.entscheidungTrue} size="large" className="buttonTrue">
                                <CheckCircleIcon fontSize="large"/>
                            </Fab>
                        </div>
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