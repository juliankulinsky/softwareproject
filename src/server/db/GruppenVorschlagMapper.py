from server.bo.GruppenVorschlag import GruppenVorschlag
from server.db.Mapper import Mapper
from datetime import datetime


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

        for (id, erstellungszeitpunkt, person_id, gruppen_id, aehnlichkeit, matchpoints, entscheidung_person,
             entscheidung_gruppe) in tuples:
            gruppen_vorschlag = GruppenVorschlag()
            gruppen_vorschlag.set_id(id)
            gruppen_vorschlag.set_erstellungszeitpunkt(erstellungszeitpunkt)
            gruppen_vorschlag.set_person_id(person_id)
            gruppen_vorschlag.set_gruppen_id(gruppen_id)
            gruppen_vorschlag.set_aehnlichkeit(aehnlichkeit)
            gruppen_vorschlag.set_matchpoints(matchpoints)
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
        command = "SELECT id, erstellungszeitpunkt, person_id, gruppen_id, aehnlichkeit, matchpoints," \
                  " entscheidung_person, entscheidung_gruppe FROM gruppen_vorschlaege WHERE id={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, erstellungszeitpunkt, person_id, gruppen_id, aehnlichkeit, matchpoints, entscheidung_person,
             entscheidung_gruppe) = tuples[0]
            gruppen_vorschlag = GruppenVorschlag()
            gruppen_vorschlag.set_id(id)
            gruppen_vorschlag.set_erstellungszeitpunkt(erstellungszeitpunkt)
            gruppen_vorschlag.set_person_id(person_id)
            gruppen_vorschlag.set_gruppen_id(gruppen_id)
            gruppen_vorschlag.set_aehnlichkeit(aehnlichkeit)
            gruppen_vorschlag.set_matchpoints(matchpoints)
            gruppen_vorschlag.set_entscheidung_person(entscheidung_person)
            gruppen_vorschlag.set_entscheidung_gruppe(entscheidung_gruppe)
            result = gruppen_vorschlag
        except IndexError:
            """"""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_person_id_und_gruppen_id(self, person_key: int, gruppen_key: int):
        """

        :param key:
        :return:
        """
        result = None
        cursor = self._cnx.cursor()
        command = "SELECT * FROM gruppen_vorschlaege WHERE person_id={} AND gruppen_id={}".format(person_key,gruppen_key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, erstellungszeitpunkt, person_id, gruppen_id, aehnlichkeit, matchpoints, entscheidung_person,
             entscheidung_gruppe) = tuples[0]
            gruppen_vorschlag = GruppenVorschlag()
            gruppen_vorschlag.set_id(id)
            gruppen_vorschlag.set_erstellungszeitpunkt(erstellungszeitpunkt)
            gruppen_vorschlag.set_person_id(person_id)
            gruppen_vorschlag.set_gruppen_id(gruppen_id)
            gruppen_vorschlag.set_aehnlichkeit(aehnlichkeit)
            gruppen_vorschlag.set_matchpoints(matchpoints)
            gruppen_vorschlag.set_entscheidung_person(entscheidung_person)
            gruppen_vorschlag.set_entscheidung_gruppe(entscheidung_gruppe)
            result = gruppen_vorschlag
        except IndexError:
            """"""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_eingehende_by_person_id(self, person_key):
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM gruppen_vorschlaege WHERE " \
                  "(person_id={} AND entscheidung_person=FALSE AND entscheidung_gruppe=TRUE AND matchpoints=1) " \
                  .format(person_key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, erstellungszeitpunkt, person_id, gruppen_id, aehnlichkeit, matchpoints, entscheidung_person,
             entscheidung_gruppe) in tuples:
            gruppen_vorschlag = GruppenVorschlag()
            gruppen_vorschlag.set_id(id)
            gruppen_vorschlag.set_erstellungszeitpunkt(erstellungszeitpunkt)
            gruppen_vorschlag.set_person_id(person_id)
            gruppen_vorschlag.set_gruppen_id(gruppen_id)
            gruppen_vorschlag.set_aehnlichkeit(aehnlichkeit)
            gruppen_vorschlag.set_matchpoints(matchpoints)
            gruppen_vorschlag.set_entscheidung_person(entscheidung_person)
            gruppen_vorschlag.set_entscheidung_gruppe(entscheidung_gruppe)
            result.append(gruppen_vorschlag)

        self._cnx.commit()
        cursor.close()

        return result

    def find_ausgehende_by_person_id(self, person_key):
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM gruppen_vorschlaege WHERE " \
                  "(person_id={} AND entscheidung_person=TRUE AND entscheidung_gruppe=FALSE AND matchpoints=1) " \
                  .format(person_key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, erstellungszeitpunkt, person_id, gruppen_id, aehnlichkeit, matchpoints, entscheidung_person,
             entscheidung_gruppe) in tuples:
            gruppen_vorschlag = GruppenVorschlag()
            gruppen_vorschlag.set_id(id)
            gruppen_vorschlag.set_erstellungszeitpunkt(erstellungszeitpunkt)
            gruppen_vorschlag.set_person_id(person_id)
            gruppen_vorschlag.set_gruppen_id(gruppen_id)
            gruppen_vorschlag.set_aehnlichkeit(aehnlichkeit)
            gruppen_vorschlag.set_matchpoints(matchpoints)
            gruppen_vorschlag.set_entscheidung_person(entscheidung_person)
            gruppen_vorschlag.set_entscheidung_gruppe(entscheidung_gruppe)
            result.append(gruppen_vorschlag)

        self._cnx.commit()
        cursor.close()

        return result

    def find_eingehende_by_gruppen_id(self, gruppen_key):
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM gruppen_vorschlaege WHERE " \
                  "(gruppen_id={} AND entscheidung_person=TRUE AND entscheidung_gruppe=FALSE AND matchpoints=1) " \
                  .format(gruppen_key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, erstellungszeitpunkt, person_id, gruppen_id, aehnlichkeit, matchpoints, entscheidung_person,
             entscheidung_gruppe) in tuples:
            gruppen_vorschlag = GruppenVorschlag()
            gruppen_vorschlag.set_id(id)
            gruppen_vorschlag.set_erstellungszeitpunkt(erstellungszeitpunkt)
            gruppen_vorschlag.set_person_id(person_id)
            gruppen_vorschlag.set_gruppen_id(gruppen_id)
            gruppen_vorschlag.set_aehnlichkeit(aehnlichkeit)
            gruppen_vorschlag.set_matchpoints(matchpoints)
            gruppen_vorschlag.set_entscheidung_person(entscheidung_person)
            gruppen_vorschlag.set_entscheidung_gruppe(entscheidung_gruppe)
            result.append(gruppen_vorschlag)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_gruppen_id(self, gruppen_key):
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM gruppen_vorschlaege WHERE gruppen_id={} " \
                  .format(gruppen_key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, erstellungszeitpunkt, person_id, gruppen_id, aehnlichkeit, matchpoints, entscheidung_person,
             entscheidung_gruppe) in tuples:
            gruppen_vorschlag = GruppenVorschlag()
            gruppen_vorschlag.set_id(id)
            gruppen_vorschlag.set_erstellungszeitpunkt(erstellungszeitpunkt)
            gruppen_vorschlag.set_person_id(person_id)
            gruppen_vorschlag.set_gruppen_id(gruppen_id)
            gruppen_vorschlag.set_aehnlichkeit(aehnlichkeit)
            gruppen_vorschlag.set_matchpoints(matchpoints)
            gruppen_vorschlag.set_entscheidung_person(entscheidung_person)
            gruppen_vorschlag.set_entscheidung_gruppe(entscheidung_gruppe)
            result.append(gruppen_vorschlag)

        self._cnx.commit()
        cursor.close()

        return result

    def find_best_for_person_id(self, person_id: int):
        result = None
        cursor = self._cnx.cursor()
        command = "SELECT * FROM gruppen_vorschlaege WHERE person_id={} AND entscheidung_person=FALSE " \
                  "ORDER BY aehnlichkeit DESC ".format(person_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, erstellungszeitpunkt, person_id, gruppen_id, aehnlichkeit, matchpoints, entscheidung_person,
             entscheidung_gruppe) = tuples[0]
            gruppen_vorschlag = GruppenVorschlag()
            gruppen_vorschlag.set_id(id)
            gruppen_vorschlag.set_erstellungszeitpunkt(erstellungszeitpunkt)
            gruppen_vorschlag.set_person_id(person_id)
            gruppen_vorschlag.set_gruppen_id(gruppen_id)
            gruppen_vorschlag.set_aehnlichkeit(aehnlichkeit)
            gruppen_vorschlag.set_matchpoints(matchpoints)
            gruppen_vorschlag.set_entscheidung_person(entscheidung_person)
            gruppen_vorschlag.set_entscheidung_gruppe(entscheidung_gruppe)
            result = gruppen_vorschlag
        except IndexError:
            """"""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_all_offene_for_person_id(self, person_key: int):
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM gruppen_vorschlaege WHERE person_id={} AND entscheidung_person is FALSE "\
            .format(person_key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, erstellungszeitpunkt, person_id, gruppen_id, aehnlichkeit, matchpoints, entscheidung_person,
             entscheidung_gruppe) in tuples:
            gruppen_vorschlag = GruppenVorschlag()
            gruppen_vorschlag.set_id(id)
            gruppen_vorschlag.set_erstellungszeitpunkt(erstellungszeitpunkt)
            gruppen_vorschlag.set_person_id(person_id)
            gruppen_vorschlag.set_gruppen_id(gruppen_id)
            gruppen_vorschlag.set_aehnlichkeit(aehnlichkeit)
            gruppen_vorschlag.set_matchpoints(matchpoints)
            gruppen_vorschlag.set_entscheidung_person(entscheidung_person)
            gruppen_vorschlag.set_entscheidung_gruppe(entscheidung_gruppe)
            result.append(gruppen_vorschlag)

        self._cnx.commit()
        cursor.close()

        return result

    def find_all_for_person_id(self, person_key: int):
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM gruppen_vorschlaege WHERE person_id={} "\
            .format(person_key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, erstellungszeitpunkt, person_id, gruppen_id, aehnlichkeit, matchpoints, entscheidung_person,
             entscheidung_gruppe) in tuples:
            gruppen_vorschlag = GruppenVorschlag()
            gruppen_vorschlag.set_id(id)
            gruppen_vorschlag.set_erstellungszeitpunkt(erstellungszeitpunkt)
            gruppen_vorschlag.set_person_id(person_id)
            gruppen_vorschlag.set_gruppen_id(gruppen_id)
            gruppen_vorschlag.set_aehnlichkeit(aehnlichkeit)
            gruppen_vorschlag.set_matchpoints(matchpoints)
            gruppen_vorschlag.set_entscheidung_person(entscheidung_person)
            gruppen_vorschlag.set_entscheidung_gruppe(entscheidung_gruppe)
            result.append(gruppen_vorschlag)

        self._cnx.commit()
        cursor.close()

        return result

    def find_all_anfragen(self):
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM gruppen_vorschlaege WHERE matchpoints=1 AND " \
                  "((entscheidung_person=TRUE AND entscheidung_gruppe=FALSE) " \
                  "OR (entscheidung_gruppe=TRUE AND entscheidung_person=FALSE)) "
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, erstellungszeitpunkt, person_id, gruppen_id, aehnlichkeit, matchpoints, entscheidung_person,
             entscheidung_gruppe) in tuples:
            gruppen_vorschlag = GruppenVorschlag()
            gruppen_vorschlag.set_id(id)
            gruppen_vorschlag.set_erstellungszeitpunkt(erstellungszeitpunkt)
            gruppen_vorschlag.set_person_id(person_id)
            gruppen_vorschlag.set_gruppen_id(gruppen_id)
            gruppen_vorschlag.set_aehnlichkeit(aehnlichkeit)
            gruppen_vorschlag.set_matchpoints(matchpoints)
            gruppen_vorschlag.set_entscheidung_person(entscheidung_person)
            gruppen_vorschlag.set_entscheidung_gruppe(entscheidung_gruppe)
            result.append(gruppen_vorschlag)

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

        command = "INSERT INTO gruppen_vorschlaege (id, erstellungszeitpunkt, person_id, gruppen_id, " \
                  "aehnlichkeit, matchpoints, entscheidung_person, entscheidung_gruppe) " \
                  "VALUES (%s,%s,%s,%s,%s,%s,%s,%s)"
        data = (
            gruppen_vorschlag.get_id(),
            gruppen_vorschlag.get_erstellungszeitpunkt(),
            gruppen_vorschlag.get_person_id(),
            gruppen_vorschlag.get_gruppen_id(),
            gruppen_vorschlag.get_aehnlichkeit(),
            gruppen_vorschlag.get_matchpoints(),
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

        command = "UPDATE gruppen_vorschlaege SET erstellungszeitpunkt=%s, person_id=%s, gruppen_id=%s, " \
                  "aehnlichkeit=%s, matchpoints=%s, entscheidung_person=%s, entscheidung_gruppe=%s WHERE id=%s"
        data = (
            datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            gruppen_vorschlag.get_person_id(),
            gruppen_vorschlag.get_gruppen_id(),
            gruppen_vorschlag.get_aehnlichkeit(),
            gruppen_vorschlag.get_matchpoints(),
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
        neu.set_gruppen_id(3)
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
