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
import {resolveToLocation} from "react-router-dom/modules/utils/locationUtils";

/**
 * Diese Klasse abstrahiert das REST-Interface vom Python-Backend mit zugänglichen Methoden.
 * Diese Klasse wurde als Singleton implementiert, das bedeutet, dass genau ein Objekt dieser Klasse existiert.
 */
export default class StudooAPI {

    // Singleton-Instanz
    static #api = null;

    // Lokales Python-Backend
    #studooServerBaseURL = '/studoo';

    // Person-bezogen
    #getPersonenURL = () => `${this.#studooServerBaseURL}/personen`;
    #addPersonURL = () => `${this.#studooServerBaseURL}/personen`;
    #getPersonURL = (id) => `${this.#studooServerBaseURL}/person/${id}`;
    #getPersonByUIDURL = (id) => `${this.#studooServerBaseURL}/googleuserid/${id}/person`;
    #getPersonenByKonversationURL = (konversation_id) => `${this.#studooServerBaseURL}/konversation/${konversation_id}/personen`;
    #updatePersonURL = (id) => `${this.#studooServerBaseURL}/person/${id}`;
    #deletePersonURL = (id) => `${this.#studooServerBaseURL}/person/${id}`;

    // Profil-bezogen
    #getProfileURL = () => `${this.#studooServerBaseURL}/profile`;
    #addProfilURL = () => `${this.#studooServerBaseURL}/profile`;
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
    #getLerngruppenURL = () => `${this.#studooServerBaseURL}/lerngruppen`;
    #getLerngruppenByPersonIDURL = (personid) => `${this.#studooServerBaseURL}/person/${personid}/lerngruppen`;
    #getLerngruppeOfKonversationIDURL = (konversationid) => `${this.#studooServerBaseURL}/konversation/${konversationid}/lerngruppe`;
    #addLerngruppeURL = () => `${this.#studooServerBaseURL}/lerngruppen`;
    #getLerngruppeURL = (id) => `${this.#studooServerBaseURL}/lerngruppe/${id}`;
    #updateLerngruppeURL = (id) => `${this.#studooServerBaseURL}/lerngruppe/${id}`;
    #deleteLerngruppeURL = (id) => `${this.#studooServerBaseURL}/lerngruppe/${id}`;

    // Konversation-bezogen
    #getKonversationenURL = () => `${this.#studooServerBaseURL}/konversationen`;
    #getKonversationenByPersonIDURL = (personid) => `${this.#studooServerBaseURL}/person/${personid}/konversationen`
    #addKonversationURL = () => `${this.#studooServerBaseURL}/konversationen`;
    #getKonversationURL = (id) => `${this.#studooServerBaseURL}/konversation/${id}`;
    #updateKonversationURL = (id) => `${this.#studooServerBaseURL}/konversation/${id}`;
    #deleteKonversationURL = (id) => `${this.#studooServerBaseURL}/konversation/${id}`;

    // Nachricht-bezogen
    #getNachrichtenURL = () => `${this.#studooServerBaseURL}/nachrichten`;
    #getNachrichtenByKonversationIDURL = (konversationid) => `${this.#studooServerBaseURL}/konversation/${konversationid}/nachrichten`;
    #addNachrichtenURL = () => `${this.#studooServerBaseURL}/nachrichten`;
    #getNachrichtURL = (id) => `${this.#studooServerBaseURL}/nachricht/${id}`;
    #updateNachrichtURL = (id) => `${this.#studooServerBaseURL}/nachricht/${id}`;
    #deleteNachrichtURL = (id) => `${this.#studooServerBaseURL}/nachricht/${id}`;

    // ChatTeilnahme-bezogen
    #getChatTeilnahmenURL = () => `${this.#studooServerBaseURL}/chatteilnahmen`;
    #addChatTeilnahmeURL = () => `${this.#studooServerBaseURL}/chatteilnahmen`;
    #getChatTeilnahmeURL = (id) => `${this.#studooServerBaseURL}/chatteilnahme/${id}`;
    #getChatTeilnahmeByPersonIDundKonversationIDURL = (personid,konversationid) =>
        `${this.#studooServerBaseURL}/person/${personid}/konversation/${konversationid}/chatteilnahme`;
    #updateChatTeilnahmeURL = (id) => `${this.#studooServerBaseURL}/chatteilnahme/${id}`;
    #deleteChatTeilnahmeURL = (id) => `${this.#studooServerBaseURL}/chatteilnahme/${id}`;

