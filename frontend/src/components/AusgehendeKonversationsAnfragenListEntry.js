import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PersonForm from './dialogs/PersonForm';
import PersonDeleteDialog from './dialogs/PersonDeleteDialog';
import {PartnerVorschlagBO, StudooAPI} from "../api";
import LoadingProgress from "./dialogs/LoadingProgress";
import ContextErrorMessage from "./dialogs/ContextErrorMessage";
import TeilnehmerListEntry from "./TeilnehmerListEntry";
import PopUpProfil from "./dialogs/PopUpProfil";
//import AccountList from './AccountList';


class AusgehendeKonversationsAnfragenListEntry extends Component {
    constructor(props) {
        super(props);

        this.state = {
            anfrage: this.props.anfrage,
            anderePerson: null,
            matchpoints: this.props.anfrage.getMatchpoints(),
            buttonPressed: false
        }
    }

    getAnderePerson = () => {
        if (this.props.person.getID() === this.state.anfrage.getPersonID()) {
            StudooAPI.getAPI().getPerson(this.state.anfrage.getPartnerID())
                .then(anderePerson =>
                    this.setState({
                        anderePerson: anderePerson
                    }))
        } else if (this.props.person.getID() === this.state.anfrage.getPartnerID()) {
            StudooAPI.getAPI().getPerson(this.state.anfrage.getPersonID())
                .then(anderePerson =>
                    this.setState({
                        anderePerson: anderePerson
                    }))
        }
    }

    updateKonversationsAnfrage = () => {
        this.setState({
            buttonPressed: true
        })
        let updatedPartnerVorschlag = Object.assign(new PartnerVorschlagBO(), this.state.anfrage);
        updatedPartnerVorschlag.setMatchpoints(this.state.matchpoints -= 1)
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


    getProfil = () => {
        StudooAPI.getAPI().getProfil(this.state.anderePerson.getProfilId())
        .then(profilBO => {
            this.setState({
                profil: profilBO,
                error: null,
                loadingInProgress: false
            });
        }).catch(e => this.setState({
            profil: "No profil received.",
            error: e,
            loadingInProgress: false
        }));

        this.setState({
            loadingInProgress: true,
            error: null
        });
    }

    getLernvorliebe = () => {
        StudooAPI.getAPI().getLernvorliebe(this.state.profil.getLernvorliebeID())
            .then(lernvorliebeBO => {
                this.setState({
                    lernvorliebe: lernvorliebeBO,
                    error: null,
                    loadingInProgress: false
                });
            }).catch(e => this.setState({
            personen: ["wtf"],
            error: e,
            loadingInProgress: false
        }));

        this.setState({
            loadingInProgress: true,
            error: null
        });
    }

    /** Handles the onClick event of the Popup person button */
        popUpButtonClicked = (event) => {
        event.stopPropagation();
        this.setState({
          showProfilPopUp: true
        });
    }

    popUpClosed = (event) => {
        this.setState({
          showProfilPopUp: false
        });
    }

    componentDidMount() {
        this.getAnderePerson()
    }

    render() {
        const {classes} = this.props;
        const {anfrage, anderePerson, buttonPressed,showProfilPopUp, profil, lernvorliebe} = this.state;

        return (
            <>
                {
                    (anfrage && anderePerson) ?
                        <Typography>
                            -------------- <br/>
                            Das ist eine ausgehende Partneranfrage #{anfrage.getID()}<br/>
                            Matchpoints des Vorschlags: {anfrage.getMatchpoints()} &nbsp;&nbsp;&nbsp;&nbsp;
                            <Button disabled={buttonPressed} variant={"contained"} color={"secondary"}
                                    onClick={this.updateKonversationsAnfrage}>
                                Zurückziehen
                            </Button>
                            <br/>
                            Partnername:
                            <button onClick={this.popUpButtonClicked}>
                                {
                                     anderePerson.getName()
                                }
                            </button>
                            <br/>--------------
                            <PopUpProfil show={showProfilPopUp} person={anderePerson} profil={profil} lernvorliebe={lernvorliebe} onClose={this.popUpClosed} />
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
AusgehendeKonversationsAnfragenListEntry.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,

}

export default withStyles(styles)(AusgehendeKonversationsAnfragenListEntry);