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
    #getEingehendeGruppenAnfragenForGruppenIDURL = (gruppenid) => `${this.#studooServerBaseURL}/gruppe/${gruppenid}/gruppenvorschlaege/eingehend`;
    #getGruppenVorschlaegeForGruppenIDURL = (gruppenid) => `${this.#studooServerBaseURL}/gruppe/${gruppenid}/gruppenvorschlaege`;
    #addGruppenVorschlagURL = () => `${this.#studooServerBaseURL}/gruppenvorschlaege`;
    #getGruppenVorschlagURL = (id) => `${this.#studooServerBaseURL}/gruppenvorschlag/${id}`;
    #getGruppenVorschlagByPersonIDundGruppenIDURL = (personid,gruppenid) => `${this.#studooServerBaseURL}/person/${personid}/gruppe/${gruppenid}/gruppenvorschlag`;
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
     *  Gibt ein Promise zurück, das in ein json-Objekt aufgelöst wird.
     *  Das von fetch() zurückgegebene Promise wird bei einem HTTP-Fehlerstatus nicht zurückgewiesen,
     *  auch wenn die Antwort ein HTTP-404 oder -500 ist.
     *  fetchAdvanced wirft einen Fehler auch bei einem Serverstatusfehler.
     */
    #fetchAdvanced = (url, init) => fetch(url, init)
        .then(res => {
            if (!res.ok) {
                throw Error(`${res.status} ${res.statusText}`);
            }
            return res.json();
        })

    // Personen-bezogenene Methoden

    /**
     * API Call, um alle Personen auszulesen und als Promise zurück zu geben.
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

    /*
    *   API Call, um eine Person ins System hinzuzufügen und als Promise zurückzugeben.
    *   @param {PersonBO} personBO - Übergebenes PersonenBO-Objekt
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
          let responsePersonBO = PersonBO.fromJSON(responseJSON)[0];
          return new Promise(function (resolve) {
            resolve(responsePersonBO);
          })
        })
      }


    /**
     * API Call, um eine bestimmte Person anhand der ID auszulesen und als Promise zurückzugeben.
    *   @param {Number} personenID - ID von PersonBO
    */
    getPerson(personenID) {
    return this.#fetchAdvanced(this.#getPersonURL(personenID)).then((responseJSON) => {
      let responsePersonBO = PersonBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responsePersonBO);
      })
    })
    }

    /**
    * API Call, um eine bestimmte Person anhand der UID auszulesen und als Promise zurückzugeben.
    *   @param {Number} personenUID - ID von PersonBO
    */
    getPersonByUID(personenUID) {
    return this.#fetchAdvanced(this.#getPersonByUIDURL(personenUID)).then((responseJSON) => {
      let responsePersonBO = PersonBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responsePersonBO);
      })
    })
    }

    /**
    * API Call, um eine bestimmte Person anhand der zugehörigen KonversationsID auszulesen und als Promise zurückzugeben.
    *   @param {Number} konversation_id - ID der zugehörigen Konversation
    */
    getPersonenByKonversationID(konversation_id) {
        return this.#fetchAdvanced(this.#getPersonenByKonversationURL(konversation_id))
            .then((responseJSON) => {
                // responsePersonBO ruft die statische Methode fromJSON auf
                let responsePersonenBOs = PersonBO.fromJSON(responseJSON);
                // Wir geben das darin enthaltene Objekt in einer Promise zurück.
                return new Promise(function (resolve) {
                    resolve(responsePersonenBOs)
                })
            })
    }

    /**
     * API Call, um eine bestimmte Person zu aktualisieren und als Promise zurückzugeben.
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
          // responsePersonBO ruft die statische Methode fromJSON auf
          let responsePersonBO = PersonBO.fromJSON(responseJSON)[0];
          // Wir geben das darin enthaltene Objekt in einer Promise zurück.
          return new Promise(function (resolve) {
            resolve(responsePersonBO);
          })
        })
    }

    /**
     * API Call, um eine bestimmte Person aus dem System zu löschen und als Promise zurückzugeben.
    *   @param {Number} personID -
    */
    deletePerson(personID) {
    return this.#fetchAdvanced(this.#deletePersonURL(personID), {
      method: 'DELETE'
    }).then((responseJSON) => {
      let responsePersonBO = PersonBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responsePersonBO);
      })
    })
    }

    // Profil-bezogene Methoden
    /**
     * API Call, um alle Profile auszulesen und als Promise zurück zu geben.
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
     * API-Call, um ein bestimmtes Profil anhand der ID auszulesen
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
     * API Call, um eine Profil ins System hinzuzufügen und als Promise zurückzugeben.
     *
     * @param {ProfilBO} profilBO - Profil, das hinzugefügt werden soll
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
            // Wir geben das darin enthaltene Objekt in einer Promise zurück.
            return new Promise(function (resolve) {
                resolve(responseProfilBO);
            })
        })
    }

    /**
     * API-Call, um ein Profil zu aktualisieren und in einer Promise zurückzugeben
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
     * API-Call, um ein Profil aus dem System zu löschen und in einer Promise zurückzugeben.
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
     * API Call, um alle Lernvorlieben auszulesen und als Promise zurück zu geben.
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
     * API-Call, die eine bestimmte Lernvorliebe ausliest und in einer Promise zurückgibt.
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
     * API Call, um ein Lernvorlieben-Objekt ins System hinzuzufügen und als Promise zurückzugeben.
     *
     * @param {LernvorliebeBO} lernvorliebeBO - das zu hinzufügende Lernvorlieben-Objekt
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
     * API-Call, um ein Lernvorlieben zu aktualisieren und in einer Promise zurückzugeben
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
     * API-Call, um ein Lernvorlieben-Objekt aus dem System zu löschen und in einer Promise zurückzugeben.
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
     * API Call, um alle Lerngruppen auszulesen und als Promise zurück zu geben.
     * @public
     */
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

    /*
    * Die zu einer Konversation gehörende Lerngruppe ausgeben NUR wenn Konversation gruppenchat ist.
    */
    getLerngruppeOfKonversationID(konversationID) {
        return this.#fetchAdvanced(this.#getLerngruppeOfKonversationIDURL(konversationID))
          .then((responseJSON) => {
              let lerngruppenBO = LerngruppeBO.fromJSON(responseJSON)[0];
              return new Promise(function (resolve) {
                resolve(lerngruppenBO);
              })
          })
    }

    /*
     * API Call, um eine Lerngruppe ins System hinzuzufügen und als Promise zurückzugeben.
     * @param {LerngruppeBO} lerngruppeBO - LerngruppeBO, das hinzugefügt wird.
     * @public
     */
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

    /*
    * API-Call, um eine bestimmte Lerngruppe anhand der ID auszulesen, die in einer Promise zurückgegeben wird.
    * @param {Number} lerngruppeID der auszulesenden Lerngruppe
    * @public
    */
    getLerngruppe(lerngruppeID) {
        return this.#fetchAdvanced(this.#getLerngruppeURL(lerngruppeID)).then((responseJSON) => {
            let responseLerngruppeBO = LerngruppeBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseLerngruppeBO);
          })
        })
      }

    /*
     * API-Call um ein Lerngruppe zu aktualisieren. Wird in einer Promise zurückgegeben.
     * @param {LerngruppeBO} lerngruppeBO - ID der zu aktualsierenden Lerngruppe.
     * @public
     */
    updateLerngruppe(lerngruppeBO) {
    return this.#fetchAdvanced(this.#updateLerngruppeURL(lerngruppeBO.getID()), {
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

    /*
     * API-Call, um ein Lerngruppen-Objekt aus dem System zu löschen und in einer Promise zurückzugeben.
     * @param {Number} lerngruppeID to be deleted.
     * @public
     */
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
     * API Call, um alle Konversationen auszulesen und als Promise zurück zu geben.
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
     * API-Call, um eine Konversation hinzuzufügen.
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

   /*
   * API-Call, um eine Konversation anhand der ID auszulesen und in einer Promise zurückzugeben.
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

    /*
     * APi-Call, um eine Konversation zu aktualisieren
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
     * API-Call, um ein Konversations-Objekt aus dem System zu löschen und in einer Promise zurückzugeben.
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
     * API Call, um alle Nachrichten auszulesen und als Promise zurück zu geben.
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
     * API-Call, um eine Nachricht aus dem System zu löschen und in einer Promise zurückzugeben.
     *
     * @param {NachrichtBO} nachrichtBO - Nachricht, die gelsöcht werden soll
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

   /*
   * API-Call, um ein Nachrichten-Objekt anhand der ID auszulesen und in einer Promise zurückzugeben.
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
     * API-Call, um ein Nachrichten-Objekt zu aktualisieren und in einer Promise zurückzugeben.
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
     * API-Call, um ein Nachrichten-Objekt aus dem System zu löschen und in einer Promise zurückzugeben.
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
     * API Call, um alle Chat-Teilnahmen auszulesen und als Promise zurück zu geben.
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

    /*
     * API-Call, um ein ChatTeilnahme-Objekt hinzuzufügen und in einer Promise zurückzugeben.
     * @param {ChatTeilnahmeBO} chatteilnahmeBO to be added. The ID of the new Chatteilnahme is set by the backend
     * @public
     */
    addChatTeilnahme(chatteilnahmeBO) {
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

    /*
     * API-Call, um ein ChatTeilnahme-Objekt anhand der chatteilnahme ID auszulesen und in einer Promise zurückzugeben.
     *
     * @param {Number} chatteilnahmeID - auszulesende ChatTeilnahmeID
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

    /*
     * API-Call, um ein ChatTeilnahme-Objekt anhand der personenID und der konversationsID auszulesen und in einer Promise zurückzugeben.
     *
     * @param {Number} person_id - auszulesende PersonID
     * @param {Number} konversation_id - auszulesende KonversationID
     * @public
     */
    getChatTeilnahmeByPersonIDundKonversationID(person_id, konversation_id) {
        return this.#fetchAdvanced(this.#getChatTeilnahmeByPersonIDundKonversationIDURL(person_id, konversation_id))
            .then((responseJSON) => {
                let responseChatteilnahmeBO = ChatTeilnahmeBO.fromJSON(responseJSON)[0];
                return new Promise(function (resolve) {
                    resolve(responseChatteilnahmeBO);
                })
        })
    }

    /**
     *  API-Call, um ein ChatTeilnahme-Objektzu aktualisieren und in einer Promise zurückzugeben.
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
     * API-Call, um ein ChatTeilnahme-Objekt aus dem System zu löschen und in einer Promise zurückzugeben.
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
    /**
     * API Call, um alle Gruppen_Teilnahmen auszulesen und als Promise zurück zu geben.
     * @public
     */
    getGruppenTeilnahmen() {
        return this.#fetchAdvanced(this.#getGruppenTeilnahmenURL()).then((responseJSON) => {
            let gruppenteilnahmenBOs = GruppenTeilnahmeBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(gruppenteilnahmenBOs);
            })
        })
    }

    /*
     * API-Call, um ein GruppenTeilnahme-Objekt hinzuzufügen und in einer Promise zurückzugeben.
     * @param {GruppenTeilnahmeBO} gruppenteilnahmeBO - GruppenTeilnahme-Objekt
     * @public
     */
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

    /*
    * Auslesen der GruppenTeilnahmen anhand der ID.
    * @param {Number} gruppenteilnahmeID to be retrieved.
    * @public
    */
    getGruppenTeilnahme(gruppenteilnahmeID) {
        return this.#fetchAdvanced(this.#getGruppenTeilnahmeURL(gruppenteilnahmeID)).then((responseJSON) => {
            let responseGruppenTeilnahmeBO = GruppenTeilnahmeBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseGruppenTeilnahmeBO);
          })
        })
      }

    /*
    * Auslesen der GruppenTeilnahmen einer bestimmten Gruppe anhand der Gruppen ID.
    * @param {Number} gruppenteilnahmeID to be retrieved.
    * @public
    */
    getGruppenTeilnahmenForGruppenID(gruppenID) {
        return this.#fetchAdvanced(this.#getGruppenTeilnahmenByGruppenIDURL(gruppenID)).then((responseJSON) => {
            let gruppenteilnahmenBOs = GruppenTeilnahmeBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(gruppenteilnahmenBOs);
            })
        })
    }

    /*
    * Auslesen der GruppenTeilnahmen anhand der Personen ID und Gruppen ID.
    * @param {Number} gruppenteilnahmeID to be retrieved.
    * @public
    */
    getGruppenTeilnahmeByPersonIDundGruppenID(personID,gruppenID) {
        return this.#fetchAdvanced(this.#getGruppenTeilnahmeByPersonIDundGruppenIDURL(personID,gruppenID)).then((responseJSON) => {
            let responseGruppenTeilnahmeBO = GruppenTeilnahmeBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseGruppenTeilnahmeBO);
          })
        })
    }

    /*
    * Aktualisiert eine Gruppenteilnahme.
    * @param {GruppenTeilnahmeBO} gruppenteilnahmeBO to be added. The ID of the new groupparticipation is set by the backend.
    * @public
    */
    updateGruppenTeilnahme(gruppenteilnahmeBO) {
        return this.#fetchAdvanced(this.#updateGruppenTeilnahmeURL(gruppenteilnahmeBO.getID()), {
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

    /*
    * Löschen einer Gruppenteilnahme.
    * @param {Number} gruppenteilnahmeID to be deleted.
    * @public
    */
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
    /**
     * API Call, um alle Gruppenvorschläge auszulesen und als Promise zurück zu geben.
     * @public
     */
    getGruppenVorschlaege() {
        return this.#fetchAdvanced(this.#getGruppenVorschlaegeURL())
            .then((response) => {
                let res = GruppenVorschlagBO.fromJSON(response)
                return new Promise(function (resolve) {
                    resolve(res);
            })})
    }

    /**
     * API Call, um den Gruppenvorschlag einer Person auszulesen und als Promise zurück zu geben.
     * @param {Number} personID - to be retrieved.
     * @public
     */
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

    /**
     * API Call, um ausgehende Gruppenvorschläge einer Person auszulesen und als Promise zurück zu geben.
     * @param {Number} person_id - Personen ID der auszulesenden Person
     * @public
     */
    getAusgehendeGruppenVorschlaegeForPersonID(person_id) {
        return this.#fetchAdvanced(this.#getAusgehendeGruppenAnfragenForPersonIDURL(person_id))
            .then((response) => {
                let res = GruppenVorschlagBO.fromJSON(response)
                return new Promise(function (resolve) {
                    resolve(res);
            })})
    }

    /**
     * API Call, um eingehende Gruppenvorschläge einer Person auszulesen und als Promise zurück zu geben.
     * @param {Number} person_id - Personen ID der auszulesenden Person
     * @public
     */
    getEingehendeGruppenVorschlaegeForPersonID(person_id) {
        return this.#fetchAdvanced(this.#getEingehendeGruppenAnfragenForPersonIDURL(person_id))
            .then((response) => {
                let res = GruppenVorschlagBO.fromJSON(response)
                return new Promise(function (resolve) {
                    resolve(res);
            })})
    }

    /**
     * API Call, um eingehende Vorschläge einer Gruppen auszulesen und als Promise zurück zu geben.
     * @param {Number} gruppen_id - Personen ID der auszulesenden Person
     * @public
     */
    getEingehendeGruppenVorschlaegeForGruppenID(gruppen_id) {
        return this.#fetchAdvanced(this.#getEingehendeGruppenAnfragenForGruppenIDURL(gruppen_id))
            .then((response) => {
                let res = GruppenVorschlagBO.fromJSON(response)
                return new Promise(function (resolve) {
                    resolve(res);
            })})
    }

    getGruppenVorschlaegeForGruppenID(gruppen_id) {
        return this.#fetchAdvanced(this.#getGruppenVorschlaegeForGruppenIDURL(gruppen_id))
            .then((response) => {
                let res = GruppenVorschlagBO.fromJSON(response)
                return new Promise(function (resolve) {
                    resolve(res);
            })})
    }

    /*
    * Hinzufügen eines neuen Gruppenvorschlag-Objektes
    * @param {GruppenVorschlagBO} gruppenvorschlagBO to be added. ID des Gruppenvorschlags wird vom Backend gesetzt.
    * @public
    */
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

    /*
    * Auslesen eines Gruppenvorschlags anhand der GruppenvorschlagID
    * @param {Number} gruppenvorschlagID to be retrieved.
    * @public
    */
    getGruppenVorschlag(gruppenvorschlagID) {
        return this.#fetchAdvanced(this.#getGruppenVorschlagURL(gruppenvorschlagID)).then((responseJSON) => {
            let responseGruppenVorschlagBO = GruppenVorschlagBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseGruppenVorschlagBO);
          })
        })
    }

    /*
    * Auslesen eines Gruppenvorschlags anhand der zugehörigen personenID und gruppenID
    * @param {Number} personid to be retrieved.
    * @param {Number} gruppenID to be retrieved.
    * @public
    */
    getGruppenVorschlagByPersonIDundGruppenID(personid,gruppenID) {
        return this.#fetchAdvanced(this.#getGruppenVorschlagByPersonIDundGruppenIDURL(personid,gruppenID)).then((responseJSON) => {
            let responseGruppenVorschlagBO = GruppenVorschlagBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseGruppenVorschlagBO);
          })
        })
    }

    /*
    * Aktualisiert ein Gruppenvorschlags-Objekt
    * @param {GruppenVorschlagBO} gruppenvorschlagBO to be added. ID des Vorschlags wird vom Backend gesetzt.
    * @public
    */
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

    /*
    * Löscht einen Gruppenvorschlag.
    * @param {Number} gruppenvorschlagID to be deleted.
    * @public
    */
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
     * API Call, um alle Partnervorschläge auszulesen und als Promise zurück zu geben.
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

    /**
     * API Call, um den Gruppenvorschlag einer Person auszulesen und als Promise zurück zu geben.
     * @param {Number} person_id - to be retrieved.
     * @public
     */
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

    /**
     * API Call, um eingehende Partnervorschläge einer Person auszulesen und als Promise zurück zu geben.
     * @param {Number} person_id - to be retrieved.
     * @public
     */
    getEingehendePartnerVorschlaegeForPersonID(person_id) {
        return this.#fetchAdvanced(this.#getEingehendePartnerAnfragenForPersonIDURL(person_id))
            .then((responseJSON) => {
                let res = PartnerVorschlagBO.fromJSON(responseJSON)
                return new Promise(function (resolve) {
                    resolve(res);
            })
        })
    }

    /**
     * API Call, um ausgehende Partnervorschläge einer Person auszulesen und als Promise zurück zu geben.
     * @param {Number} person_id - to be retrieved.
     * @public
     */
    getAusgehendePartnerVorschlaegeForPersonID(person_id) {
        return this.#fetchAdvanced(this.#getAusgehendePartnerAnfragenForPersonIDURL(person_id))
            .then((responseJSON) => {
                let res = PartnerVorschlagBO.fromJSON(responseJSON)
                return new Promise(function (resolve) {
                    resolve(res);
            })
        })
    }


    /*
     * Fügt einen Partnervorschlag hinzu.
     * @param {PartnerVorschlagBO} partnervorschlagBO to be added. ID des Vorschlags wird vom Backend gesetzt.
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

    /*
     * Auslesen des Partnervorschlags anhand der ID.
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

    /*
     * Aktualisiert ein PartnerVorschlag-Objekt, welches in einer Promise zurückgegeben wird.
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

    /*
     * Löscht ein PartnerVorschlag-Objekt anhand der entsprechenden ID.
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




