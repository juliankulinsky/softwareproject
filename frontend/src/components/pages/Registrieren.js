import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import { Button, withStyles} from '@material-ui/core';
import ProfilVorschau from "../ProfilVorschau";
import 'firebase/auth';
import LoadingProgress from "../dialogs/LoadingProgress";
import ContextErrorMessage from "../dialogs/ContextErrorMessage";
import PropTypes from 'prop-types';


class Registrieren extends Component {

    constructor(props) {
        super(props);

        this.state = {
            person: props.person,
            error: null,
            loadingInProgress: false
        }
    }

    goToAppjs = () => {
        window.location.href = process.env.PUBLIC_URL + "/index.html"
    }


    render() {
        const {classes, user} = this.props;
        const {person, loadingInProgress, error} = this.state;

        return (
            <div>
                {
                    person ?
                        <>
                            <ProfilVorschau person={person} user={user} selfperson={true}/>
                            <div className={classes.regButton}>
                                <Button id="myButton" variant={"contained"}
                                        onClick={this.goToAppjs}>Registrieren</Button>
                            </div>
                        </>
                        :
                        null
                }
                <LoadingProgress show={loadingInProgress}/>
                <ContextErrorMessage error={error} contextErrorMsg={`The list of personen could not be loaded.`}
                                     onReload={this.getPerson}/>
            </div>
        );
    }
}
/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%',
  },
  regButton: {
    marginTop: '1%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'

  }
});

Registrieren.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired
}

export default withRouter(withStyles(styles)(Registrieren));



