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

    def find_by_key(self, key: int):
        """Suchen einer GruppenTeilnahme mit vorgegebener GruppenTeilnahme-ID

        :param: key Primärschlüsselattribut
        :return: GruppenTeilnahme-Objekt, das dem übergebenen Schlüssel entspricht, None bei nicht vorhandenem DB-Tupel
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

    def insert(self, gruppenteilnahme: GruppenTeilnahme):
        """Einfügen eines GruppenTeilnahme-Objekts in die Datenbank.

        Der Primärschlüssel wird dabei überprüft und ggf. berechtigt.

        :param: gruppenteilnahme das zu speichernde Objekt
        :return: das bereits übergebene Objekt, jedoch mit ggf, korrigierter ID.
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM gruppen_teilnahmen")
        tuples = cursor.fetchall()

        for maxid in tuples:
            gruppenteilnahme.set_id(maxid[0] + 1)

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
        """Aktualisieren eines Objekts in der Datenbank anhand seiner ID

        :param gruppenteilnahme: das Objekt, das in die DB geschrieben werden soll
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
        )
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, gruppenteilnahme: GruppenTeilnahme):
        """Löschen der Daten eines GruppenTeilnahme-Objekts aus der Datenbank.

        :param gruppenteilnahme: das aus der Datenbank zu löschende Objekt
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
