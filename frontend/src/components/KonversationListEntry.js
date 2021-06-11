import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import NachrichtenList from "./NachrichtenList";

class KonversationListEntry extends Component {
    constructor(props) {
        super(props);

        this.state = {
            konversation: props.konversation
        }
    }

    render() {
        const { classes } = this.props;
        const { konversation } = this.state;

        return (
            <div>
                <div>
                    konversation ?

                        KonversationsID: {konversation.getID()} <br/>
                        Gruppenchat: {String(konversation.getIstGruppenchat())}<br/>
                        -----------------
                        <NachrichtenList
                            currentPerson={this.props.person}
                            konversation={konversation}
                        />
                    :
                    <div>
                        Keine Konversationen
                    </div>
                </div>
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
