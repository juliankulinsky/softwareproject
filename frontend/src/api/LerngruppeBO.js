import BusinessObject from "./BusinessObject";

/** Repräsentiert eine Lerngruppe */
export default class LerngruppeBO extends BusinessObject {
    /** Diese Klasse erstellt ein BusinessObject einer Lerngruppe. */

    /**
     *
     * @param {String} aGruppenname
     * @param {*} aProfilId
     * @param {*} aKonversationId
     */
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

    // Debugging Methode
    /** Gibt die Lerngruppe als String aus. */
    toString() {
    let result = '';

    for (var prop in this) {
      result += prop + ': ' + this[prop] + ' ';
        }

    return result;
    }

    // JSON Methode
    /** Gibt Array von LerngruppeBO einer gegebenen JSON-Struktur zurück. */
    static fromJSON(lerngruppen) {
        let result = [];
        if (Array.isArray(lerngruppen)) {
            lerngruppen.forEach((t) => {
                Object.setPrototypeOf(t, LerngruppeBO.prototype);
                result.push(t);
            })
        } else {
            // Sollte es sich um ein singuläres Objekt handeln.
            let t = lerngruppen;

            Object.setPrototypeOf(t, LerngruppeBO.prototype);
            result.push(t);
        }

        return result;
    }
}