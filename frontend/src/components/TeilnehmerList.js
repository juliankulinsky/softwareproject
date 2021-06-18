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
import TeilnehmerListEntry from "./TeilnehmerListEntry";
//import AccountList from './AccountList';


class TeilnehmerList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lerngruppe: props.lerngruppe,
            aktuelleGruppenTeilnahme: props.gruppenteilnahme,
            teilnehmerPerson: null,
            eigeneGruppenTeilnahme: props.eigeneGruppenTeilnahme,
            alleGruppenTeilnahmen: props.alleGruppenTeilnahmen
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


    componentDidMount() {
        this.getTeilnehmer()
    }

    render() {
        const { classes } = this.props;
        const { lerngruppe, aktuelleGruppenTeilnahme, teilnehmerPerson, eigeneGruppenTeilnahme, alleGruppenTeilnahmen } = this.state;

        return (
            <Typography>
                {
                    alleGruppenTeilnahmen.map( gruppenteilnahme =>
                        <TeilnehmerListEntry
                            currentperson={this.props.currentperson}
                            teilnehmerPerson={teilnehmerPerson}
                            lerngruppe={lerngruppe}
                            eigeneGruppenTeilnahme={eigeneGruppenTeilnahme}
                            gruppenteilnahme={gruppenteilnahme} />
                    )
                }

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
TeilnehmerList.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,

}

export default withStyles(styles)(TeilnehmerList);