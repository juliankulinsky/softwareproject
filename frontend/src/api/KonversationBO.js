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
}
