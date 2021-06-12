import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import NachrichtenList from "./NachrichtenList";
import StudooAPI from '../api/StudooAPI'

class KonversationListEntry extends Component {
    constructor(props) {
        super(props);

        this.state = {
            konversation: props.konversation,
            lerngruppe: null,     // falls die Konversation ein Gruppenchat ist, ist das die zugehörige Lerngruppe
            error: null,
            loadingInProgress: false
        }
    }

    getLerngruppe = () => {
        if (this.state.konversation.ist_gruppenchat){
            StudooAPI.getAPI().getLerngruppeOfKonversationID(this.state.konversation.getID())
                .then(lerngruppe => {
                    this.setState({
                        lerngruppe: lerngruppe,
                        error: null,
                        loadingInProgress: false
                    })
                }).catch(e => this.setState({
                lerngruppe: null,
                error: e,
                loadingInProgress: false
            }));

            this.setState({
                loadingInProgress: true,
                error: null
            });
        }
    }

    componentDidMount() {
        this.getLerngruppe()
    }

    render() {
        const { classes } = this.props;
        const { konversation, lerngruppe } = this.state;

        return (
            <div>
                <Typography>
                        ----------------- <br/>
                        KonversationsID: {konversation.getID()} <br/>
                        Gruppenchat: {String(konversation.getIstGruppenchat())}<br/>
                    {
                        lerngruppe ?
                            <Typography>
                                Gruppenname: {lerngruppe.getGruppenname()}
                            </Typography>
                            : null
                    }
                        -----------------
                        <NachrichtenList
                            currentPerson={this.props.person}
                            konversation={konversation}
                        />
                    <br/>
                </Typography>
            </div>
        )
    }
}

const styles = theme => ({
    root: {
        width: '1ßß%',
    }
});

KonversationListEntry.propTypes = {
    konversation: PropTypes.object.isRequired,
}

export default withStyles(styles)(KonversationListEntry);
