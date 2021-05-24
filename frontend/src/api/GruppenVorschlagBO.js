import VorschlagBO from "./VorschlagBO";
// Stammt von der Superklasse VorschlagBO ab,
// welche seinerseits von der Superklasse BusinessObject abstammt.

/** Repräsentiert einen Gruppenvorschlag. */
export default class GruppenVorschlagBO extends VorschlagBO {

    constructor(aGruppenvorschlagId, aEntscheidungGruppe) {
        super();
        this.gruppenvorschlag_id = aGruppenvorschlagId;
        this.entscheidung_gruppe = aEntscheidungGruppe;
    }

    // Nun die jeweiligen Getter & Setter:
    /** Setzt die ID des Gruppenvorschlags. */
    setGruppenvorschlagId(aGruppenvorschlagId) {
    this.gruppenvorschlag_id = aGruppenvorschlagId;
    }

    /** Gibt die ID Gruppenvorschlags aus. */
    getGruppenvorschlagId() {
        return this.gruppenvorschlag_id;
    }

    /** Setzt die Entscheidung der Gruppe in einem boolean Wert. */
    setEntscheidungGruppe(aEntscheidungGruppe) {
    this.entscheidung_gruppe = aEntscheidungGruppe;
    }

    /** Gibt den boolean Wert von der Entscheidung der Gruppe aus. */
    getEntscheidungGruppe() {
        return this.entscheidung_gruppe;
    }

    // Debugging Methoden
    /** Gibt die Entscheidung als String aus. */
    toString() {
    let result = '';

    for (var prop in this) {
      result += prop + ': ' + this[prop] + ' ';
        }

    return result;
    }

    // JSON Methoden
    /** Gibt Array von PartnerVorschlagBO einer gegebenen JSON-Struktur zurück. */
    static fromJSON(gruppenvorschlaege) {
        let result = [];

        if (Array.isArray(gruppenvorschlaege)) {
            gruppenvorschlaege.forEach((t) => {
                Object.setPrototypeOf(t, GruppenVorschlagBO.prototype);
                result.push(t);
            })
        }
        else {
            // Sollte es sich um ein singuläres Objekt handeln.
            let t = gruppenvorschlaege;

            Object.setPrototypeOf(t, GruppenVorschlagBO.prototype);
            result.push(t);
        }

        return result;
    }
}
