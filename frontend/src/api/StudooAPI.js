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
    #getChatTeilnahmenURL = () => `${this.#studooServerBaseURL}/chatteilnahme`;
    #addChatTeilnahmeURL = () => `${this.#studooServerBaseURL}/chatteilnahme`;
    #getChatTeilnahmeURL = (id) => `${this.#studooServerBaseURL}/chatteilnahme/${id}`;
    #updateChatTeilnahmeURL = (id) => `${this.#studooServerBaseURL}/chatteilnahme/${id}`;
    #deleteChatTeilnahmeURL = (id) => `${this.#studooServerBaseURL}/chatteilnahme/${id}`;
    // GruppenTeilnahme-bezogen

    // GruppenVorschlag-bezogen

    // PartnerVorschlag-bezogen
    #getPartnerVorschlaegeURL = () => `${this.#studooServerBaseURL}/partnervorschlag`;
    #addPartnerVorschlagURL = () => `${this.#studooServerBaseURL}/partnervorschlag`;
    #getPartnerVorschlagURL = (id) => `${this.#studooServerBaseURL}/partnervorschlag/${id}`;
    #updatePartnerVorschlagURL = (id) => `${this.#studooServerBaseURL}/partnervorschlag/${id}`;
    #deletePartnerVorschlagURL = (id) => `${this.#studooServerBaseURL}/partnervorschlag/${id}`;
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

    // Lernvorliebe-bezogene Methoden

    // Lerngruppe-bezogene Methoden

    // Konversation-bezogene Methoden

    // Nachricht-bezogene Methoden

    // ChatTeilnahme-bezogene Methoden
    /**
     * Returns a Promise, which resolves to an Array of ChatteilnahmeBO
     *
     * @public
     */
    getChatteilnahmen() {
        return this.#fetchAdvanced(this.#getChatTeilnahmenURL()).then((responseJSON) => {
            let chatteilnahmeBOs = ChatteilnahmeBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(chatteilnahmeBOs);
            })
        })
    }

    /**
     * Adds a Chatteilnahme and returns a Promise, which resolves to a new ChatteilnahmeBO object.
     *
     * @param {ChatteilnahmeBO} chatteilnahmeBO to be added. The ID of the new Chatteilnahme is set by the backend
     * @public
     */
    addChatteilnahme(chatteilnahmeBO) {
        return this.#fetchAdvanced(this.#addChatTeilnahmeURL(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(chatteilnahmeBO)
        }).then((responseJSON) => {
            let responseChatteilnahmeBO = ChatteilnahmeBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseChatteilnahmeBO);
            })
        })
    }

    /**
     * Returns a Promise, which resolves to a ChatteilnahmeBO
     *
     * @param {Number} chatteilnahmeID to be retrieved
     * @public
     */
    getChatteilnahme(chatteilnahmeID) {
        return this.#fetchAdvanced(this.#getChatTeilnahmeURL(chatteilnahmeID)).then((responseJSON) => {
            let responseChatteilnahmeBO = ChatteilnahmeBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseChatteilnahmeBO);
            })
        })
    }

    /**
     * Updates a Chatteilnahme and returns a Promise, which resolves to a new ChatteilnahmeBO object.
     *
     * @param {ChatteilnahmeBO} chatteilnahmeBO to be added. The ID of the new conversation is set by the backend
     * @public
     */
    updateChatteilnahme(chatteilnahmeBO) {
        return this.#fetchAdvanced(this.#updateChatTeilnahmeURL(), {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(chatteilnahmeBO)
        }).then((responseJSON) => {
            let responseChatteilnahmeBO = ChatteilnahmeBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseChatteilnahmeBO);
            })
        })
    }

    /**
     * Returns a Promise, which resolves to an Array of ChatteilnahmeBO
     *
     * @param {Number} chatteilnahmeID to be deleted
     * @public
     */
    deleteChatteilnahme(chatteilnahmeID) {
        return this.#fetchAdvanced(this.#deleteChatTeilnahmeURL(partnervorschlagID), {
            method: 'DELETE'
        }).then((responseJSON) => {
            let responseChatteilnahmeBO = ChatteilnahmeBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseChatteilnahmeBO);
            })
        })
    }

    // GruppenTeilnahme-bezogene Methoden

    // GruppenVorschlag-bezogene Methoden

    // PartnerVorschlag-bezogene Methoden
    /**
     * Returns a Promise, which resolves to an Array of PartnervorschlagBO
     *
     * @public
     */
    getPartnervorschlag() {
        return this.#fetchAdvanced(this.#getPartnerVorschlaegeURL()).then((responseJSON) => {
            let partnervorschlagBOs = PartnervorschlagBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(partnervorschlagBOs);
            })
        })
    }

    /**
     * Adds a Partnervorschlag and returns a Promise, which resolves to a new PartnervorschlagBO object.
     *
     * @param {PartnervorschlagBO} partnervorschlagBO to be added. The ID of the new Partnervorschlag is set by the backend
     * @public
     */
    addPartnervorschlag(partnervorschlagBO) {
        return this.#fetchAdvanced(this.#addPartnerVorschlagURL(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(partnervorschlagBO)
        }).then((responseJSON) => {
            let responsePartnervorschlagBO = PartnervorschlagBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responsePartnervorschlagBO);
            })
        })
    }

    /**
     * Returns a Promise, which resolves to a PartnervorschlagBO
     *
     * @param {Number} partnervorschlagID to be retrieved
     * @public
     */
    getPartnervorschlag(partnervorschlagID) {
        return this.#fetchAdvanced(this.#getPartnerVorschlagURL(partnervorschlagID)).then((responseJSON) => {
            let responsePartnervorschlagBO = PartnervorschlagBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responsePartnervorschlagBO);
            })
        })
    }

    /**
     * Updates a Partnervorschlag and returns a Promise, which resolves to a new PartnervorschlagBO object.
     *
     * @param {PartnervorschlagBO} partnervorschlagBO to be added. The ID of the new Partnervorschlag is set by the backend
     * @public
     */
    updatePartnervorschlag(partnervorschlagBO) {
        return this.#fetchAdvanced(this.#updatePartnerVorschlagURL(), {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(partnervorschlagBO)
        }).then((responseJSON) => {
            let responsePartnervorschlagBO = PartnervorschlagBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responsePartnervorschlagBO);
            })
        })
    }

    /**
     * Returns a Promise, which resolves to an Array of PartnervorschlagBO
     *
     * @param {Number} partnervorschlagID to be deleted
     * @public
     */
    deletePartnervorschlag(partnervorschlagID) {
        return this.#fetchAdvanced(this.#deletePartnerVorschlagURL(partnervorschlagID), {
            method: 'DELETE'
        }).then((responseJSON) => {
            let responsePartnervorschlagBO = PartnervorschlagBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responsePartnervorschlagBO);
            })
        })
    }

