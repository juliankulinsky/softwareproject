import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles,
    Typography,
    Container} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import {StudooAPI} from "../api";
import ContextErrorMessage from "./dialogs/ContextErrorMessage";
import "./components-theme.css";


class NachrichtListEntry extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nachricht: props.nachricht,
            absenderPerson: null,
            currentPerson: props.currentPerson,
            buttonPressed: false,
            error: null,
            loadingInProgress: false
        }
    }

    getAbsenderPerson = () => {
        StudooAPI.getAPI().getPerson(this.props.nachricht.getAbsenderID())
            .then(absenderPerson => {
                this.setState({
                    absenderPerson: absenderPerson,
                    error: null,
                    loadingInProgress: false
                })
            }).catch(e => this.setState({
            absenderPerson: null,
            error: e,
            loadingInProgress: false
        }));

        this.setState({
            loadingInProgress: true,
            error: null
        });
    }

    deleteNachricht = () => {
        this.setState({
            buttonPressed: true,
        })
        StudooAPI.getAPI().deleteNachricht(this.state.nachricht.getID())
    }

    EigeneNachricht = () => {
        return <div className="nachrichtRight">
                    <div className="chatBubbleRight">
                        {
                            this.state.nachricht.getInhalt()
                        }

                        <div className="nachrichtAbsender">
                            von dir
                        </div>
                    </div>

                    <IconButton disabled={this.state.buttonPressed}
                                aria-label={"delete"}
                                onClick={this.deleteNachricht}
                                variant={"contained"} >
                        <DeleteIcon />
                    </IconButton>
               </div>
    }

    FremdeNachricht = () => {
        return <div className="nachrichtLeft">
            <div className="chatBubbleLeft">
                {
                    this.state.nachricht.getInhalt()
                }

                <div className="nachrichtAbsender">
                    von {this.state.absenderPerson.getName()}
                </div>
            </div>
        </div>
    }

    Anzeige = () => {
        if (this.state.currentPerson.getID()===this.state.absenderPerson.getID()){
            return this.EigeneNachricht()
        }
        else {
            return this.FremdeNachricht()
        }
    }

    componentDidMount() {
        this.getAbsenderPerson()
    }

    render() {
        const { classes } = this.props;
        const { nachricht, absenderPerson, currentPerson, error, loadingInProgress } = this.state;

        return (
            <Container className="root">
                <Typography>
                    {
                        absenderPerson ?
                        this.Anzeige()
                            : null
                    }
                </Typography>

                <ContextErrorMessage
                    error={error} contextErrorMsg={`Nicht geklappt`}
                    onReload={this.getAbsenderPerson}
                />
            </Container>
        )
    }
}

/** Component specific styles */
const styles = theme => ({
  root: {
      width: '100%',
      flexGrow: 1
  },

    right: {
      textAlign: "right"
    },

    left: {
      textAlign: "left"
    }


});

/** PropTypes */
NachrichtListEntry.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The CustomerBO to be rendered */
  nachricht: PropTypes.object.isRequired,

}

export default withStyles(styles)(NachrichtListEntry);