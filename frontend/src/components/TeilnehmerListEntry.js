import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PersonForm from './dialogs/PersonForm';
import PersonDeleteDialog from './dialogs/PersonDeleteDialog';
import {StudooAPI} from "../api";
import LoadingProgress from "./dialogs/LoadingProgress";
import ContextErrorMessage from "./dialogs/ContextErrorMessage";
import ProfilForm from "./dialogs/ProfilForm";
import PopUpProfil from "./dialogs/PopUpProfil";
//import AccountList from './AccountList';


class TeilnehmerListEntry extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lerngruppe: props.lerngruppe,
            aktuelleGruppenTeilnahme: props.gruppenteilnahme,
            teilnehmerPerson: null,
            eigeneGruppenTeilnahme: props.eigeneGruppenTeilnahme,
            showProfilPopUp: null
        }
    }

    getTeilnehmer = () => {
        StudooAPI.getAPI().getPerson(this.state.aktuelleGruppenTeilnahme.get_person_id())
            .then(teilnehmerPerson => {
                this.setState({
                    teilnehmerPerson: teilnehmerPerson
                })
            })
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
        this.getTeilnehmer()
    }

    render() {
        const {classes} = this.props;
        const {lerngruppe, aktuelleGruppenTeilnahme, teilnehmerPerson, eigeneGruppenteilnahme, showProfilPopUp} = this.state;

        return (
            <Typography>
                {
                    teilnehmerPerson ?
                        <>
                            <button onClick={this.popUpButtonClicked}>
                                {
                                    teilnehmerPerson.getName()

                                }
                            </button>
                            <Button color={"secondary"}>
                                Löschen (In Arbeit)
                            </Button>
                        </>
                        : null
                }
                <PopUpProfil show={showProfilPopUp} person={teilnehmerPerson}  onClose={this.popUpClosed} />
            </Typography>

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
TeilnehmerListEntry.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,

}

export default withStyles(styles)(TeilnehmerListEntry);