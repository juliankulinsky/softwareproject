import BusinessObject from './BusinessObject';

/**
 * Represents a customer of the bank.
 */
export default class PersonBO extends BusinessObject {

  /**
   * Constructs a CustomerBO object with a given firstname and lastname.
   *
   * @param {String} aVorname - Der Vorname des PersonBO.
   * @param {String} aNachname - Der Nachname des PersonBO.
   */
  constructor(aVorname, aNachname) {
    super();
    this.vorname = aVorname;
    this.nachname = aNachname;
  }

  /**
   * Sets a new firstname.
   *
   * @param {String} aVorname - the new firstname of this CustomerBO.
   */
  setVorname(aVorname) {
    this.first_name = aVorname;
  }

  /**
   * Gets the firstname.
   */
  getVorname() {
    return this.vorname;
  }

  /**
   * Sets a new lastname.
   *
   * @param {*} aNachname - the new lastname of this CustomerBO.
   */
  setNachname(aNachname) {
    this.last_name = aNachname;
  }

  /**
   * Gets the lastname.
   */
  getNachname() {
    return this.nachname;
  }

  /**
   * Returns an Array of CustomerBOs from a given JSON structure.
   */
  static fromJSON(personen) {
    let result = [];

    if (Array.isArray(personen)) {
      personen.forEach((p) => {
        Object.setPrototypeOf(p, PersonBO.prototype);
        result.push(p);
      })
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let p = person;
      Object.setPrototypeOf(p, PersonBO.prototype);
      result.push(p);
    }

    return result;
  }
}