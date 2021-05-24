import BusinessObject from "./BusinessObject";

/** Repräsentiert eine Lerngruppe */
export default class LerngruppeBO extends BusinessObject {
    /** Diese Klasse erstellt ein BusinessObject einer Lerngruppe. */

    constructor(aGruppenname, aProfilId, aKonversationId) {
        super();
        this.gruppenname = aGruppenname;
        this.profil_id = aProfilId;
        this.konversation_id = aKonversationId;
    }

    // Nun die jeweiligen Getter & Setter:
    /** Setzt den Gruppennamen. */
    setGruppenname(aGruppenname) {
    this.gruppenname = aGruppenname;
    }

    /** Gibt den Gruppennamen aus. */
    getGruppenname() {
        return this.gruppenname;
    }

    /** Setzt die Profil ID. */
    setProfilId(aProfilId) {
    this.profil_id = aProfilId;
    }

    /** Gibt die Profil ID aus. */
    getProfilId() {
        return this.profil_id;
    }

    /** Setzt die Konversation ID. */
    setKonversationId(aKonversationId) {
    this.konversation_id = aKonversationId;
    }

    /** Gibt den Konversation ID aus. */
    getKonversationId() {
        return this.konversation_id;
    }

    // Debugging Methoden
    /** Gibt die Lerngruppe als String aus. */
    toString() {
    let result = '';

    for (var prop in this) {
      result += prop + ': ' + this[prop] + ' ';
        }

    return result;
    }

    // JSON Methoden
    /** Gibt Array von LerngruppeBO einer gegebenen JSON-Struktur zurück. */
    static fromJSON(lerngruppe) {
        let result = [];

        if (Array.isArray(lerngruppe)) {
            lerngruppe.forEach((t) => {
                Object.setPrototypeOf(t, LerngruppeBO.prototype);
                result.push(t);
            })
        }
        else {
            // Sollte es sich um ein singuläres Objekt handeln.
            let t = lerngruppe;

            Object.setPrototypeOf(t, LerngruppeBO.prototype);
            result.push(t);
        }

        return result;
    }
}