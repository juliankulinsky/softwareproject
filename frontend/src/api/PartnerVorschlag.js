import VorschlagBO from "./VorschlagBO";
// Stammt von der Superklasse VorschlagBO ab,
// welche seinerseits von der Superklasse BusinessObject abstammt.

/** Repräsentiert einen Partnervorschlag. */
export default class PartnerVorschlag extends VorschlagBO {

    /**
   * Diese Klasse erstellt ein BusinessObject einer PartnerVorschlag.
   *
   * @param {*} partnervorschlag_id - the ID of the partner to be matched.
   * @param {*} entscheidung_partner - the decision of the potential match.
   */

    constructor(partnervorschlag_id, entscheidung_partner) {
        super();
        this.partnervorschlag_id = partnervorschlag_id;
        this.entscheidung_partner = entscheidung_partner;
    }

    // Nun die jeweiligen Getter & Setter:
    /*
    * Setzen der Partnervorschlag ID
    */
    setPartnerVorschlagID(aPVID){
        this.person_id = aPVID;
    }

    /*
    * Auslesen der PartnerVorschlag ID
    */
    getPartnerVorschlagID() {
        return this.partnervorschlag_id;
    }

    /*
    * Setzen der Entscheidung des Partner
    */
    setEntscheidungPartner(aDecision){
        this.entscheidung_partner = aDecision;
    }

    /*
    * Auslesen der Entscheidung
    */
    getEntscheidungPartner() {
        return this.entscheidung_partner;
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
    static fromJSON(partnervorschlaege) {
        let result = [];

        if (Array.isArray(partnervorschlaege)) {
            partnervorschlaege.forEach((t) => {
                Object.setPrototypeOf(t, PartnerVorschlag.prototype);
                result.push(t);
            })
        }
        else {
            // Sollte es sich um ein singuläres Objekt handeln.
            let t = partnervorschlaege;

            Object.setPrototypeOf(t, PartnerVorschlag.prototype);
            result.push(t);
        }

        return result;
    }
}