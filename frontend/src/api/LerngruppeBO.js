import BusinessObject from "./BusinessObject";

/** Repräsentiert eine Person */
export default class LerngruppeBO extends BusinessObject{
    /** Diese Klasse erstellt ein BusinessObject einer Lerngruppe. */

    constructor(aGruppenname, aProfilId, aKonversationId) {
        super();
        this.gruppenname = aGruppenname;
        this.profil_id = aProfilId;
        this.konversation_id = aKonversationId;
    }

    // Nun die jeweiligen Getter & Setter der Lerngruppe:
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
}