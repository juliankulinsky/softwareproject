import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PersonForm from './dialogs/PersonForm';
import PersonDeleteDialog from './dialogs/PersonDeleteDialog';
//import AccountList from './AccountList';


class PartnervorschlaegeEntry extends Component {
    constructor(props) {
        super(props);

        this.state = {
            partnervorschlag: props.partnervorschlag
        }
    }

    render() {
        const { classes } = this.props;
        const { partnervorschlag } = this.state;

        return (
            <div>
                <Grid>
                    <Grid item>
                        <Typography className={classes.heading}>
                            PartnervorschlagID:{partnervorschlag.getID()} &nbsp;
                            Matchpoints: {partnervorschlag.getMatchpoints()}
                        </Typography>
                    </Grid>
                </Grid>
            </div>
        )
    }

}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%',
  }
});

/** PropTypes */
PartnervorschlaegeEntry.propTypes = {
  /** @ignore */
  //classes: PropTypes.object.isRequired,
  /** The CustomerBO to be rendered */
  partnervorschlaege: PropTypes.object.isRequired,

}

export default withStyles(styles)(PartnervorschlaegeEntry);