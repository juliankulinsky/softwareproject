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

        :return: Sammlung mit GruppenVorschlag-Objekten
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
        """Auslesen aller GruppenVorschläge-Objekte der zugehörigen Gruppenvorschlags ID

        :param key: GruppenVorschlags ID
        :return: Sammlung mit GruppenVorschlag-Objekten, der zugehörigen Gruppenvorschlags ID
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
        """Auslesen des GruppenVorschlags-Objekt der gegebenen Person ID und Gruppen ID

        :param person_key: Person ID
        :param gruppen_key: Gruppen ID
        :return: Ein einzelnes GruppenVorschlag-Objekt, der gegebenen Person ID und Gruppen ID
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
        """ Auslesen der GruppenVorschlags-Objekte der gegebenen Person ID bei dem die Entscheidung der Gruppe schon
            getroffen ist, die Entscheidung der Person jedoch noch nicht

        :param person_key: Person ID
        :return: Sammlung mit GruppenVorschlags-Objekten, der gegebenen Person ID
        """
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
        """ Auslesen der GruppenVorschlags-Objekte der gegebenen Person ID bei dem die Entscheidung der Person schon
                   getroffen ist, die Entscheidung der Gruppe jedoch noch nicht

        :param person_key: Person ID
        :return: Sammlung mit GruppenVorschlags-Objekten, der gegebenen Person ID
        """
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
        """ Auslesen der GruppenVorschlags-Objekte der gegebenen Gruppen ID bei dem die Entscheidung der Person schon
                           getroffen ist, die Entscheidung der Gruppe jedoch noch nicht

        :param gruppen_key: Gruppen ID
        :return: Sammlung mit GruppenVorschlags-Objekten, der gegebenen Gruppen ID
        """
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
        """ Auslesen der GruppenVorschlags-Objekte der gegebenen Gruppen ID

        :param gruppen_key: Gruppen ID
        :return: Sammlung mit GruppenVorschlags-Objekten, der gegebenen Gruppen ID
        """
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
        """ Auslesen der GruppenVorschlags-Objekte der gegebenen Person ID, bei denen noch keine Entscheidung der
            Person getroffen wurde in absteigender Reihenfolge

        :param person_id: Person ID
        :return: Sammlung mit GruppenVorschlags-Objekten, der gegebenen Person ID
        """
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
        """ Auslesen aller GruppenVorschlags-Objekte der gegebenen Person ID, bei denen noch keine Entscheidung der
                    Person getroffen

        :param person_key: Person ID
        :return: Sammlung mit GruppenVorschlags-Objekten, der gegebenen Person ID
        """
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
        """ Auslesen aller GruppenVorschlags-Objekte der gegebenen Person ID

        :param person_key: Person ID
        :return: Sammlung mit GruppenVorschlags-Objekten, der gegebenen Person ID
        """
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
        """ Auslesen aller GruppenVorschlags-Objekte, deren Matchpoints auf 1 gesetzt ist, entweder durch eine
            Entscheidung seitens der Gruppe, oder der Person, jedoch nicht beiderseits

        :return: Sammlung mit GruppenVorschlags-Objekten
        """
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
        """Einfügen eines GruppenVorschlags-Objekts in die Datenbank.

        Der Primärschlüssel wird dabei überprüft und ggf. berechtigt.

        :param: gruppen_vorschlag: Das zu speichernde GruppenVorschlags-Objekt
        :return: Das bereits übergebene GruppenVorschlags-Objekt, jedoch mit ggf, korrigierter ID.
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM gruppen_vorschlaege")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                gruppen_vorschlag.set_id(maxid[0]+1)
            else:
                gruppen_vorschlag.set_id(1)

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
        """Aktualisieren eines GruppenVorschlags-Objekts in der Datenbank anhand seiner ID

        :param gruppen_vorschlag: Das GruppenVorschlags-Objekt, das in der Datenbank übergeschrieben werden soll
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
        """Löschen der Daten eines GruppenVorschlags-Objekts aus der Datenbank.

        :param gruppen_vorschlag: Das aus der Datenbank zu löschende GruppenVorschlags-Objekt
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
