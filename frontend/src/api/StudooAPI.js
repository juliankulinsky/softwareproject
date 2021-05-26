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

    /**
     * Returns a Promise, which resolves to an Array of KonversationBO
     *
     * @public
     */
    getKonversationen() {
        return this.#fetchAdvanced(this.#getKonversationenURL()).then((responseJSON) => {
            let konversationenBOs = KonversationBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(konversationenBOs);
            })
        })
    }

    /**
     * Adds a conversation and returns a Promise, which resolves to a new KonversationBO object.
     *
     * @param {KonversationBO} konversationBO to be added. The ID of the new conversation is set by the backend
     * @public
     */
    addKonversation(konversationBO) {
    return this.#fetchAdvanced(this.#addKonversationURL(), {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain',
            'Content-type': 'application/json',
        },
        body: JSON.stringify(konversationBO)
    }).then((responseJSON) => {
        let responseKonversationBO = KonversationBO.fromJSON(responseJSON)[0];
        return new Promise(function (resolve) {
            resolve(responseKonversationBO);
    })
    })
    }

    /**
   * Returns a Promise, which resolves to a KonversationBO
   *
   * @param {Number} konversationID to be retrieved
   * @public
   */
    getKonversation(konversationID) {
        return this.#fetchAdvanced(this.#getKonversationURL(konversationID)).then((responseJSON) => {
            let responseKonversationBO = KonversationBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseKonversationBO);
          })
        })
      }

    /**
     * Updates a conversation and returns a Promise, which resolves to a new KonversationBO object.
     *
     * @param {KonversationBO} konversationBO to be added. The ID of the new conversation is set by the backend
     * @public
     */
    updateKonversation(konversationBO) {
    return this.#fetchAdvanced(this.#updateKonversationURL(), {
        method: 'PUT',
        headers: {
            'Accept': 'application/json, text/plain',
            'Content-type': 'application/json',
        },
        body: JSON.stringify(konversationBO)
    }).then((responseJSON) => {
        let responseKonversationBO = KonversationBO.fromJSON(responseJSON)[0];
        return new Promise(function (resolve) {
            resolve(responseKonversationBO);
    })
    })
    }

    /**
     * Returns a Promise, which resolves to an Array of KonversationBO
     *
     * @param {Number} konversationID to be deleted
     * @public
     */
    deleteKonversation(konversationID) {
        return this.#fetchAdvanced(this.#deleteKonversationURL(konversationID), {
            method: 'DELETE'
    }).then((responseJSON) => {
        let responseKonversationBO = KonversationBO.fromJSON(responseJSON)[0];
        return new Promise(function (resolve) {
            resolve(responseKonversationBO);
        })
    })
}

    // Nachricht-bezogene Methoden

    /**
     * Returns a Promise, which resolves to an Array of NachrichtBO
     *
     * @public
     */
    getNachrichten() {
        return this.#fetchAdvanced(this.#getNachrichtenURL()).then((responseJSON) => {
            let nachrichtenBOs = NachrichtBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(nachrichtenBOs);
            })
        })
    }

    /**
     * Adds a message and returns a Promise, which resolves to a new NachrichtBO object.
     *
     * @param {NachrichtBO} nachrichtBO to be added. The ID of the new message is set by the backend
     * @public
     */
    addNachricht(nachrichtBO) {
    return this.#fetchAdvanced(this.#addNachrichtenURL(), {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain',
            'Content-type': 'application/json',
        },
        body: JSON.stringify(nachrichtBO)
    }).then((responseJSON) => {
        let responseNachrichtBO = NachrichtBO.fromJSON(responseJSON)[0];
        return new Promise(function (resolve) {
            resolve(responseNachrichtBO);
    })
    })
    }

    /**
   * Returns a Promise, which resolves to a NachrichtBO
   *
   * @param {Number} nachrichtID to be retrieved
   * @public
   */
    getNachricht(nachrichtID) {
        return this.#fetchAdvanced(this.#getNachrichtURL(nachrichtID)).then((responseJSON) => {
            let responseNachrichtBO = NachrichtBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseNachrichtBO);
          })
        })
      }

    /**
     * Updates a message and returns a Promise, which resolves to a new NachrichtBO object.
     *
     * @param {NachrichtBO} nachrichtBO to be added. The ID of the new message is set by the backend
     * @public
     */
    updateNachricht(nachrichtBO) {
    return this.#fetchAdvanced(this.#updateNachrichtURL(), {
        method: 'PUT',
        headers: {
            'Accept': 'application/json, text/plain',
            'Content-type': 'application/json',
        },
        body: JSON.stringify(nachrichtBO)
    }).then((responseJSON) => {
        let responseNachrichtBO = NachrichtBO.fromJSON(responseJSON)[0];
        return new Promise(function (resolve) {
            resolve(responseNachrichtBO);
    })
    })
    }

    /**
     * Returns a Promise, which resolves to an Array of NachrichtBO
     *
     * @param {Number} nachrichtID to be deleted
     * @public
     */
    deleteNachricht(nachrichtID) {
        return this.#fetchAdvanced(this.#deleteNachrichtURL(nachrichtID), {
            method: 'DELETE'
        }).then((responseJSON) => {
            let responseNachrichtBO = NachrichtBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseNachrichtBO);
            })
        })
    }
    // ChatTeilnahme-bezogene Methoden

    // GruppenTeilnahme-bezogene Methoden

    // GruppenVorschlag-bezogene Methoden

    // PartnerVorschlag-bezogene Methoden

}