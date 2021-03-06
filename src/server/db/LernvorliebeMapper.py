from server.bo.Lernvorliebe import Lernvorliebe
from server.db.Mapper import Mapper


class LernvorliebeMapper(Mapper):
    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Lernvorliebe-Objekte

        :return: Sammlung mit Lernvorliebe-Objekten
        """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * FROM lernvorlieben")
        tuples = cursor.fetchall()

        for (
            id,
            erstellungszeitpunkt,
            lerntyp,
            frequenz,
            extrovertiertheit,
            remote_praesenz,
            vorkenntsnisse,
            lerninteressen,
        ) in tuples:
            lernvorliebe = Lernvorliebe()
            lernvorliebe.set_id(id)
            lernvorliebe.set_erstellungszeitpunkt(erstellungszeitpunkt)
            lernvorliebe.set_lerntyp(lerntyp)
            lernvorliebe.set_frequenz(frequenz)
            lernvorliebe.set_extrovertiertheit(extrovertiertheit)
            lernvorliebe.set_remote_praesenz(remote_praesenz)
            lernvorliebe.set_vorkenntnisse(vorkenntsnisse)
            lernvorliebe.set_lerninteressen(lerninteressen)
            result.append(lernvorliebe)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_key(self, key: int):
        """Auslesen eines Lernvorliebe-Objekts anhand der Lernvorliebe ID

        :param: key: Lernvorliebe ID, Primärschlüsselattribut
        :return: Ein einzelnes Lernvorliebe-Objekt, das dem übergebenen Schlüssel entspricht,
                None bei nicht vorhandenem DB-Tupel
        """
        result = None
        cursor = self._cnx.cursor()
        command = (
            "SELECT id, erstellungszeitpunkt, lerntyp, frequenz, extrovertiertheit, remote_praesenz,"
            "vorkenntnisse, lerninteressen FROM lernvorlieben WHERE id={}".format(key)
        )
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (
                id,
                erstellungszeitpunkt,
                lerntyp,
                frequenz,
                extrovertiertheit,
                remote_praesenz,
                vorkenntsnisse,
                lerninteressen,
            ) = tuples[0]
            lernvorliebe = Lernvorliebe()
            lernvorliebe.set_id(id)
            lernvorliebe.set_erstellungszeitpunkt(erstellungszeitpunkt)
            lernvorliebe.set_lerntyp(lerntyp)
            lernvorliebe.set_frequenz(frequenz)
            lernvorliebe.set_extrovertiertheit(extrovertiertheit)
            lernvorliebe.set_remote_praesenz(remote_praesenz)
            lernvorliebe.set_vorkenntnisse(vorkenntsnisse)
            lernvorliebe.set_lerninteressen(lerninteressen)
            result = lernvorliebe
        except IndexError:
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, lernvorliebe: Lernvorliebe):
        """Einfügen eines Lernvorliebe-Objekts in die Datenbank.

        Der Primärschlüssel wird dabei überprüft und ggf. berechtigt.

        :param: lernvorliebe: Das zu speichernde Lernvorliebe-Objekt
        :return: Das bereits übergebene Lernvorliebe-Objekt, jeodch mit ggf, korrigierter ID.
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM lernvorlieben")
        tuples = cursor.fetchall()

        for maxid in tuples:
            if maxid[0] is not None:
                lernvorliebe.set_id(maxid[0] + 1)
            else:
                lernvorliebe.set_id(1)

        command = (
            "INSERT INTO lernvorlieben (id, erstellungszeitpunkt, lerntyp, frequenz, extrovertiertheit, "
            "remote_praesenz, vorkenntnisse, lerninteressen) VALUES (%s, %s, %s, %s, %s, %s, %s, %s) "
        )
        data = (
            lernvorliebe.get_id(),
            lernvorliebe.get_erstellungszeitpunkt(),
            lernvorliebe.get_lerntyp(),
            lernvorliebe.get_frequenz(),
            lernvorliebe.get_extrovertiertheit(),
            lernvorliebe.get_remote_praesenz(),
            lernvorliebe.get_vorkenntnisse(),
            lernvorliebe.get_lerninteressen(),
        )
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return lernvorliebe

    def update(self, lernvorliebe: Lernvorliebe):
        """Aktualisieren eines Lernvorliebe-Objekts in der Datenbank anhand seiner ID

        :param lernvorliebe: Das Lernvorliebe-Objekt, das in der Datenbank übergeschrieben werden soll
        """
        cursor = self._cnx.cursor()

        command = (
            "UPDATE lernvorlieben SET lerntyp=%s, frequenz=%s, extrovertiertheit=%s, "
            "remote_praesenz=%s, vorkenntnisse=%s, lerninteressen=%s WHERE id=%s"
        )
        data = (
            lernvorliebe.get_lerntyp(),
            lernvorliebe.get_frequenz(),
            lernvorliebe.get_extrovertiertheit(),
            lernvorliebe.get_remote_praesenz(),
            lernvorliebe.get_vorkenntnisse(),
            lernvorliebe.get_lerninteressen(),
            lernvorliebe.get_id(),
        )
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, lernvorliebe: Lernvorliebe):
        """Löschen der Daten eines Lernvorliebe-Objekts aus der Datenbank.

        :param lernvorliebe: Das aus der Datenbank zu löschende Lernvorliebe-Objekt
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM lernvorlieben WHERE id={}".format(lernvorliebe.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()


"""Testbereicht, ob Klasse funktioniert"""

if __name__ == "__main__":
    with LernvorliebeMapper() as mapper:

        neu = Lernvorliebe()
        neu.set_lerntyp(3)
        neu.set_frequenz(2)
        neu.set_extrovertiertheit(1)
        neu.set_remote_praesenz(1)
        neu.set_vorkenntnisse("Mathe, Programmieren, Ptyhon")
        neu.set_lerninteressen("Wirtschaft")
        neu.set_id(3)

        mapper.insert(neu)

        result = mapper.find_all()
        for r in result:
            print(r)

        print("test")
        mapper.delete(neu)
        result = mapper.find_all()
        for r in result:
            print(r)
