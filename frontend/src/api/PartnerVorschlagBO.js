import VorschlagBO from "./VorschlagBO";
// Stammt von der Superklasse VorschlagBO ab,
// welche seinerseits von der Superklasse BusinessObject abstammt.

/** Repräsentiert einen Partnervorschlag. */
export default class PartnerVorschlagBO extends VorschlagBO {

    /**
   * Diese Klasse erstellt ein BusinessObject einer PartnerVorschlagBO.
   *
   * @param {*} partner_id - the ID of the partner to be matched.
   * @param {*} entscheidung_partner - the decision of the potential match.
   */

    constructor(partner_id, entscheidung_partner) {
        super();
        this.partner_id = partner_id;
        this.entscheidung_partner = entscheidung_partner;
    }

    // Nun die jeweiligen Getter & Setter:
    /*
    * Setzen der Partnervorschlag ID
    */
    setPartnerID(aPartnerID){
        this.partner_id = aPartnerID;
    }

    /*
    * Auslesen der PartnerVorschlagBO ID
    */
    getPartnerID() {
        return this.partner_id;
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
                Object.setPrototypeOf(t, PartnerVorschlagBO.prototype);
                result.push(t);
            })
        }
        else if (partnervorschlaege == null){
            result = null
        } else
        {
            // Sollte es sich um ein singuläres Objekt handeln.
            let t = partnervorschlaege;

            Object.setPrototypeOf(t, PartnerVorschlagBO.prototype);
            result.push(t);
        }

        return result;
    }
}