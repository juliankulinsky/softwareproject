import BusinessObject from './BusinessObject';

/**
 * Repräsentiert ein Profil
 */
export default class ProfilBO extends BusinessObject {

  /**
   * Erstellt ein BO eines Profils mit gegebenen Attributen.
   *
   * @param {*} aLernvorliebenID - Die Lernvorlieben ID der ProfilBO .
   * @param {*} aBeschreibung - Die Beschreibung der ProfilBO .
   */
  constructor(aLernvorliebenID, aBeschreibung="") {
    super();
    this.lernvorlieben_id = aLernvorliebenID;
    this.beschreibung = aBeschreibung
    //Fremdschlüsselbeziehung zur Lernvorliebe der Person
  }

  /**
   * Setzt die LernvorliebenID.
   *
   * @param {String} aLervorliebenID - Die LernvorliebenID der ProfilBO.
   */
  setLernvorliebenID(aLernvorliebenID) {
    this.lernvorlieben_id = aLernvorliebenID;
  }

  /**
   * Gibt die Lerngruppen ID aus.
   */
  getLernvorliebeID() {
    return this.lernvorlieben_id;
  }

  /**
   * Setzt die Beschreibung.
   *
   * @param {String} aBeschreibung - Die Beschreibung der ProfilBO.
   */
  setBeschreibung(aBeschreibung) {
    this.beschreibung = aBeschreibung;
  }

  /**
   * Gibt die beschreibung aus.
   */
  getBeschreibung() {
    return this.beschreibung;
  }

  /**
   * Gibt das BO als String aus. Für Debugging-Zwecke.
   */
  static fromJSON(profile) {
    let result = [];

    if (Array.isArray(profile)) {
      profile.forEach((p) => {
        Object.setPrototypeOf(p, ProfilBO.prototype);
        result.push(p);
      })
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let p = profile;
      Object.setPrototypeOf(p, ProfilBO.prototype);
      result.push(p);
    }

    return result;
  }
}