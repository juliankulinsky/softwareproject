import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { Popover, IconButton, Avatar, ClickAwayListener, withStyles, Typography, Paper, Button, Grid, Divider } from '@material-ui/core';
import firebase from 'firebase/app';
import {Link} from "react-router-dom";


/**
 * Zeigt eine Drop Down Liste für den angemeldeten User an, welche zum Profil führt oder die
 * Möglichkeit sich auszuloggen, dafür wird die Methode firebase.auth().signOut() genutzt.
 *
 * @see See Material-UIs [Popover](https://material-ui.com/components/popover/)
 * @see See Material-UIs [ClickAwayListener](https://material-ui.com/components/click-away-listener/)
 * @see See Googles [firebase authentication](https://firebase.google.com/docs/web/setup)
 * @see See Googles [firebase API reference](https://firebase.google.com/docs/reference/js)
 *
 */
class ProfileDropDown extends Component {

  // a refernce to the avatar button
  #avatarButtonRef = createRef();

  constructor(props) {
    super(props);

    // Init the state
    this.state = {
      open: false,
    }
  }

  /** Verarbeitet Click events auf den Avatar-Button und zeigt/versteckt den Dialog. */
  handleAvatarButtonClick = () => {
    this.setState({
      open: !this.state.open
    });
  }

  /**
   * Verarbeitet Click Away Events, also für den Fall, wenn woanders hingeklickt wird.
   *
   * @see See Material-UIs [ClickAwayListener](https://material-ui.com/components/click-away-listener/)
   */
  handleClose = () => {
    this.setState({
      open: false
    });
  }

  /**
	 * Verarbeitet das Click Event des Anmelde Buttons und nutzt firebase.auth() für das einloggen.
     *
	 * @see See Google [firebase.auth](https://firebase.google.com/docs/reference/js/firebase.auth.Auth)
	 * @see See Google [firebase.auth().signOut](https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signout)
	 */
  handleSignOutButtonClicked = () => {
    firebase.auth().signOut();
  }

  /** Rendert das ProfileDropDown, wenn ein angemeldeter Benutzer als prop gegeben ist */
  render() {
    const { classes, user } = this.props;
    const { open } = this.state;

    return (
      user ?
        <div>
          <IconButton className={classes.avatarButton} ref={this.#avatarButtonRef} onClick={this.handleAvatarButtonClick}>
            <Avatar src={user.photoURL} />
          </IconButton>

          <Popover open={open} anchorEl={this.#avatarButtonRef.current} onClose={this.handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}>
            <ClickAwayListener onClickAway={this.handleClose}>
              <Paper className={classes.profileBox}>
                <Link to="/profil">
                  <Typography align='center'>Zum Profil</Typography>
                </Link>
                <Divider className={classes.divider} />
                <Typography align='center'>Du bist eingeloggt als:</Typography>
                <Typography align='center' variant='body2'>{user.displayName}</Typography>
                <Typography align='center' variant='body2'>{user.email}</Typography>
                <Divider className={classes.divider} />
                <Grid container justify='center'>
                  <Grid item>
                    <Button color='primary' onClick={this.handleSignOutButtonClicked}>Logout</Button>
                  </Grid>
                </Grid>
              </Paper>
            </ClickAwayListener>
          </Popover>
        </div>
          :
          <Typography>
            <h6>Loading Error</h6>
          </Typography>
    )
  }
}

/** Komponenten spezifische styles */
const styles = theme => ({

  divider: {
    margin: theme.spacing(1),
  },
  profileBox: {
    padding: theme.spacing(1),
    background: theme.palette.background.default,
  }
});

/** PropTypes */
ProfileDropDown.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The logged in firesbase user */
  user: PropTypes.object,
}

export default withStyles(styles)(ProfileDropDown)
