from server.bo.GruppenVorschlag import GruppenVorschlag
from server.db.Mapper import Mapper


class GruppenVorschlagMapper (Mapper):
    """

    """
    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller GruppenVorschlag-Objekte aus der Datenbank

        :return:
        """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * from gruppen_vorschlaege")
        tuples = cursor.fetchall()

        for (id, erstellungszeitpunkt, person_id, gruppenvorschlag_id, aehnlichkeit, entscheidung_person,
             entscheidung_gruppe) in tuples:
            gruppen_vorschlag = GruppenVorschlag()
            gruppen_vorschlag.set_id(id)
            gruppen_vorschlag.set_erstellungszeitpunkt(erstellungszeitpunkt)
            gruppen_vorschlag.set_person_id(person_id)
            gruppen_vorschlag.set_gruppenvorschlag_id(gruppenvorschlag_id)
            gruppen_vorschlag.set_aehnlichkeit(aehnlichkeit)
            gruppen_vorschlag.set_entscheidung_person(entscheidung_person)
            gruppen_vorschlag.set_entscheidung_gruppe(entscheidung_gruppe)
            result.append(gruppen_vorschlag)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_key(self, key: int):
        """

        :param key:
        :return:
        """
        result = None
        cursor = self._cnx.cursor()
        command = "SELECT id, erstellungszeitpunkt, person_id, gruppenvorschlag_id, aehnlichkeit, entscheidung_person," \
                  "entscheidung_gruppe FROM gruppen_vorschlaege WHERE id={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, erstellungszeitpunkt, person_id, gruppenvorschlag_id, aehnlichkeit, entscheidung_person,
             entscheidung_gruppe) = tuples[0]
            gruppen_vorschlag = GruppenVorschlag()
            gruppen_vorschlag.set_id(id)
            gruppen_vorschlag.set_erstellungszeitpunkt(erstellungszeitpunkt)
            gruppen_vorschlag.set_person_id(person_id)
            gruppen_vorschlag.set_gruppenvorschlag_id(gruppenvorschlag_id)
            gruppen_vorschlag.set_aehnlichkeit(aehnlichkeit)
            gruppen_vorschlag.set_entscheidung_person(entscheidung_person)
            gruppen_vorschlag.set_entscheidung_gruppe(entscheidung_gruppe)
            result = gruppen_vorschlag
        except IndexError:
            """"""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, gruppen_vorschlag: GruppenVorschlag):
        """

        :param gruppen_vorschlag:
        :return:
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM gruppen_vorschlaege")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            gruppen_vorschlag.set_id(maxid[0]+1)

        command = "INSERT INTO gruppen_vorschlaege (id, erstellungszeitpunkt, person_id, gruppenvorschlag_id, " \
                  "aehnlichkeit, entscheidung_person, entscheidung_gruppe) " \
                  "VALUES (%s,%s,%s,%s,%s,%s,%s)"
        data = (
            gruppen_vorschlag.get_id(),
            gruppen_vorschlag.get_erstellungszeitpunkt(),
            gruppen_vorschlag.get_person_id(),
            gruppen_vorschlag.get_gruppenvorschlag_id(),
            gruppen_vorschlag.get_aehnlichkeit(),
            gruppen_vorschlag.get_entscheidung_person(),
            gruppen_vorschlag.get_entscheidung_gruppe()
        )
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return gruppen_vorschlag

    def update(self, gruppen_vorschlag: GruppenVorschlag):
        """

        :param gruppen_vorschlag:
        :return:
        """
        cursor = self._cnx.cursor()

        command = "UPDATE gruppen_vorschlaege SET person_id=%s, gruppenvorschlag_id=%s, " \
                  "aehnlichkeit=%s, entscheidung_person=%s, entscheidung_gruppe=%s WHERE id=%s"
        data = (
            gruppen_vorschlag.get_person_id(),
            gruppen_vorschlag.get_gruppenvorschlag_id(),
            gruppen_vorschlag.get_aehnlichkeit(),
            gruppen_vorschlag.get_entscheidung_person(),
            gruppen_vorschlag.get_entscheidung_gruppe(),
            gruppen_vorschlag.get_id()
        )
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, gruppen_vorschlag: GruppenVorschlag):
        """

        :param gruppen_vorschlag:
        :return:
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM gruppen_vorschlaege WHERE id={}".format(gruppen_vorschlag.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()


"""Testbereich, ob die Klasse funktioniert"""

if (__name__ == "__main__"):
    with GruppenVorschlagMapper() as mapper:
        print("--TESTING FIND_ALL")
        result = mapper.find_all()
        for p in result:
            print(p)
        print("--BEENDET")

        print("--TESTING DELETE")
        weg = mapper.find_by_key(1)
        mapper.delete(weg)

        result = mapper.find_all()
        for p in result:
            print(p)
        print("--BEENDET")

        print("--TESTING INSERT")
        neu = GruppenVorschlag()
        neu.set_person_id(4)
        neu.set_gruppenvorschlag_id(3)
        neu.set_aehnlichkeit(24)
        mapper.insert(neu)

        result = mapper.find_all()
        for p in result:
            print(p)
        print("--BEENDET")

        print("--TESTING UPDATE")
        aktualisiert = mapper.find_by_key(2)
        aktualisiert.set_aehnlichkeit(200)
        mapper.update(aktualisiert)

        result = mapper.find_all()
        for p in result:
            print(p)
        print("--BEENDET")