    // GruppenTeilnahme-bezogen
    #getGruppenTeilnahmenURL = () => `${this.#studooServerBaseURL}/gruppenteilnahmen`;
    #addGruppenTeilnahmeURL = () => `${this.#studooServerBaseURL}/gruppenteilnahmen`;
    #getGruppenTeilnahmeURL = (id) => `${this.#studooServerBaseURL}/gruppenteilnahme/${id}`;
    #getGruppenTeilnahmenByGruppenIDURL = (gruppenid) => `${this.#studooServerBaseURL}/gruppe/${gruppenid}/gruppenteilnahmen`;
    #getGruppenTeilnahmeByPersonIDundGruppenIDURL = (personid,gruppenid) =>
        `${this.#studooServerBaseURL}/person/${personid}/gruppe/${gruppenid}/gruppenteilnahme`;
    #updateGruppenTeilnahmeURL = (id) => `${this.#studooServerBaseURL}/gruppenteilnahme/${id}`;
    #deleteGruppenTeilnahmeURL = (id) => `${this.#studooServerBaseURL}/gruppenteilnahme/${id}`;

    // GruppenVorschlag-bezogen
    #getGruppenVorschlaegeURL = () => `${this.#studooServerBaseURL}/gruppenvorschlaege`;
    #getGruppenVorschlagForPersonIDURL = (personid) => `${this.#studooServerBaseURL}/person/${personid}/gruppenvorschlag`;
    #getAusgehendeGruppenAnfragenForPersonIDURL = (personid) => `${this.#studooServerBaseURL}/person/${personid}/gruppenvorschlaege/ausgehend`;
    #getEingehendeGruppenAnfragenForPersonIDURL = (personid) => `${this.#studooServerBaseURL}/person/${personid}/gruppenvorschlaege/eingehend`;
    #addGruppenVorschlagURL = () => `${this.#studooServerBaseURL}/gruppenvorschlaege`;
    #getGruppenVorschlagURL = (id) => `${this.#studooServerBaseURL}/gruppenvorschlag/${id}`;
    #updateGruppenVorschlagURL = (id) => `${this.#studooServerBaseURL}/gruppenvorschlag/${id}`;
    #deleteGruppenVorschlagURL = (id) => `${this.#studooServerBaseURL}/gruppenvorschlag/${id}`;

