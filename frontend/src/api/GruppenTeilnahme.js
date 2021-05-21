import BusinessObject from "./BusinessObject";


export default class GruppenTeilnahme extends BusinessObject {
    /**
       * Erstellt ein BO einer GruppenTeilnahme mit den gegebenen Parametern.
       *
       * @param person_id - Die ID der Person.
       * @param gruppen_id - Die ID der Gruppe.
       * @param ist_admin - Überprüfung des Administrator Status der Person.
     */

    constructor(person_id, gruppen_id, ist_admin) {
        super();
        this.person_id = person_id;
        this.group_id = gruppen_id;
        this.ist_admin = ist_admin;
    }

    /**
     * Liest die person_id aus.
     */
    get_person_id() {
        return this.person_id;
    }

    /**
     * Legt die person_id fest.
     */
    set_person_id(person_id=0) {
        this.person_id = person_id;
    }

    /**
     * Liest die gruppen_id aus.
     */
    get_gruppen_id() {
        return this.group_id;
    }

    /**
     * Legt die gruppen_id fest.
     */
    set_gruppen_id(gruppen_id=0) {
        this.group_id = gruppen_id;
    }

    /**
     * Gibt den Administratorenstatus aus.
     */
    get_ist_admin() {
        return this.ist_admin;
    }

    /**
     * Legt den Administratorenstatus fest.
     */
    set_ist_admin(wert=Boolean) {
        this.ist_admin = wert;
    }

    /**
     * Gibt das BO als String zurück (Für Debugging Zwecke).
     */
    static fromJSON(gruppenteilnahme) {
        let result = [];

        if (Array.isArray(gruppenteilnahme)) {
            gruppenteilnahme.forEach((g) => {
                Object.setPrototypeOf(g, GruppenTeilnahme.prototype);
                result.push(g);
            })
        }   else {
            let g = gruppenteilnahme
            Object.setPrototypeOf(g, GruppenTeilnahme.prototype);
            result.push(g);
        }

        return result;
    }
}