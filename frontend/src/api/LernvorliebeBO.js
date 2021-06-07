import BusinessObject from "./BusinessObject";


export default class LernvorliebeBO extends BusinessObject {
    /**
       * Erstellt ein BO eines Lernprofiles mit den gegebenen Lernvorlieben.
       *
       * @param lerntyp - Der lerntyp des Profiles.
       * @param frequenz - Die gewünschte Lernfrequenz der Person.
       * @param extrovertiertheit - Die Charaktereigenschaften der Person.
       * @param remote_praesenz - Der gewünschte Lernort.
       * @param vorkenntnisse - Die Vorkenntnisse der Person.
       * @param lerninteressen - Die Lerninteressen der Person.
     */

    constructor(lerntyp, frequenz, extrovertiertheit, remote_praesenz, vorkenntnisse, lerninteressen) {
        super();
        this.lerntyp = lerntyp;
        this.frequenz = frequenz;
        this.extrovertierteit= extrovertiertheit;
        this.remote_praesenz = remote_praesenz;
        this.vorkenntnisse = vorkenntnisse;
        this.lerninteressen = lerninteressen;
    }

    /**
     * Gibt den lerntyp aus.
     */
    get_lerntyp() {
        return this.lerntyp;
    }

    /**
     * Legt den lerntyp fest.
     */
    set_lerntyp(wert=0) {
        this.lerntyp = wert;
    }

    /**
     * Gibt die Lernfrequenz aus.
     */
    get_frequenz() {
        return this.frequenz;
    }

    /**
     * Legt die Lernfrequenz fest.
     */
    set_frequenz(wert=0) {
        this.frequenz = wert;
    }

    /**
     * Gibt die Extrovertiertheit aus.
     */
    get_extrovertiertheit() {
        return this.extrovertierteit;
    }

    /**
     * Legt die Extrovertiertheit fest.
     */
    set_extrovertiertheit(wert=0) {
        this.extrovertierteit = wert;
    }

    /**
     * Gibt den gewünschten Lernort aus.
     */
    get_remote_praesenz() {
        return this.remote_praesenz;
    }

    /**
     * Legt den gewünschten Lernort fest.
     */
    set_remote_praesenz(wert=0) {
        this.remote_praesenz = wert;
    }

    /**
     * Gibt die Vorkenntnisse aus.
     */
    get_vorkenntnisse() {
        return this.vorkenntnisse;
    }

    /**
     * Legt die Vorkenntnisse fest.
     */
    set_vorkenntnisse(liste="") {
        this.vorkenntnisse = liste;
    }

    /**
     * Gibt die Lerninteressen aus.
     */
    get_lerninteressen() {
        return this.lerninteressen;
    }

    /**
     * Legt die Lerninteressen fest.
     */
    set_lerninteressen(liste="") {
        this.lerninteressen = liste;
    }

    /**
     * Gibt das BO als String zurück (Für Debugging Zwecke).
     */
    static fromJSON(lernvorliebe) {
        let result = [];

        if (Array.isArray(lernvorliebe)) {
            lernvorliebe.forEach((l) => {
                Object.setPrototypeOf(l, LernvorliebeBO.prototype);
                result.push(l);
            })
        }   else {
            let l = lernvorliebe
            Object.setPrototypeOf(l, LernvorliebeBO.prototype);
            result.push(l);
        }

        return result;
    }
}