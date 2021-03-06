import BusinessObject from "./BusinessObject";

export default class ChatTeilnahmeBO extends BusinessObject {

    /**
   * Constructs a new ChatTeilnahme object.
   *
   * @param {*} person_id - the ID of the person in the chat.
   * @param {*} konversation_id - the ID of the connected conversation.
   */

    constructor(person_id, konversation_id) {
        super();
        this.person_id = person_id;
        this.konversation_id = konversation_id;
    }

    /*
    * Setzen der Person ID
    * @param {*} aPersonID -
    */
    setPersonID(aPersonID){
        this.person_id = aPersonID;
    }

    /*
    * Auslesen der Person ID
    */
    getPersonID() {
        return this.person_id;
    }

    /*
    * Setzen der Konversation ID
    */
    setKonversationID(aKonversationID){
        this.person_id = aKonversationID;
    }

    /*
    * Auslesen der Konversation ID
    */
    getKonversationID() {
        return this.konversation_id;
    }

    /**
   * Gibt die Teilnahme als String aus. Für Debugging-Zwecke.
   */
    toString() {
    let result = '';
    for (var prop in this) {
      result += prop + ': ' + this[prop] + ' ';
    }
    return result;
  }

  /**
   *Gibt Array von PartnerVorschlagBO einer gegebenen JSON-Struktur zurück.
   */
  static fromJSON(Chatteilnahme) {
    let result = [];

    if (Array.isArray(Chatteilnahme)) {
      Chatteilnahme.forEach((t) => {
        Object.setPrototypeOf(t, ChatTeilnahmeBO.prototype);
        result.push(t);
      })
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let t = Chatteilnahme
      Object.setPrototypeOf(t, ChatTeilnahmeBO.prototype);
      result.push(t);
    }

    return result;
  }

}