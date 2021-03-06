import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import theme from "./theme.js";

/**
 * Renders a landing page for users who are not signed in. Provides a sign in button
 * for using an existing google account to sign in. The component uses firebase to
 * do redirect based signin process.
 *
 * @see See Googles [firebase authentication](https://firebase.google.com/docs/web/setup)
 * @see See Googles [firebase API reference](https://firebase.google.com/docs/reference/js)
 *
 */
class SignIn extends Component {


	/**
	 * Handles the click event of the sign in button an calls the prop onSignIn handler
	 */
	handleSignInButtonClicked = () => {
		this.props.onSignIn();
	}

	/** Renders the sign in page, if user is logged out or user object equals null*/
	render() {

		return (
			<div style={theme.root}>
				<Card style={theme.card}>
					<CardContent>
						<div style={theme.imagediv}>
							<img src={process.env.PUBLIC_URL + '/logo192.png'} alt="Logo" style={theme.image}/>
						</div>
						<Typography align='left' variant='h4' style={theme.typo}>Willkommen bei Studoo &#128526;</Typography>
						<Typography align='left' variant='h6' style={theme.typo}>
							Willst du dich mit neuen Kommilitionen vernetzen oder neue Lerngruppen finden?
							Dann bist du hier genau richtig!
						</Typography>
						<Typography align='left' variant='h6' style={theme.typo}>
							Melde dich über den untenstehenden Button mit deinem Google-Account an, damit es losgehen kann!
						</Typography>
						<Typography align='left' variant='h6' style={theme.typo}>
							Wir freuen uns auf spannende Matches! &#128521;
						</Typography>
					</CardContent>

					<CardActions>
						<Grid container justify='center'>
							<Grid item>
								<Button variant='contained' color='primary' onClick={this.handleSignInButtonClicked}>
									Anmelden über Google
								</Button>
						</Grid>
					</Grid>
					</CardActions>

				</Card>
			</div>
		);
	}
}

/** PropTypes */
SignIn.propTypes = {
	/** @ignore */
	classes: PropTypes.object,
	/**
	 * Handler function, which is called if the user wants to sign in.
	 */
	onSignIn: PropTypes.func,
}

export default SignIn;