import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import {Container, ThemeProvider, CssBaseline, Typography} from '@material-ui/core';
import PersonenList from './components/PersonenList';
import PersonListEntry from "./components/PersonListEntry";
import LerngruppenList from "./components/LerngruppenList";
import firebase from 'firebase/app';
import 'firebase/auth';
import Registrieren from './components/pages/Registrieren'
/*import TransactionList from './components/TransactionList';
import About from './components/pages/About';
import AllAccountList from './components/AllAccountList';
import Theme from './Theme';

 */
import SignIn from './components/pages/SignIn';
import LoadingProgress from './components/dialogs/LoadingProgress';
import ContextErrorMessage from './components/dialogs/ContextErrorMessage';
import firebaseConfig from './firebaseconfig';
import AllProfile from './components/AllProfile';
import ProfilEntry from "./components/ProfilEntry";
import AllGruppenvorschlaege from './components/AllGruppenvorschlaege';
import AllPartnervorschlaege from './components/AllPartnervorschlaege';
import LernvorliebenList from "./components/LernvorliebenList";
import KonversationenList from "./components/KonversationenList";
import NachrichtenList from "./components/NachrichtenList";
import HeaderComplete from "./components/header/HeaderComplete";
import theme from "./components/header/theme";
import {StudooAPI} from "./api";
import PartnerExplorer from "./components/PartnerExplorer";
import ProfilVorschau from "./components/ProfilVorschau";
import AktuellesProfil from "./components/AktuellesProfil";
import ProfilForm from "./components/dialogs/ProfilForm";

/**
 * The main bank administration app. It uses Googles firebase to log into the bank end. For routing the
 * user to the respective pages, react-router-dom ist used.
 *
 * @see See Google [firebase.auth()](https://firebase.google.com/docs/reference/js/firebase.auth.Auth)
 * @see See Google [firebase.auth().signInWithRedirect](https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signinwithredirect)
 * @see [react-router-dom](https://reacttraining.com/react-router/web/guides/quick-start)
 *
 * @author [Christoph Kunz](https://github.com/christophkunz)
 */
class App extends React.Component {

	/** Constructor of the app, which initializes firebase  */
	constructor(props) {
		super(props);

		// Init an empty state
		this.state = {
			currentUser: null,
			currentPersonBO: null,
			appError: null,
			authError: null,
			authLoading: false
		};
	}

	/**
	 * Create an error boundary for this app and recieve all errors from below the component tree.
	 *
	 * @See See Reacts [Error Boundaries](https://reactjs.org/docs/error-boundaries.html)
	 */
	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI.
		return {appError: error};
	}

	getCurrentPerson = (uid) => {
		StudooAPI.getAPI().getPersonByUID(uid)
        .then(personBO => this.setState({
				currentPersonBO: personBO
			}));
	}

	/** Handles firebase users logged in state changes  */
	handleAuthStateChange = user => {
		if (user) {
			this.setState({
				authLoading: true
			});
			// The user is signed in
			user.getIdToken().then(token => {
				// Add the token to the browser's cookies. The server will then be
				// able to verify the token against the API.
				// SECURITY NOTE: As cookies can easily be modified, only put the
				// token (which is verified server-side) in a cookie; do not add other
				// user information.
				document.cookie = `token=${token};path=/`;
				console.log("-------------")
				console.log("Das ist der Token: (aus handleAuthState in App.js")
				console.log(token)
				console.log("-------------")

				// Set the user not before the token arrived
				this.setState({
					currentUser: user,
					authError: null,
					authLoading: false
				});
				this.getCurrentPerson(this.state.currentUser.uid)
			}).catch(e => {
				this.setState({
					authError: e,
					authLoading: false
				});
			});
		} else {
			// User has logged out, so clear the id token
			document.cookie = 'token=;path=/';

			// Set the logged out user to null
			this.setState({
				currentUser: null,
				authLoading: false
			});
		}
	}

	/**
	 * Handles the sign in request of the SignIn component uses the firebase.auth() component to sign in.
	 * @see See Google [firebase.auth()](https://firebase.google.com/docs/reference/js/firebase.auth.Auth)
	 * @see See Google [firebase.auth().signInWithRedirect](https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signinwithredirect)
	 */
	handleSignIn = () => {
		this.setState({
			authLoading: true
		});
		const provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithRedirect(provider);
	}

	/**
	 * Lifecycle method, which is called when the component gets inserted into the browsers DOM.
	 * Initializes the firebase SDK.
	 *
	 * @see See Googles [firebase init process](https://firebase.google.com/docs/web/setup)
	 */
	componentDidMount() {
		firebase.initializeApp(firebaseConfig);
		firebase.auth().languageCode = 'en';
		firebase.auth().onAuthStateChanged(this.handleAuthStateChange);
	}

	/** Renders the whole app <AktuellesProfil person={currentPersonBO} user={currentUser} />
										*/
	render() {
		const {currentUser, currentPersonBO, appError, authError, authLoading} = this.state;

		return (
				<Router basename={process.env.PUBLIC_URL}>
					<Container maxWidth='md'>
						{
							currentUser ?
								<>
									{
										currentPersonBO ?
											<>
												{
													currentPersonBO.getAlter() === 0 ?
														<>
															<Registrieren person={currentPersonBO} user={currentUser}/>
														</>
														:
														<>
															<HeaderComplete user={currentUser}/>
																{/**
																 <Redirect from='/' to='/partnervorschlaege' />
																 */}
															<Route path='/lerngruppen'>
																<LerngruppenList person={currentPersonBO}/>
															</Route>
															<Route path='/personen'>
																<PersonenList user={currentUser}/>
															</Route>
															<Route path='/profil'>
																<ProfilVorschau person={currentPersonBO} user={currentUser}/>
															</Route>
															<Route path='/vorschlaege'>
																<AllPartnervorschlaege person={currentPersonBO}/>
																<AllGruppenvorschlaege person={currentPersonBO}/>
															</Route>
															<Route path='/lernvorlieben'>
																<LernvorliebenList/>
															</Route>
															<Route path='/nachrichten'>
																<NachrichtenList/>
															</Route>
															<Route path='/konversationen'>
																<KonversationenList person={currentPersonBO}/>
															</Route>
															<Route path='/partnerexplorer'>
																<PartnerExplorer person={currentPersonBO}/>
															</Route>
														</>
												}
											</>
											:
											null
									}
								</>
								:
								<>
									<Redirect to='/index.html'/>
									<SignIn onSignIn={this.handleSignIn}/>
								</>
						}
					</Container>
				</Router>
		);
	}
}
export default App;