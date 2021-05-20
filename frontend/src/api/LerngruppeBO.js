import BusinessObject from "./BusinessObject";

/** Repräsentiert eine Person */
export default class LerngruppeBO extends BusinessObject{
    /** Diese Klasse erstellt ein BusinessObject einer Lerngruppe. */

    constructor() {
        super();
        this.gruppenname = aGruppenname;
        this.profil_id = aProfilId;
        this.konversation_id = aKonversationId;
    }
}

// Brauchen wir hier überhaupt Getter & Setter?