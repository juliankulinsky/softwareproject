import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    withStyles,
    Button,
    Typography,
    Card,
    CardContent,
    Fab,
} from '@material-ui/core';
import { withRouter, NavLink } from 'react-router-dom';
import StudooAPI from '../api/StudooAPI'
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import {PartnerVorschlagBO} from "../api";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from '@material-ui/icons/Cancel';
import "./components-theme.css"
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
                <div className="toggleExplore">
                    <NavLink to="/explorer" className="toggleExploreNavLink">
                        <Button className="toggleExploreButtonPartner">
                            <Typography style={{color: '#04A2CA'}}>Partner</Typography>
                        </Button>
                    </NavLink>
                    <NavLink to="/groupexplorer" className="toggleExploreNavLink">
                        <Button className="toggleExploreButton">
                            <Typography>Gruppen</Typography>
                        </Button>
                    </NavLink>
                </div>
                {
                    (partnervorschlag && anderePerson) ?
                        <div className="partnervorschlag">
                            <Fab disabled={this.state.buttonPressed} size="large"
                                    onClick={this.entscheidungFalse} className="buttonFalse">
                                <CancelIcon fontSize="large"/>
                            </Fab>

                            <Card>
                                <CardContent className="partnercard">
                                    <div>
                                        <Typography variant="h4">
                                            Dein Vorschlag.
                                            <ProfilVorschau person={anderePerson} selfperson={false}/>
                                            {/*anderePerson.getName()}, {anderePerson.getAlter()
                                        </Typography>
                                        <Typography variant="subtitle1">
                                            Euer Match basiert auf einer Ähnlichkeit von {partnervorschlag.getAehnlichkeit()}%!
                                        </Typography>
                                        <Typography variant="subtitle1">
                                            Du kannst nun eine Konversation mit {anderePerson.getName()} anfangen.
                                        </Typography>
                                        <Typography variant="subtitle1">
                                            Entscheide dich, indem du das Match annimmst oder ablehnst.
                                        </Typography>
                                        <Typography variant="h5">
                                            Happy Learning! &#128640;*/}
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