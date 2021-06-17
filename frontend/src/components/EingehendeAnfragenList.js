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
import EingehendeAnfragenListEntry from "./EingehendeAnfragenListEntry";
//import AccountList from './AccountList';


class EingehendeAnfragenList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            eingehendePartnerAnfragen: [],
        }
    }

    getEingehendePartnerAnfragen = () => {
        StudooAPI.getAPI().getEingehendePartnerVorschlaegeForPersonID(this.props.person.getID())
            .then(anfragen => {
                this.setState({
                    eingehendePartnerAnfragen: anfragen
                })
            })
    }


    componentDidMount() {
        this.getEingehendePartnerAnfragen();
    }

    render() {
        const { classes } = this.props;
        const { eingehendePartnerAnfragen } = this.state;

        return (
            <Typography>
                {
                    eingehendePartnerAnfragen.length > 0 ?
                        <Typography>
                            Das sind alle eingehenden Partneranfragen von {this.props.person.getName()}: <br/>
                            {
                                eingehendePartnerAnfragen.map( anfrage =>
                                    <EingehendeAnfragenListEntry
                                        person={this.props.person}
                                        anfrage={anfrage}
                                    />
                                )
                            }

                        </Typography>
                        :
                        <Typography>
                            Du hast keine eingehenden Partneranfragen :/
                        </Typography>

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
EingehendeAnfragenList.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,

}

export default withStyles(styles)(EingehendeAnfragenList);