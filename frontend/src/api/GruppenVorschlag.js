import VorschlagBO from "./VorschlagBO";
// Stammt von der Superklasse VorschlagBO ab,
// welche seinerseits von der Superklasse BusinessObject abstammt.

/** Repräsentiert einen Gruppenvorschlag. */
export default class GruppenVorschlag extends VorschlagBO{

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
}
