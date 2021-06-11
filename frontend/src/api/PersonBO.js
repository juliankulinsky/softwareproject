import BusinessObject from './BusinessObject';

/**
 * Repräsentiert eine Person
 */
export default class PersonBO extends BusinessObject {

  /**
   * Erstellt ein BO einer Person mit gegebenen Attributen.
   *
   * @param {String} aName - Der Name des PersonBO.
   * @param {String} aEmail - Der Email des PersonBO.
   * @param {String} aGoogle_user_id - Die Google-User-ID des PersonBO
   * @param {*} aAlter - Das Alter des PersonBO.
   * @param {String} aWohnort - Der Wohnort des PersonBO.
   * @param {String} aStudiengang - Der Studiengang des PersonBO.
   * @param {*} aSemester -Das Semester des PersonBO.
   * @param {*} aProfilId - Die Profil ID des PersonBO.
   */
  constructor(aName, aEmail, aGoogle_user_id, aAlter, aWohnort, aStudiengang, aSemester, aProfilId) {
    super();
    this.name = aName;
    this.email = aEmail;
    this.google_user_id = aGoogle_user_id;
    this.alter = aAlter;
    this.wohnort = aWohnort;
    this.studiengang = aStudiengang;
    this.semester = aSemester;
    this.profil_id = aProfilId;
    //Fremdschlüsselbeziehung zum Profil der Person
  }

  /**
   * Setzt den Namen.
   *
   * @param {String} aName - Der Name des PersonBO.
   */
  setName(aName) {
    this.name = aName;
  }

  /**
   * Gibt den Name aus.
   */
  getName() {
    return this.name;
  }

  /**
   * Setzt die Email.
   *
   * @param {*} aEmail - Die Email des PersonBO.
   */
  setEmail(aEmail) {
    this.email = aEmail;
  }

  /**
   * Gibt die Email aus.
   */
  getEmail() {
    return this.email;
  }

  /**
   * Setzt die Google-User-ID.
   *
   * @param {*} aGoogleUserID - Die Google-User-ID des PersonBO.
   */
  setGoogleUserID(aGoogleUserID) {
    this.google_user_id = aGoogleUserID;
  }

  /**
   * Gibt die GoogleUserID aus.
   */
  getGoogleUserID() {
    return this.google_user_id;
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
   * Gibt das BO als String aus. Für Debugging-Zwecke.
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
      let p = personen;
      Object.setPrototypeOf(p, PersonBO.prototype);
      result.push(p);
    }

    return result;
  }
}