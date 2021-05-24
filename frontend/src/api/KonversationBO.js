import BusinessObject from "./BusinessObject";

/** Repräsentiert eine Konversation */
export default class KonversationBO extends BusinessObject {
    /** Diese Klasse erstellt ein BusinessObject einer Konversation. */

    constructor(aIstGruppenchat) {
        super();
        this.gruppenchat = aIstGruppenchat;
    }

    // Nun die jeweiligen Getter & Setter der Konversation:
    /** Setzt boolean Wert, ob eine jeweilige Konversation ein Gruppenchat ist. */
    setIstGruppenchat(aIstGruppenchat) {
        this.gruppenchat = aGruppenname;
    }

    /** Gibt boolean Wert aus, ob eine jeweilige Konversation ein Gruppenchat ist. */
    getIstGruppenchat() {
        return this.gruppenchat;
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
    static fromJSON(konversation) {
        let result = [];

        if (Array.isArray(konversation)) {
            konversation.forEach((t) => {
                Object.setPrototypeOf(t, KonversationBO.prototype);
                result.push(t);
            })
        }
        else {
            // Sollte es sich um ein singuläres Objekt handeln.
            let t = konversation;

            Object.setPrototypeOf(t, KonversationBO.prototype);
            result.push(t);
        }

        return result;
    }
}

