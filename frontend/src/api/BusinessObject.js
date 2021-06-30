/**
 * Basisklasse für alle Business Objects mit ID und Erstellungszeitpunkt
 */
export default class BusinessObject {

  constructor(id=0,erstellungszeitpunkt=new Date()) {
    this.id = id;
    this.erstellungszeitpunkt = erstellungszeitpunkt
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
    Setzt Erstellungszeitpunkt des BO.
   */
  setErstellungszeitpunkt(aErstellungszeitpunkt) {
    this.id = aErstellungszeitpunkt;
  }

  /**
   *    Gibt Erstellungszeitpunkt des BO zurück.
   */
  getErstellungszeitpunkt() {
    return this.erstellungszeitpunkt;
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