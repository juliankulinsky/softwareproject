import BusinessObject from './BusinessObject';

/**
 * Repräsentiert eine Nachricht
 */
export default class NachrichtBO extends BusinessObject {

  /**
   * Erstellt ein BO einer Nachricht mit gegebenen Attributen.
   *
   * @param {String} aInhalt - Der Inhalt der NachrichtBO.
   * @param {*} aAbsenderID - Die AbsenderID der NachrichtBO.
   * @param {*} aKonversationID - Die KonversationID der NachrichtBO.
   */
  constructor(aInhalt, aAbsenderID, aKonversationID) {
    super();
    this.inhalt = aInhalt;
    this.absender_id = aAbsenderID;
    this.konversation_id = aKonversationID;
    //Fremdschlüsselbeziehung zur Konversation/Absender der Person
  }

  /**
   * Setzt den Inhalt.
   *
   * @param {String} aInhalt - Der Inhalt der NachrichtBO.
   */
  setInhalt(aInhalt) {
    this.inhalt = aInhalt;
  }

  /**
   * Gibt den Inhalt aus.
   */
  getInhalt() {
    return this.inhalt;
  }

  /**
   * Setzt die AbsenderID.
   *
   * @param {*} aAbsenderID - Die AbsenderID der NachrichtBO.
   */
  setAbsenderID(aAbsenderID) {
    this.absender_id = aAbsenderID;
  }

  /**
   * Gibt die AbsenderID aus.
   */
  getAbsenderID() {
    return this.absender;
  }

    /**
   * Setzt die KonversationID.
   *
   * @param {String} aKonversationID - Die KonversationID der NachrichtBO.
   */
  setKonversationID(aKonversationID) {
    this.konversation_id = aKonversationID;
  }

  /**
   * Gibt die KonversationID aus.
   */
  getKonversationID() {
    return this.konversation_id;
  }

  /**
   * Gibt das BO als String aus. Für Debugging-Zwecke.
   */
  static fromJSON(nachrichten) {
    let result = [];

    if (Array.isArray(nachrichten)) {
      nachrichten.forEach((p) => {
        Object.setPrototypeOf(p, NachrichtBO.prototype);
        result.push(p);
      })
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let p = nachrichten;
      Object.setPrototypeOf(p, NachrichtBO.prototype);
      result.push(p);
    }

    return result;
  }
}

