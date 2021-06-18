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
            alleGruppenTeilnahmen: []
        }
    }

    getAlleGruppenTeilnahmenForGruppe = () => {
        StudooAPI.getAPI().getGruppenTeilnahmenForGruppenID(this.props.lerngruppe.getID())
            .then(gruppenTeilnahmen => {
                this.setState({
                    alleGruppenTeilnahmen: gruppenTeilnahmen
                })
            })
    }

    componentDidMount() {
        this.getAlleGruppenTeilnahmenForGruppe()
    }

    render() {
        const { classes } = this.props;
        const { lerngruppe, alleGruppenTeilnahmen } = this.state;

        return (
            <Typography>
                {
                    alleGruppenTeilnahmen ?
                        <Typography>
                            Das sind alle Gruppenteilnehmer: <br/><br/>
                            {
                                alleGruppenTeilnahmen.map(gruppenteilnahme =>
                                    <TeilnehmerListEntry
                                        currentperson={this.props.currentperson}
                                        gruppenteilnahme={gruppenteilnahme}
                                        lerngruppe={lerngruppe}
                                    />
                                )
                            }
                        </Typography>
                        :
                        null
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