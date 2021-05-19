/**
 * Base class for all BusinessObjects, which has an ID field by default.
 */
export default class BusinessObject {

  constructor() {
    this.id = 0;
  }

  /**
    Setzt ID des BO.
   */
  setID(aId) {
    this.id = aId;
  }

  /**
   *    Gibt ID des BO zurück.
   */
  getID() {
    return this.id;
  }

  /**
   * Gibt das BO als String aus. Für Debugging-Zwecke.
   */
  toString() {
    let result = '';
    for (var prop in this) {
      result += prop + ': ' + this[prop] + ' ';
    }
    return result;
  }
}