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
   * @param {*} aAlter - Das Alter des PersonBO.
   * @param {String} aWohnort - Der Wohnort des PersonBO.
   * @param {String} aStudiengang - Der Studiengang des PersonBO.
   * @param {*} aSemester -Das Semester des PersonBO.
   * @param {*} aProfilId - Die Profil ID des PersonBO.
   */
  constructor(aVorname, aNachname) {
    super();
    this.vorname = aVorname;
    this.nachname = aNachname;
    this.alter = aAlter;
    this.wohnort = aWohnort;
    this.studiengang = aStudiengang;
    this.semester = aSemester;
    this.profil_id = aProfilId;
    //Fremdschlüsselbeziehung zum Profil der Person
  }

  /**
   * Setzt den Vornamen.
   *
   * @param {String} aVorname - Der Vorname des PersonBO.
   */
  setVorname(aVorname) {
    this.first_name = aVorname;
  }

  /**
   * Gibt den Vorname aus.
   */
  getVorname() {
    return this.vorname;
  }

  /**
   * Setzt den Nachnamen.
   *
   * @param {*} aNachname - Der Nachname des PersonBO.
   */
  setNachname(aNachname) {
    this.last_name = aNachname;
  }

  /**
   * Gibt den Nachnamen aus.
   */
  getNachname() {
    return this.nachname;
  }

    /**
   * Setzt das Alter.
   *
   * @param {String} aAlter - Das Alter des PersonBO.
   */
  setAlter(aAlter) {
    this.alter = aAlter;
  }

  /**
   * Gets the alter.
   */
  getAlter() {
    return this.alter;
  }

    /**
   * Setzt den Wohnort.
   *
   * @param {String} aVorname - Der Wohnort des PersonBO.
   */
  setWohnort(aWohnort) {
    this.wohnort = aWohnort;
  }

  /**
   * Gibt den Wohnort aus.
   */
  getWohnort() {
    return this.wohnort;
  }

   /**
   * Setzt den Studiengang.
   *
   * @param {String} aStudiengang - Der Studiengang des PersonBO.
   */
  setStudiengang(aStudiengang) {
    this.studiengang = aStudiengang;
  }

  /**
   * Gibt den Studiengang aus.
   */
  getStudiengang() {
    return this.studiengang;
  }

  /**
   * Setzt das Semester.
   *
   * @param {String} aSemester - Das Semester des PersonBO.
   */
  setSemester(aSemester) {
    this.semester = aSemester;
  }

  /**
   * Gibt das Semester aus.
   */
  getSemester() {
    return this.semester;
  }

  /**
   * Setzt die Profil ID
   *
   * @param {String} aProfilId - Die Profil ID des PersonBO.
   */
  setProfilId(aProfilId) {
    this.profil_id = aProfilId;
  }

  /**
   * Gibt die Profil ID aus.
   */
  getProfilId() {
    return this.profil_id;
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