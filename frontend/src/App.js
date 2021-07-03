import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import LerngruppenList from "./components/LerngruppenList";
import firebase from 'firebase/app';
import 'firebase/auth';
import Registrieren from './components/pages/Registrieren'
import SignIn from './components/pages/SignIn';
import firebaseConfig from './firebaseconfig';
import KonversationenList from "./components/KonversationenList";
import NachrichtenList from "./components/NachrichtenList";
import HeaderComplete from "./components/header/HeaderComplete";
import {StudooAPI} from "./api";
import PartnerExplorer from "./components/PartnerExplorer";
import ProfilVorschau from "./components/ProfilVorschau";
import LerngruppenExplorer from "./components/LerngruppenExplorer";
import EingehendeAnfragenList from "./components/EingehendeAnfragenList";
import AusgehendeAnfragenList from "./components/AusgehendeAnfragenList";

/**
 * The Haupt-Studoo Applikation. Google Firebase wird verwendet, um sich in das Backend "einzuloggen". Für das Routing
 * auf bestimmte Seiten wird react-router-dom benutzt
 */

class App extends React.Component {

	/** Konstruktor der Applikation, welcher Firebase initialisiert  */
	constructor(props) {
		super(props);

		this.state = {
			currentUser: null,
			currentPersonBO: null,
			appError: null,
			authError: null,
			authLoading: false
		};
	}

	/**
	 * Erstellt ein Error-Boundary für diese Applikation und erhält alle Errors des Komponenten-Baums von unten
	 */
	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI.
		return {appError: error};
	}

	/**
	 * Lädt ein PersonBO anhand der GoogleUserID des aktuellen Users (übergeben von Firebase) aus dem Backend
	 *
	 * @param uid
	 */
	getCurrentPerson = (uid) => {
		StudooAPI.getAPI().getPersonByUID(uid)
			.then(personBO => this.setState({
				currentPersonBO: personBO
			}));
	}

	/** Handhabt Firebase Benutzer Einlogg-State-Veränderungen  */
	handleAuthStateChange = user => {
		if (user) {
			this.setState({
				authLoading: true
			});
			user.getIdToken().then(token => {
				document.cookie = `token=${token};path=/`;

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
			document.cookie = 'token=;path=/';

			this.setState({
				currentUser: null,
				authLoading: false
			});
		}
	}

	/**
	 * Handhabt den Sign-In auf Anfrage der SignIn-Komponente und verwendet firebase.auth() Komponente zum Sign-In
	 */
	handleSignIn = () => {
		this.setState({
			authLoading: true
		});
		const provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithRedirect(provider);
	}

	/**
	 * Lifecycle Methode, welche aufgerufen wird wenn die Komponente in den DOM des Browsers eingefügt wird.
	 * Initialisiert Firebase SDK.
	 */
	componentDidMount() {
		firebase.initializeApp(firebaseConfig);
		firebase.auth().languageCode = 'en';
		firebase.auth().onAuthStateChanged(this.handleAuthStateChange);
	}

	/** Rendert	die gesamte Applikation anhand der Routen */
	render() {
		const {currentUser, currentPersonBO, appError, authError, authLoading} = this.state;

		return (
			<Router basename={process.env.PUBLIC_URL}>
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
													<Redirect to='/index.html'/>
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
													<Route path='/profil'>
														<ProfilVorschau person={currentPersonBO} user={currentUser}
																		selfperson={true}/>
													</Route>
													<Route path='/nachrichten'>
														<NachrichtenList person={currentPersonBO}/>
													</Route>
													<Route path='/konversationen'>
														<KonversationenList person={currentPersonBO}/>
													</Route>
													<Route path='/explorer'>
														<PartnerExplorer person={currentPersonBO}/>
													</Route>
													<Route path='/groupexplorer'>
														<LerngruppenExplorer person={currentPersonBO}/>
													</Route>
													<Route path='/anfragen'>
														<EingehendeAnfragenList person={currentPersonBO}/>
													</Route>
													<Route path='/anfragenausgehend'>
														<AusgehendeAnfragenList person={currentPersonBO}/>
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
							<SignIn onSignIn={this.handleSignIn}/>
						</>
				}
			</Router>
		);
	}
}
export default App;