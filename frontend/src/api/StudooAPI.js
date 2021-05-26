import ChatTeilnahmeBO from "./ChatTeilnahmeBO";
import GruppenTeilnahmeBO from "./GruppenTeilnahmeBO";
import GruppenVorschlagBO from "./GruppenVorschlagBO";
import KonversationBO from "./KonversationBO";
import LerngruppeBO from "./LerngruppeBO";
import LernvorliebeBO from "./LernvorliebeBO";
import NachrichtBO from "./NachrichtBO";
import PartnerVorschlagBO from "./PartnerVorschlagBO";
import PersonBO from "./PersonBO";
import ProfilBO from "./ProfilBO";

/**
 * Diese Klasse abstrahiert das REST-Interface vom Python-Backend mit zugänglichen Methoden.
 * Diese Klasse wurde als Singleton implementiert, das bedeutet, dass genau ein Objekt dieser Klasse existiert.
 */
export default class BankAPI {

    // Singleton-Instanz
    static #api = null;

    // Lokales Python-Backend
    #studooServerBaseURL = "/studoo";

    // Person-bezogen
    #getPersonenURL = () => `${this.#studooServerBaseURL}/personen`;
    #addPersonURL = () => `${this.#studooServerBaseURL}/personen`;
    #getPersonURL = (id) => `${this.#studooServerBaseURL}/person/${id}`;
    #updatePersonURL = (id) => `${this.#studooServerBaseURL}/person/${id}`;
    #deletePersonURL = (id) => `${this.#studooServerBaseURL}/person/${id}`;

    // Profil-bezogen

    // Lernvorliebe-bezogen

    // Lerngruppe-bezogen

    // Konversation-bezogen

    #getKonversationenURL = () => `${this.#studooServerBaseURL}/konversationen`;
    #addKonversationURL = () => `${this.#studooServerBaseURL}/konversationen`;
    #getKonversationURL = (id) => `${this.#studooServerBaseURL}/konversation/${id}`;
    #updateKonversationURL = (id) => `${this.#studooServerBaseURL}/konversation/${id}`;
    #deleteKonversationURL = (id) => `${this.#studooServerBaseURL}/konversation/${id}`;

    // Nachricht-bezogen

    #getNachrichtenURL = () => `${this.#studooServerBaseURL}/nachrichten`;
    #addNachrichtenURL = () => `${this.#studooServerBaseURL}/nachrichten`;
    #getNachrichtURL = (id) => `${this.#studooServerBaseURL}/nachricht/${id}`;
    #updateNachrichtURL = (id) => `${this.#studooServerBaseURL}/nachricht/${id}`;
    #deleteNachrichtURL = (id) => `${this.#studooServerBaseURL}/nachricht/${id}`;

    // ChatTeilnahme-bezogen

    // GruppenTeilnahme-bezogen

    // GruppenVorschlag-bezogen

    // PartnerVorschlag-bezogen

    /**
     * Getter für die Instanz dieser Klasse (Singleton)
     *
     * @public
     */
    static getAPI() {
        if (this.#api == null) {
            this.#api = new BankAPI()
        }
        return this.#api
    }

    /**
     *  Returns a Promise which resolves to a json object.
     *  The Promise returned from fetch() won’t reject on HTTP error status even if the response is an HTTP 404 or 500.
     *  fetchAdvanced throws an Error also an server status errors
     */
    #fetchAdvanced = (url, init) => fetch(url, init)
        .then(res => {
            if (!res.ok) {
                throw Error(`${res.status} ${res.statusText}`);
            }
            return res.json();
        })

    // Person-bezogene Methoden

    // Profil-bezogene Methoden

    // Lernvorliebe-bezogene Methoden

    // Lerngruppe-bezogene Methoden

    // Konversation-bezogene Methoden

    // Nachricht-bezogene Methoden

    // ChatTeilnahme-bezogene Methoden

    // GruppenTeilnahme-bezogene Methoden

    // GruppenVorschlag-bezogene Methoden

    // PartnerVorschlag-bezogene Methoden

}