    // PartnerVorschlag-bezogen
    #getPartnerVorschlaegeURL = () => `${this.#studooServerBaseURL}/partnervorschlaege`;
    #getPartnerVorschlagForPersonIDURL = (personid) => `${this.#studooServerBaseURL}/person/${personid}/partnervorschlag`;
    #getEingehendePartnerAnfragenForPersonIDURL = (personid) => `${this.#studooServerBaseURL}/person/${personid}/partnervorschlaege/eingehend`;
    #getAusgehendePartnerAnfragenForPersonIDURL = (personid) => `${this.#studooServerBaseURL}/person/${personid}/partnervorschlaege/ausgehend`;
    #addPartnerVorschlagURL = () => `${this.#studooServerBaseURL}/partnervorschlaege`;
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
    /**
     *
     */
    getPersonen() {
        return fetch(this.#getPersonenURL())
            .then(response => response.json())
            .then((response) => {
                console.log(PersonBO.fromJSON(response))
                let res = PersonBO.fromJSON(response)
                return new Promise(function (resolve) {
                    resolve(res);
            })
            .catch(error => console.log('error', error));
            })
    }

    /**
    *   @param {PersonBO} personBO - Object von PersonBO
    */
    addPerson(personBO) {
        return this.#fetchAdvanced(this.#addPersonURL(), {
          method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain',
            'Content-type': 'application/json',
          },
          body: JSON.stringify(personBO)
        }).then((responseJSON) => {
          // We always get an array of CustomerBOs.fromJSON, but only need one object
          let responsePersonBO = PersonBO.fromJSON(responseJSON)[0];
          // console.info(accountBOs);
          return new Promise(function (resolve) {
            resolve(responsePersonBO);
          })
        })
      }
    /**
    *   @param {Number} personenID - ID von PersonBO
    */
    getPerson(personenID) {
    return this.#fetchAdvanced(this.#getPersonURL(personenID)).then((responseJSON) => {
      // We always get an array of CustomerBOs.fromJSON, but only need one object
      let responsePersonBO = PersonBO.fromJSON(responseJSON)[0];
      // console.info(responseCustomerBO);
      return new Promise(function (resolve) {
        resolve(responsePersonBO);
      })
    })
    }

    getPersonByUID(personenUID) {
    return this.#fetchAdvanced(this.#getPersonByUIDURL(personenUID)).then((responseJSON) => {
      // We always get an array of CustomerBOs.fromJSON, but only need one object
      let responsePersonBO = PersonBO.fromJSON(responseJSON)[0];
      // console.info(responseCustomerBO);
      return new Promise(function (resolve) {
        resolve(responsePersonBO);
      })
    })
    }

    getPersonenByKonversationID(konversation_id) {
        return this.#fetchAdvanced(this.#getPersonenByKonversationURL(konversation_id))
            .then((responseJSON) => {
                let responsePersonenBOs = PersonBO.fromJSON(responseJSON);
                return new Promise(function (resolve) {
                    resolve(responsePersonenBOs)
                })
            })
    }

    /**
    *   @param {PersonBO} personBO - Object von PersonBO
    */
    updatePerson(personBO) {
        return this.#fetchAdvanced(this.#updatePersonURL(personBO.getID()), {
          method: 'PUT',
          headers: {
            'Accept': 'application/json, text/plain',
            'Content-type': 'application/json',
          },
          body: JSON.stringify(personBO)
        }).then((responseJSON) => {
          // We always get an array of CustomerBOs.fromJSON
          let responsePersonBO = PersonBO.fromJSON(responseJSON)[0];
          // console.info(accountBOs);
          return new Promise(function (resolve) {
            resolve(responsePersonBO);
          })
        })
    }

    /**
    *   @param {Number} personID -
    */
    deletePerson(personID) {
    return this.#fetchAdvanced(this.#deletePersonURL(personID), {
      method: 'DELETE'
    }).then((responseJSON) => {
      // We always get an array of CustomerBOs.fromJSON
      let responsePersonBO = PersonBO.fromJSON(responseJSON)[0];
      // console.info(accountBOs);
      return new Promise(function (resolve) {
        resolve(responsePersonBO);
      })
    })
    }

    // Profil-bezogene Methoden
    /**
     * Returns a Promise, which resolves to an Array of ProfilBOs
     *
     * @public
     */
   getProfile() {
        return fetch(this.#getProfileURL())
            .then(response => response.json())
            .then((response) => {
                console.log(ProfilBO.fromJSON(response))
                let res = ProfilBO.fromJSON(response)
                return new Promise(function (resolve) {
                    resolve(res);
            })
            .catch(error => console.log('error', error));
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
        return this.#fetchAdvanced(this.#getLernvorliebenURL())
          .then((responseJSON) => {
              let lernvorliebenBOS = LernvorliebeBO.fromJSON(responseJSON);
              return new Promise(function (resolve) {
                resolve(lernvorliebenBOS);
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
    /**
     * Returns a Promise, which resolves to an Array of LerngruppeBO.
     *
     * @public
     * */
    getLerngruppen() {
        return this.#fetchAdvanced(this.#getLerngruppenURL())
          .then((responseJSON) => {
              let lerngruppenBOS = LerngruppeBO.fromJSON(responseJSON);
              return new Promise(function (resolve) {
                resolve(lerngruppenBOS);
              })
          })
    }

    /** Alle Lerngruppen, an denen eine bestimmte Person, identifiziert bei ihrer ID, teilnimmt*/
    getLerngruppenForPersonID(personID) {
        return this.#fetchAdvanced(this.#getLerngruppenByPersonIDURL(personID))
          .then((responseJSON) => {
              let lerngruppenBOS = LerngruppeBO.fromJSON(responseJSON);
              return new Promise(function (resolve) {
                resolve(lerngruppenBOS);
              })
          })
    }

    /** Die zu einer Konversation gehörende Lerngruppe ausgeben NUR wenn Konversation gruppenchat ist*/
    getLerngruppeOfKonversationID(konversationID) {
        return this.#fetchAdvanced(this.#getLerngruppeOfKonversationIDURL(konversationID))
          .then((responseJSON) => {
              let lerngruppenBO = LerngruppeBO.fromJSON(responseJSON)[0];
              return new Promise(function (resolve) {
                resolve(lerngruppenBO);
              })
          })
    }

    /** Adds a learninggroup and returns a Promise, which resolves to a new LerngruppeBO object.
     * @param {LerngruppeBO} lerngruppeBO to be added. The ID of the new learninggroup is set by the backend.
     * @public */
    addLerngruppe(lerngruppeBO) {
    return this.#fetchAdvanced(this.#addLerngruppeURL(), {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain',
            'Content-type': 'application/json',
        },
        body: JSON.stringify(lerngruppeBO)
    }).then((responseJSON) => {
        let responseLerngruppeBO = LerngruppeBO.fromJSON(responseJSON)[0];
        return new Promise(function (resolve) {
            resolve(responseLerngruppeBO);
    })
    })
    }

    /** Returns a Promise, which resolves to a LerngruppeBO.
   * @param {Number} lerngruppeID to be retrieved.
   * @public */
    getLerngruppe(lerngruppeID) {
        return this.#fetchAdvanced(this.#getLerngruppeURL(lerngruppeID)).then((responseJSON) => {
            let responseLerngruppeBO = LerngruppeBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseLerngruppeBO);
          })
        })
      }

    /** Updates a learninggroup and returns a Promise, which resolves to a new LerngruppeBO object.
     * @param {LerngruppeBO} lerngruppeBO to be added. The ID of the new learninggroup is set by the backend.
     * @public */
    updateLerngruppe(lerngruppeBO) {
    return this.#fetchAdvanced(this.#updateLerngruppeURL(), {
        method: 'PUT',
        headers: {
            'Accept': 'application/json, text/plain',
            'Content-type': 'application/json',
        },
        body: JSON.stringify(lerngruppeBO)
    }).then((responseJSON) => {
        let responseLerngruppeBO = LerngruppeBO.fromJSON(responseJSON)[0];
        return new Promise(function (resolve) {
            resolve(responseLerngruppeBO);
    })
    })
    }

    /** Returns a Promise, which resolves to an Array of LerngruppeBO
     * @param {Number} lerngruppeID to be deleted.
     * @public  */
    deleteLerngruppe(lerngruppeID) {
        return this.#fetchAdvanced(this.#deleteLerngruppeURL(lerngruppeID), {
            method: 'DELETE'
    }).then((responseJSON) => {
        let responseLerngruppeBO = LerngruppeBO.fromJSON(responseJSON)[0];
        return new Promise(function (resolve) {
            resolve(responseLerngruppeBO);
        })
    })
    }


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

    /**Für eine PersonID alle Konversationen bekommen*/
    getKonversationenForPersonID(personID) {
        return this.#fetchAdvanced(this.#getKonversationenByPersonIDURL(personID)).then((responseJSON) => {
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

    /**Nachrichten einer ausgewählten Konversation*/
    getNachrichtenByKonversationID(konversation_id) {
        return this.#fetchAdvanced(this.#getNachrichtenByKonversationIDURL(konversation_id)).then((responseJSON) => {
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
    /**
     * Returns a Promise, which resolves to an Array of ChatteilnahmeBO
     *
     * @public
     */
    getChatTeilnahmen() {
        return this.#fetchAdvanced(this.#getChatTeilnahmenURL()).then((responseJSON) => {
            let chatteilnahmeBOs = ChatTeilnahmeBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(chatteilnahmeBOs);
            })
        })
    }

    /**
     * Adds a Chatteilnahme and returns a Promise, which resolves to a new ChatteilnahmeBO object.
     *
     * @param {ChatTeilnahmeBO} chatteilnahmeBO to be added. The ID of the new Chatteilnahme is set by the backend
     * @public
     */
    addChatTeilnahmen(chatteilnahmeBO) {
        return this.#fetchAdvanced(this.#addChatTeilnahmeURL(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(chatteilnahmeBO)
        }).then((responseJSON) => {
            let responseChatteilnahmeBO = ChatTeilnahmeBO.fromJSON(responseJSON)[0];
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
    getChatTeilnahme(chatteilnahmeID) {
        return this.#fetchAdvanced(this.#getChatTeilnahmeURL(chatteilnahmeID)).then((responseJSON) => {
            let responseChatteilnahmeBO = ChatTeilnahmeBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseChatteilnahmeBO);
            })
        })
    }

    getChatTeilnahmeByPersonIDundKonversationID(person_id, gruppen_id) {
        return this.#fetchAdvanced(this.#getChatTeilnahmeByPersonIDundKonversationIDURL(person_id, gruppen_id)).then((responseJSON) => {
            let responseChatteilnahmeBO = ChatTeilnahmeBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseChatteilnahmeBO);
            })
        })
    }

    /**
     * Updates a Chatteilnahme and returns a Promise, which resolves to a new ChatteilnahmeBO object.
     *
     * @param {ChatTeilnahmeBO} chatteilnahmeBO to be added. The ID of the new conversation is set by the backend
     * @public
     */
    updateChatTeilnahme(chatteilnahmeBO) {
        return this.#fetchAdvanced(this.#updateChatTeilnahmeURL(), {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(chatteilnahmeBO)
        }).then((responseJSON) => {
            let responseChatteilnahmeBO = ChatTeilnahmeBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseChatteilnahmeBO);
            })
        })
    }

    /**
     * Returns a Promise, which resolves to an Array of ChatteilnahmeBO.
     *
     * @param {Number} chatteilnahmeID to be deleted
     * @public
     */
    deleteChatTeilnahme(chatteilnahmeID) {
        return this.#fetchAdvanced(this.#deleteChatTeilnahmeURL(chatteilnahmeID), {
            method: 'DELETE'
        }).then((responseJSON) => {
            let responseChatteilnahmeBO = ChatTeilnahmeBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseChatteilnahmeBO);
            })
        })
    }

    // GruppenTeilnahme-bezogene Methoden
    /** Returns a Promise, which resolves to an Array of GruppenTeilnahmeBO.
     * @public */
    getGruppenTeilnahmen() {
        return this.#fetchAdvanced(this.#getGruppenTeilnahmenURL()).then((responseJSON) => {
            let gruppenteilnahmenBOs = GruppenTeilnahmeBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(gruppenteilnahmenBOs);
            })
        })
    }

    /** Adds a groupparticipation and returns a Promise, which resolves to a new GruppenTeilnahmeBO object.
     * @param {GruppenTeilnahmeBO} gruppenteilnahmeBO to be added. The ID of the new groupparticipation
     * is set by the backend.
     * @public */
    addGruppenTeilnahme(gruppenteilnahmeBO) {
    return this.#fetchAdvanced(this.#addGruppenTeilnahmeURL(), {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain',
            'Content-type': 'application/json',
        },
        body: JSON.stringify(gruppenteilnahmeBO)
    }).then((responseJSON) => {
        let responseGruppenTeilnahmeBO = GruppenTeilnahmeBO.fromJSON(responseJSON)[0];
        return new Promise(function (resolve) {
            resolve(responseGruppenTeilnahmeBO);
    })
    })
    }

    /** Returns a Promise, which resolves to a GruppenTeilnahmeBO.
   * @param {Number} gruppenteilnahmeID to be retrieved.
   * @public */
    getGruppenTeilnahme(gruppenteilnahmeID) {
        return this.#fetchAdvanced(this.#getGruppenTeilnahmeURL(gruppenteilnahmeID)).then((responseJSON) => {
            let responseGruppenTeilnahmeBO = GruppenTeilnahmeBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseGruppenTeilnahmeBO);
          })
        })
      }

    getGruppenTeilnahmenForGruppenID(gruppenID) {
        return this.#fetchAdvanced(this.#getGruppenTeilnahmenByGruppenIDURL(gruppenID)).then((responseJSON) => {
            let gruppenteilnahmenBOs = GruppenTeilnahmeBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(gruppenteilnahmenBOs);
            })
        })
    }

    getGruppenTeilnahmeByPersonIDundGruppenID(personID,gruppenID) {
        return this.#fetchAdvanced(this.#getGruppenTeilnahmeByPersonIDundGruppenIDURL(personID,gruppenID)).then((responseJSON) => {
            let responseGruppenTeilnahmeBO = GruppenTeilnahmeBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseGruppenTeilnahmeBO);
          })
        })
    }

    /** Updates a groupparticipation and returns a Promise, which resolves to a new GruppenTeilnahmeBO object.
     * @param {GruppenTeilnahmeBO} gruppenteilnahmeBO to be added. The ID of the new groupparticipation is set by the backend.
     * @public */
    updateGruppenTeilnahme(gruppenteilnahmeBO) {
    return this.#fetchAdvanced(this.#updateGruppenTeilnahmeURL(), {
        method: 'PUT',
        headers: {
            'Accept': 'application/json, text/plain',
            'Content-type': 'application/json',
        },
        body: JSON.stringify(gruppenteilnahmeBO)
    }).then((responseJSON) => {
        let responseGruppenTeilnahmeBO = GruppenTeilnahmeBO.fromJSON(responseJSON)[0];
        return new Promise(function (resolve) {
            resolve(responseGruppenTeilnahmeBO);
    })
    })
    }

    /** Returns a Promise, which resolves to an Array of GruppenTeilnahmeBO.
     * @param {Number} gruppenteilnahmeID to be deleted.
     * @public  */
    deleteGruppenTeilnahme(gruppenteilnahmeID) {
        return this.#fetchAdvanced(this.#deleteGruppenTeilnahmeURL(gruppenteilnahmeID), {
            method: 'DELETE'
    }).then((responseJSON) => {
        let responseGruppenTeilnahmeBO = GruppenTeilnahmeBO.fromJSON(responseJSON)[0];
        return new Promise(function (resolve) {
            resolve(responseGruppenTeilnahmeBO);
        })
    })
    }


    // GruppenVorschlag-bezogene Methoden
    /** Returns a Promise, which resolves to an Array of GruppenVorschlaegeBOs.
     * @public */
    getGruppenVorschlaege() {
        return this.#fetchAdvanced(this.#getGruppenVorschlaegeURL())
            .then((response) => {
                let res = GruppenVorschlagBO.fromJSON(response)
                return new Promise(function (resolve) {
                    resolve(res);
            })})
    }

    getGruppenVorschlagForPersonID(personID) {
        return this.#fetchAdvanced(this.#getGruppenVorschlagForPersonIDURL(personID))
            .then((response) => {
                let res = GruppenVorschlagBO.fromJSON(response)[0]
                if (res.getID() != null){
                    return new Promise(function (resolve) {
                        resolve(res);
                    })
                }
            })
    }

    getAusgehendeGruppenVorschlaegeForPersonID(person_id) {
        return this.#fetchAdvanced(this.#getAusgehendeGruppenAnfragenForPersonIDURL(person_id))
            .then((response) => {
                let res = GruppenVorschlagBO.fromJSON(response)
                return new Promise(function (resolve) {
                    resolve(res);
            })})
    }

    getEingehendeGruppenVorschlaegeForPersonID(person_id) {
        return this.#fetchAdvanced(this.#getEingehendeGruppenAnfragenForPersonIDURL(person_id))
            .then((response) => {
                let res = GruppenVorschlagBO.fromJSON(response)
                return new Promise(function (resolve) {
                    resolve(res);
            })})
    }

    /** Adds a groupsuggestion and returns a Promise, which resolves to a new GruppenVorschlagBO object.
     * @param {GruppenVorschlagBO} gruppenvorschlagBO to be added. The ID of the new groupsuggestion
     * is set by the backend.
     * @public */
    addGruppenVorschlag(gruppenvorschlagBO) {
    return this.#fetchAdvanced(this.#addGruppenVorschlagURL(), {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain',
            'Content-type': 'application/json',
        },
        body: JSON.stringify(gruppenvorschlagBO)
    }).then((responseJSON) => {
        let responseGruppenVorschlagBO = GruppenVorschlagBO.fromJSON(responseJSON)[0];
        return new Promise(function (resolve) {
            resolve(responseGruppenVorschlagBO);
    })
    })
    }

    /** Returns a Promise, which resolves to a GruppenVorschlagBO.
   * @param {Number} gruppenvorschlagID to be retrieved.
   * @public */
    getGruppenVorschlag(gruppenvorschlagID) {
        return this.#fetchAdvanced(this.#getGruppenVorschlagURL(gruppenvorschlagID)).then((responseJSON) => {
            let responseGruppenVorschlagBO = GruppenVorschlagBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseGruppenVorschlagBO);
          })
        })
      }

    /** Updates a groupsuggestion and returns a Promise, which resolves to a new GruppenVorschlagBO object.
     * @param {GruppenVorschlagBO} gruppenvorschlagBO to be added. The ID of the new groupsuggestion is set by the backend.
     * @public */
    updateGruppenVorschlag(gruppenvorschlagBO) {
        return this.#fetchAdvanced(this.#updateGruppenVorschlagURL(gruppenvorschlagBO.getID()), {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(gruppenvorschlagBO)
        }).then((responseJSON) => {
            let responseGruppenVorschlagBO = GruppenVorschlagBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseGruppenVorschlagBO);
        })
        })
    }

    /** Returns a Promise, which resolves to an Array of GruppenVorschlagBO.
     * @param {Number} gruppenvorschlagID to be deleted.
     * @public  */
    deleteGruppenVorschlag(gruppenvorschlagID) {
        return this.#fetchAdvanced(this.#deleteGruppenVorschlagURL(gruppenvorschlagID), {
            method: 'DELETE'
    }).then((responseJSON) => {
        let responseGruppenVorschlagBO = GruppenVorschlagBO.fromJSON(responseJSON)[0];
        return new Promise(function (resolve) {
            resolve(responseGruppenVorschlagBO);
        })
    })
    }


    // PartnerVorschlag-bezogene Methoden
    /**
     * Returns a Promise, which resolves to an Array of PartnervorschlagBO
     *
     * @public
     */
    getPartnerVorschlaege() {
        return this.#fetchAdvanced(this.#getPartnerVorschlaegeURL())
            .then((responseJSON) => {
                let res = PartnerVorschlagBO.fromJSON(responseJSON)
                return new Promise(function (resolve) {
                    resolve(res);
            })
        })
    }

    getPartnerVorschlagByPersonID(person_id) {
        return this.#fetchAdvanced(this.#getPartnerVorschlagForPersonIDURL(person_id))
            .then((responseJSON) => {
                let res = PartnerVorschlagBO.fromJSON(responseJSON)[0]
                if (res.getID() != null){
                    return new Promise(function (resolve) {
                    resolve(res);
                    })
                } else return null

        })
    }

    getEingehendePartnerVorschlaegeForPersonID(person_id) {
        return this.#fetchAdvanced(this.#getEingehendePartnerAnfragenForPersonIDURL(person_id))
            .then((responseJSON) => {
                let res = PartnerVorschlagBO.fromJSON(responseJSON)
                return new Promise(function (resolve) {
                    resolve(res);
            })
        })
    }

    getAusgehendePartnerVorschlaegeForPersonID(person_id) {
        return this.#fetchAdvanced(this.#getAusgehendePartnerAnfragenForPersonIDURL(person_id))
            .then((responseJSON) => {
                let res = PartnerVorschlagBO.fromJSON(responseJSON)
                return new Promise(function (resolve) {
                    resolve(res);
            })
        })
    }


    /**
     * Adds a Partnervorschlag and returns a Promise, which resolves to a new PartnervorschlagBO object.
     *
     * @param {PartnerVorschlagBO} partnervorschlagBO to be added. The ID of the new Partnervorschlag is set by the backend
     * @public
     */
    addPartnerVorschlaege(partnervorschlagBO) {
        return this.#fetchAdvanced(this.#addPartnerVorschlagURL(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(partnervorschlagBO)
        }).then((responseJSON) => {
            let responsePartnervorschlagBO = PartnerVorschlagBO.fromJSON(responseJSON)[0];
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
    getPartnerVorschlag(partnervorschlagID) {
        return this.#fetchAdvanced(this.#getPartnerVorschlagURL(partnervorschlagID)).then((responseJSON) => {
            let responsePartnervorschlagBO = PartnerVorschlagBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responsePartnervorschlagBO);
            })
        })
    }

    /**
     * Updates a Partnervorschlag and returns a Promise, which resolves to a new PartnervorschlagBO object.
     *
     * @param {PartnerVorschlagBO} partnervorschlagBO to be added. The ID of the new Partnervorschlag is set by the backend
     * @public
     */
    updatePartnerVorschlag(partnervorschlagBO) {
        return this.#fetchAdvanced(this.#updatePartnerVorschlagURL(partnervorschlagBO.getID()), {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(partnervorschlagBO)
        }).then((responseJSON) => {
            let responsePartnervorschlagBO = PartnerVorschlagBO.fromJSON(responseJSON)[0];
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
    deletePartnerVorschlag(partnervorschlagID) {
        return this.#fetchAdvanced(this.#deletePartnerVorschlagURL(partnervorschlagID), {
            method: 'DELETE'
        }).then((responseJSON) => {
            let responsePartnervorschlagBO = PartnerVorschlagBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responsePartnervorschlagBO);
            })
        })
    }

}




