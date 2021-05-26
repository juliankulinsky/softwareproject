import BusinessObject from "./BusinessObject";

/** Repräsentiert eine Lerngruppe */
export default class VorschlagBO extends BusinessObject {
    /** Diese Super-Klasse erstellt ein BusinessObject eines Vorschlags
     * und dient als Basis für die Klassen Partnervorschlag und Gruppenvorschlag. */

    constructor(aPersonId, aAehnlichkeit, aEntscheidungPerson) {
        super();
        this.person_id = aPersonId;
        this.aehnlichkeit = aAehnlichkeit;
        this.entscheidung_person = aEntscheidungPerson;
    }

    // Nun die jeweiligen Getter & Setter:
    /** Setzt die ID der Person. */
    setPersonId(aPersonId) {
    this.person_id = aPersonId;
    }

    /** Gibt die ID der Person aus. */
    getPersonId() {
        return this.person_id;
    }

    /** Legt den Wert der Aehnlichkeit fest. */
    setAehnlichkeit(aAehnlichkeit) {
    this.aehnlichkeit = aAehnlichkeit;
    }

    /** Gibt den Wert der Aehnlichkeit aus. */
    getAehnlichkeit() {
        return this.aehnlichkeit;
    }

    /** Setzt die Entscheidung der Person in einem boolean Wert. */
    setEntscheidungPerson(aEntscheidungPerson) {
    this.entscheidung_person = aEntscheidungPerson;
    }

    /** Gibt den boolean Wert von der Entscheidung der Person aus. */
    getEntscheidungPerson() {
        return this.entscheidung_person;
    }

    // Debugging Methode
    /** Gibt die Entscheidung als String aus. */
    toString() {
    let result = '';

    for (var prop in this) {
      result += prop + ': ' + this[prop] + ' ';
        }

    return result;
    }

    // JSON Methode
    /** Gibt Array von VorschlagBO einer gegebenen JSON-Struktur zurück. */
    static fromJSON(vorschlag) {
        let result = [];

        if (Array.isArray(vorschlag)) {
            vorschlag.forEach((t) => {
                Object.setPrototypeOf(t, VorschlagBO.prototype);
                result.push(t);
            })
        }
        else {
            // Sollte es sich um ein singuläres Objekt handeln.
            let t = vorschlag;

            Object.setPrototypeOf(t, Vorschlag.prototype);
            result.push(t);
        }

        return result;
    }
}