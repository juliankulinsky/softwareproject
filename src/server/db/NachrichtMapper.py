from server.bo.Nachricht import Nachricht
from server.db.Mapper import Mapper


class NachrichtMapper (Mapper):
    """Mapper-Klasse, die Konversation-Objekte auf eine relationale
    Datenbank abbildet. Hierzu wird eine Reihe von Methoden zur Verfügung
    gestellt, mit deren Hilfe z.B. Objekte gesucht, erzeugt, modifiziert und
    gelöscht werden können. Das Mapping ist bidirektional. D.h., Objekte können
    in DB-Strukturen und DB-Strukturen in Objekte umgewandelt werden.
    """

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Nachricht-Objekte

        :return: Sammlung mit Nachricht-Objekten, die sämtliche Kunden repräsentieren
        """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * from nachrichten")
        tuples = cursor.fetchall()

        for (id, erstellungszeitpunkt, inhalt, absender_id, konversation_id) in tuples:
            nachricht = Nachricht()
            nachricht.set_id(id)
            nachricht.set_erstellungszeitpunkt(erstellungszeitpunkt)
            nachricht.set_inhalt(inhalt)
            nachricht.set_absender_id(absender_id)
            nachricht.set_konversation_id(konversation_id)
            result.append(nachricht)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_key(self, key: int):
        """Suchen einer Nachricht mit vorgegebener Nachrichten-ID

        :param: key Primärschlüsselattribut
        :return: Nachricht-Objekt, das dem übergebenen Schlüssel entspricht, None bei nicht vorhandenem DB-Tupel
        """
        result = None
        cursor = self._cnx.cursor()
        command = "SELECT id, erstellungszeitpunkt, inhalt, absender_id, konversation_id FROM nachrichten WHERE id={}"\
            .format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, erstellungszeitpunkt, inhalt, absender_id, konversation_id) = tuples[0]
            nachricht = Nachricht()
            nachricht.set_id(id)
            nachricht.set_erstellungszeitpunkt(erstellungszeitpunkt)
            nachricht.set_inhalt(inhalt)
            nachricht.set_absender_id(absender_id)
            nachricht.set_konversation_id(konversation_id)
            result = nachricht
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_konversation_id(self, konversation_key):
        """Auslesen aller Nachricht-Objekte

        :return: Sammlung mit Nachricht-Objekten, die sämtliche Kunden repräsentieren
        """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT id, erstellungszeitpunkt, inhalt, absender_id, konversation_id FROM nachrichten "
                       "WHERE konversation_id={} ORDER BY erstellungszeitpunkt ASC".format(konversation_key))
        tuples = cursor.fetchall()

        for (id, erstellungszeitpunkt, inhalt, absender_id, konversation_id) in tuples:
            nachricht = Nachricht()
            nachricht.set_id(id)
            nachricht.set_erstellungszeitpunkt(erstellungszeitpunkt)
            nachricht.set_inhalt(inhalt)
            nachricht.set_absender_id(absender_id)
            nachricht.set_konversation_id(konversation_id)
            result.append(nachricht)

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, nachricht: Nachricht):
        """Einfügen eines Nachricht-Objekts in die Datenbank.

        Der Primärschlüssel wird dabei überprüft und ggf. berechtigt.

        :param: nachricht das zu speichernde Objekt
        :return: das bereits übergebene Objekt, jeodch mit ggf, korrigierter ID.
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM nachrichten")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            nachricht.set_id(maxid[0]+1)

        command = "INSERT INTO nachrichten (id, erstellungszeitpunkt, inhalt, absender_id, konversation_id) " \
                  "VALUES (%s,%s,%s,%s,%s)"
        data = (
            nachricht.get_id(),
            nachricht.get_erstellungszeitpunkt(),
            nachricht.get_inhalt(),
            nachricht.get_absender_id(),
            nachricht.get_konversation_id()
        )
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return nachricht

    def update(self, nachricht: Nachricht):
        """Aktualisieren eines Objekts in der Datenbank anhand seiner ID

        :param nachricht: das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()

        command = "UPDATE nachrichten SET inhalt=%s, absender_id=%s, konversation_id=%s WHERE id=%s"
        data = (
            nachricht.get_erstellungszeitpunkt(),
            nachricht.get_inhalt(),
            nachricht.get_absender_id(),
            nachricht.get_konversation_id(),
            nachricht.get_id()
        )
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, nachricht: Nachricht):
        """Löschen der Daten eines Nachricht-Objekts aus der Datenbank.

        :param nachricht: das aus der Datenbank zu löschende Objekt
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM nachrichten WHERE id={}".format(nachricht.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()


"""Testbereich, ob die Klasse funktioniert"""

if (__name__ == "__main__"):
    with NachrichtMapper() as mapper:

        neu = Nachricht()
        neu.set_inhalt("Kommt diese Nachricht an?")
        neu.set_absender_id(2)
        neu.set_konversation_id(1)
        neu.set_id(2)

        mapper.insert(neu)

        result = mapper.find_all()
        for p in result:
            print(p)

        print("YO")
        mapper.delete(neu)
        result = mapper.find_all()
        for p in result:
            print(p)

        auswahl = mapper.find_by_key(3)
        auswahl.set_inhalt("yo ich hab das hier verändert")
        mapper.update(auswahl)

        result = mapper.find_all()
        for p in result:
            print(p)
