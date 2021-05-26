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
import {StudooAPI} from "./index";

/**
 * Diese Klasse abstrahiert das REST-Interface vom Python-Backend mit zugänglichen Methoden.
 * Diese Klasse wurde als Singleton implementiert, das bedeutet, dass genau ein Objekt dieser Klasse existiert.
 */
export default class StudooAPI {

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
    #getProfileURL = () => `${this.#studooServerBaseURL}/profile`;
    #addProfilURL = () => `${this.#studooServerBaseURL}/profil`;
    #getProfilURL = (id) => `${this.#studooServerBaseURL}/profil/${id}`;
    #updateProfilURL = (id) => `${this.#studooServerBaseURL}/profil/${id}`;
    #deleteProfilURL = (id) => `${this.#studooServerBaseURL}/profil/${id}`;

    // Lernvorliebe-bezogen
    #getLernvorliebenURL = () => `${this.#studooServerBaseURL}/lernvorlieben`;
    #addLernvorliebeURL = () => `${this.#studooServerBaseURL}/lernvorlieben`;
    #getLernvorliebeURL = (id) => `${this.#studooServerBaseURL}/lernvorliebe/${id}`;
    #updateLernvorliebeURL = (id) => `${this.#studooServerBaseURL}/lernvorliebe/${id}`;
    #deleteLernvorliebeURL = (id) => `${this.#studooServerBaseURL}/lernvorliebe/${id}`;

    // Lerngruppe-bezogen

    // Konversation-bezogen

    // Nachricht-bezogen

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
            this.#api = new StudooAPI();
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
    /**
     * Returns a Promise, which resolves to an Array of ProfilBOs
     *
     * @public
     */
    getProfile() {
        return this.#fetchAdvanced(this.#getProfileURL()).then((responseJSON) => {
            let profilBOs = ProfilBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(profilBOs);
            })
        })
    }

    /**
     * Returns a Promise, which resolves to a ProfilBO
     *
     * @public
     * @param {Number} profilID to be retrieved
     */
    getProfil(profilID) {
        return this.#fetchAdvanced(this.#getProfilURL(profilID)).then((responseJSON) => {
            let responseProfilBO = ProfilBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseProfilBO);
            })
        })
    }

    /**
     * Adds a profile and returns a Promise, which resolves to a new ProfilBO object with the
     * lernvorliebenID of the parameter profilBO object.
     *
     * @param {ProfilBO} profilBO to be added. The ID of the new profile is set by the backend
     * @public
     */
    addProfil(profilBO) {
        return this.#fetchAdvanced(this.#addProfilURL(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(profilBO)
        }).then((responseJSON) => {
            let responseProfilBO = ProfilBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseProfilBO);
            })
        })
    }

    /**
     * Updates a profile and returns a Promise, which resolves to a ProfilBO.
     *
     * @param {ProfilBO} profilBO to be updated.
     * @public
     */
    updateProfil(profilBO) {
        return this.#fetchAdvanced(this.#updateProfilURL(profilBO.getID()), {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(profilBO)
        }).then((responseJSON) => {
            let responseProfilBO = ProfilBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseProfilBO);
            })
        })
    }

    /**
     * Returns a Promise, which resolves to an Array of ProfilBOs
     *
     * @param {Number} profilID to be deleted.
     * @public
     */
    deleteProfil(profilID) {
        return this.#fetchAdvanced(this.#deleteProfilURL(profilID), {
            method: 'DELETE'
        }).then((responseJSON) => {
            let responseProfilBO = ProfilBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseProfilBO);
            })
        })
    }

    // Lernvorliebe-bezogene Methoden
    /**
     * Returns a Promise, which resolves to an Array of LernvorliebeBOs
     *
     * @public
     */
    getLernvorlieben() {
        return this.#fetchAdvanced(this.#getLernvorliebenURL()).then((responseJSON) => {
            let lernvorliebeBOs = LernvorliebeBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(lernvorliebeBOs);
            })
        })
    }

    /**
     * Returns a Promise, which resolves to a LernvorliebeBO
     *
     * @public
     * @param {Number} lernvorliebeID to be retrieved
     */
    getLernvorliebe(lernvorliebeID) {
        return this.#fetchAdvanced(this.#getLernvorliebeURL(lernvorliebeID)).then((responseJSON) => {
            let responseLernvorliebeBO = LernvorliebeBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseLernvorliebeBO);
            })
        })
    }

    /**
     * Adds a lernvorliebe and returns a Promise, which resolves to a new LernvorliebeBO object with the
     * lerntyp, frequenz, extrovertiertheit, remote_praesenz, vorkenntnisse and lerninteressen
     * of the parameter profilBO object.
     *
     * @param {LernvorliebeBO} lernvorliebeBO to be added. The ID of the new lernvorliebe is set by the backend
     * @public
     */
    addLernvorliebe(lernvorliebeBO) {
        return this.#fetchAdvanced(this.#addLernvorliebeURL(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(lernvorliebeBO)
        }).then((responseJSON) => {
            let responseLernvorliebeBO = LernvorliebeBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseLernvorliebeBO);
            })
        })
    }

    /**
     * Updates a lernvorliebe and returns a Promise, which resolves to a LernvorliebeBO.
     *
     * @param {LernvorliebeBO} lernvorliebeBO to be updated.
     * @public
     */
    updateLernvorliebe(lernvorliebeBO) {
        return this.#fetchAdvanced(this.#updateLernvorliebeURL(lernvorliebeBO.getID()), {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(lernvorliebeBO)
        }).then((responseJSON) => {
            let responseLernvorliebeBO = LernvorliebeBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseLernvorliebeBO);
            })
        })
    }

    /**
     * Returns a Promise, which resolves to an Array of LernvorliebeBOs
     *
     * @param {Number} lernvorliebeID to be deleted.
     * @public
     */
    deleteLernvorliebe(lernvorliebeID) {
        return this.#fetchAdvanced(this.#deleteLernvorliebeURL(lernvorliebeID), {
            method: 'DELETE'
        }).then((responseJSON) => {
            let responseLernvorliebeBO = LernvorliebeBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseLernvorliebeBO);
            })
        })
    }

    // Lerngruppe-bezogene Methoden

    // Konversation-bezogene Methoden

    // Nachricht-bezogene Methoden

    // ChatTeilnahme-bezogene Methoden

    // GruppenTeilnahme-bezogene Methoden

    // GruppenVorschlag-bezogene Methoden

    // PartnerVorschlag-bezogene Methoden

}