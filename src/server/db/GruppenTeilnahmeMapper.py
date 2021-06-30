from server.bo.GruppenTeilnahme import GruppenTeilnahme
from server.db.Mapper import Mapper


class GruppenTeilnahmeMapper(Mapper):
    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller GruppenTeilnahme-Objekte

        :return: Sammlung mit GruppenTeilnahme-Objekten
        """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * from gruppen_teilnahmen")
        tuples = cursor.fetchall()

        for (id, erstellungszeitpunkt, person_id, gruppen_id, ist_admin) in tuples:
            gruppenteilnahme = GruppenTeilnahme()
            gruppenteilnahme.set_id(id)
            gruppenteilnahme.set_erstellungszeitpunkt(erstellungszeitpunkt)
            gruppenteilnahme.set_person_id(person_id)
            gruppenteilnahme.set_gruppen_id(gruppen_id)
            gruppenteilnahme.set_ist_admin(ist_admin)
            result.append(gruppenteilnahme)

        self._cnx.commit()
        cursor.close()

        return result

    def find_all_by_gruppen_id(self, gruppen_id):
        """Auslesen aller GruppenTeilnahme-Objekte der zugehörigen Gruppen ID

        :param gruppen_id: Gruppen ID
        :return: Sammlung mit GruppenTeilnahme-Objekten
        """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute(
            "SELECT * from gruppen_teilnahmen WHERE gruppen_id={}".format(gruppen_id)
        )
        tuples = cursor.fetchall()

        for (id, erstellungszeitpunkt, person_id, gruppen_id, ist_admin) in tuples:
            gruppenteilnahme = GruppenTeilnahme()
            gruppenteilnahme.set_id(id)
            gruppenteilnahme.set_erstellungszeitpunkt(erstellungszeitpunkt)
            gruppenteilnahme.set_person_id(person_id)
            gruppenteilnahme.set_gruppen_id(gruppen_id)
            gruppenteilnahme.set_ist_admin(ist_admin)
            result.append(gruppenteilnahme)

        self._cnx.commit()
        cursor.close()

        return result

    def find_all_by_person_id(self, person_id):
        """Auslesen aller GruppenTeilnahme-Objekte mit zugehöriger Person ID

        :param person_id: Person ID
        :return: Sammlung mit GruppenTeilnahme-Objekten
        """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute(
            "SELECT * from gruppen_teilnahmen WHERE person_id={}".format(person_id)
        )
        tuples = cursor.fetchall()

        for (id, erstellungszeitpunkt, person_id, gruppen_id, ist_admin) in tuples:
            gruppenteilnahme = GruppenTeilnahme()
            gruppenteilnahme.set_id(id)
            gruppenteilnahme.set_erstellungszeitpunkt(erstellungszeitpunkt)
            gruppenteilnahme.set_person_id(person_id)
            gruppenteilnahme.set_gruppen_id(gruppen_id)
            gruppenteilnahme.set_ist_admin(ist_admin)
            result.append(gruppenteilnahme)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_key(self, key: int):
        """Auslesen eines GruppenTeilnahme-Objekts mit gegebener GruppenTeilnahme ID

        :param: key: Primärschlüsselattribut
        :return: Ein einzelnes GruppenTeilnahme-Objekt, das dem übergebenen Schlüssel entspricht,
                 None bei nicht vorhandenem DB-Tupel
        """
        result = None
        cursor = self._cnx.cursor()
        command = (
            "SELECT id, erstellungszeitpunkt, person_id, gruppen_id, ist_admin FROM gruppen_teilnahmen WHERE "
            "id={}".format(key)
        )
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, erstellungszeitpunkt, person_id, gruppen_id, ist_admin) = tuples[0]
            gruppenteilnahme = GruppenTeilnahme()
            gruppenteilnahme.set_id(id)
            gruppenteilnahme.set_erstellungszeitpunkt(erstellungszeitpunkt)
            gruppenteilnahme.set_person_id(person_id)
            gruppenteilnahme.set_gruppen_id(gruppen_id)
            gruppenteilnahme.set_ist_admin(ist_admin)
            result = gruppenteilnahme
        except IndexError:
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_person_id_und_gruppen_id(self, person_id: int, gruppen_id: int):
        """Auslesen eines GruppenTeilnahme-Objekts mit vorgegebener Person ID, sowie Gruppen ID

        :param: person_id: Person ID
        :param: gruppen_id: Gruppen ID
        :return: Ein einzelnes GruppenTeilnahme-Objekt, welches zu einer Person und einer Gruppe gehört,
                 None bei nicht vorhandenem DB-Tupel
        """
        result = None
        cursor = self._cnx.cursor()
        command = "SELECT * FROM gruppen_teilnahmen WHERE person_id={} AND gruppen_id={}".format(
            person_id, gruppen_id
        )
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, erstellungszeitpunkt, person_id, gruppen_id, ist_admin) = tuples[0]
            gruppenteilnahme = GruppenTeilnahme()
            gruppenteilnahme.set_id(id)
            gruppenteilnahme.set_erstellungszeitpunkt(erstellungszeitpunkt)
            gruppenteilnahme.set_person_id(person_id)
            gruppenteilnahme.set_gruppen_id(gruppen_id)
            gruppenteilnahme.set_ist_admin(ist_admin)
            result = gruppenteilnahme
        except IndexError:
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, gruppenteilnahme: GruppenTeilnahme):
        """Einfügen eines GruppenTeilnahme-Objekts in die Datenbank.

        Der Primärschlüssel wird dabei überprüft und ggf. berechtigt.

        :param: gruppenteilnahme: Das zu speichernde Objekt
        :return: Das bereits übergebene Objekt, jedoch mit ggf, korrigierter ID.
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM gruppen_teilnahmen")
        tuples = cursor.fetchall()

        for maxid in tuples:
            if maxid[0] is not None:
                gruppenteilnahme.set_id(maxid[0] + 1)
            else:
                gruppenteilnahme.set_id(1)

        command = (
            "INSERT INTO gruppen_teilnahmen (id, erstellungszeitpunkt, person_id, gruppen_id, ist_admin) VALUES "
            "(%s,%s,%s,%s,%s)"
        )

        data = (
            gruppenteilnahme.get_id(),
            gruppenteilnahme.get_erstellungszeitpunkt(),
            gruppenteilnahme.get_person_id(),
            gruppenteilnahme.get_gruppen_id(),
            gruppenteilnahme.get_ist_admin(),
        )
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return gruppenteilnahme

    def update(self, gruppenteilnahme: GruppenTeilnahme):
        """Aktualisieren eines GruppenTeilnahme-Objekts in der Datenbank anhand seiner ID

        :param gruppenteilnahme: Das GruppenTeilnahme-Objekt, das in der Datenbank übergeschrieben werden soll
        """
        cursor = self._cnx.cursor()

        command = (
            "UPDATE gruppen_teilnahmen SET person_id=%s, gruppen_id=%s, ist_admin=%s "
            "WHERE id=%s"
        )
        data = (
            gruppenteilnahme.get_person_id(),
            gruppenteilnahme.get_gruppen_id(),
            gruppenteilnahme.get_ist_admin(),
            gruppenteilnahme.get_id(),
        )
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, gruppenteilnahme: GruppenTeilnahme):
        """Löschen der Daten eines GruppenTeilnahme-Objekts aus der Datenbank.

        :param gruppenteilnahme: Das aus der Datenbank zu löschende Objekt
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM gruppen_teilnahmen WHERE id={}".format(
            gruppenteilnahme.get_id()
        )
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()


if __name__ == "__main__":
    with GruppenTeilnahmeMapper() as mapper:

        neu = GruppenTeilnahme()
        neu.set_id(3)
        neu.set_person_id(3)
        neu.set_gruppen_id(50)
        neu.get_ist_admin()

        mapper.insert(neu)

        result = mapper.find_all()
        for p in result:
            print(p.__dict__)

        print("TESTTEST")

        mapper.delete(neu)
