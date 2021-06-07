import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Container, ThemeProvider, CssBaseline } from '@material-ui/core';
import PersonenList from './components/PersonenList';
import PersonListEntry from "./components/PersonListEntry";
import LerngruppenList from "./components/LerngruppenList";
/*import firebase from 'firebase/app';
import 'firebase/auth';
import Header from './components/layout/Header';
import TransactionList from './components/TransactionList';
import About from './components/pages/About';
import AllAccountList from './components/AllAccountList';
import Theme from './Theme';
import SignIn from './components/pages/SignIn';
import LoadingProgress from './components/dialogs/LoadingProgress';
import ContextErrorMessage from './components/dialogs/ContextErrorMessage';
import firebaseConfig from './firebaseconfig';
*/
import TestList from './components/TestList';
import AllGruppenvorschlaege from './components/AllGruppenvorschlaege';
import AllPartnervorschlaege from './components/AllPartnervorschlaege';
import LernvorliebenList from "./components/LernvorliebenList";
import AllNachrichten from "./components/AllNachrichten";

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

    //Automatisches Weiterleiten <Redirect from='/' to='/studoo/lerngruppen'/>
    /** Renders the whole app */
    render() {
        const {currentUser, appError, authError, authLoading} = this.state;

        return (
                <Router basename={process.env.PUBLIC_URL}>
                    <Container maxWidth='md'>
                        <Route path='/studoo/lerngruppen'>
                            <TestList />
                        </Route>

                        <Route path='/studoo/personen'>
                            <PersonenList />
                        </Route>

                        <Route path='/studoo/gruppenvorschlaege'>
                            <AllGruppenvorschlaege />
                        </Route>

                        <Route path='/studoo/partnervorschlaege'>
                            <AllPartnervorschlaege />
                        </Route>

                        <Route path='/studoo/lernvorlieben'>
                            <LernvorliebenList />
                        </Route>

                        <Route path='/studoo/nachrichten'>
                            <AllNachrichten />
                        </Route>
                    </Container>
                </Router>
        );
    }
}
export default App;