import datetime

from server.bo.Konversation import Konversation
from server.db.Mapper import Mapper

"""
Realisieren einer Mapper-Klasse für Konversation.
Diese Klasse bildet Konversations-Objekte auf die Datenbank ab. 
Anhand dieser Klasse können wir Konversationsobjekte:
    - modifizieren
    - suchen
    - erzeugen und
    - löschen.
"""


class KonversationMapper(Mapper):
    def __init__(self):
        super().__init__()

    def find_all(self):
        """
        Extrahieren aller Konversationsobjekte
        :return: Sammlung von Konversations-Objekten
        """

        result = []
        cursor = self._cnx.cursor()
        # Hier wird nun das SQL-Statement ausgeführt, um Konversations-Objekte aus der Datenbank zu extrahieren.
        cursor.execute("SELECT * FROM konversationen")
        tuples = cursor.fetchall()

        # Im nächsten Schritt wird über die extrahierten Objekte iteriert und eine Konversationsinstanz erstellt
        for (id, erstellungszeitpunkt, ist_gruppenchat) in tuples:
            konversation = Konversation()
            # Nun werden die Attribute mit den set-Methoden gesetted
            konversation.set_id(id)
            konversation.set_erstellungszeitpunkt(erstellungszeitpunkt)
            konversation.set_ist_gruppenchat(ist_gruppenchat)
            # Das Objekt wird an die Liste angehängt
            result.append(konversation)

        self._cnx.commit()
        cursor.close()

        # Die Liste mit den Konversations-Objekten wird zurückgegeben
        return result

    def find_by_key(self, key):
        """
        Suchen einer Konversation mit vorgegebener ID.
        :param key: Primärschlüsselattribut der relationalen Datenbank Konversation
        :return: Konversation-Objekt mit id=key
        """

        result = None
        cursor = self._cnx.cursor()
        # Definieren des SQL-Statements, der das Objekt anhand der ID filtert
        sqlstatement = "SELECT id, erstellungszeitpunkt, ist_gruppenchat FROM konversationen WHERE id={}".format(
            key
        )
        cursor.execute(sqlstatement)
        tuples = cursor.fetchall()

        try:
            (id, erstellungszeitpunkt, ist_gruppenchat) = tuples[0]
            konversation = Konversation()
            konversation.set_id(id)
            konversation.set_erstellungszeitpunkt(erstellungszeitpunkt)
            konversation.set_ist_gruppenchat(ist_gruppenchat)
            result = konversation
        except IndexError:
            """
            Wenn eine leere Sequenz zurückgegeben wird (tuples)
            """
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, konversation):
        """
        Einfügen eines Konverastion-Objektes in die DB
        :param konversation: Das zu speichernde Konversations-Objekt
        :return: das übergebene Objekt
        """

        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM konversationen")
        tuples = cursor.fetchall()

        for maxid in tuples:
            # Wir erhöhen die ID um 1, damit die neue Objekt-ID nahtlos adaptiert und inkrementiert wird
            konversation.set_id(maxid[0] + 1)

        command = "INSERT INTO konversationen (id, erstellungszeitpunkt, ist_gruppenchat) VALUES (%s,%s,%s)"
        data = (
            konversation.get_id(),
            konversation.get_erstellungszeitpunkt(),
            konversation.get_ist_gruppenchat(),
        )
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return konversation

    def update(self, konversation):
        """
        Aktualisieren einer Konversation
        :param konversation: Konversations-objekt, das in DB geschrieben soll
        """

        cursor = self._cnx.cursor()
        command = (
            "UPDATE konversation"
            + "SET erstellungszeitpunkt=%s, ist_gruppenchat=%s WHERE id=%s"
        )
        data = (
            konversation.get_erstellungszeitpunkt(),
            konversation.get_ist_gruppenchat(),
            konversation.get_id(),
        )
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, konversation):
        """
        Löschen einer Konversation
        :param konversation: Zu löschendes Konversations-objekt
        """

        cursor = self._cnx.cursor()
        # Löschen von Konversation mit übergebener ID (durch parameter konversation)
        command = "DELETE FROM konverationen WHERE id={}".format(konversation.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()


"""
Nun wird getestet, ob die Klasse funktioniert.
"""

if __name__ == "__main__":

    with KonversationMapper() as mapper:

        # testen von insert
        print("TESTEN VON INSERT")
        new_conv = Konversation()
        new_conv.set_id(999)
        new_conv.set_erstellungszeitpunkt("2021-05-11 23:42:00")
        new_conv.set_ist_gruppenchat(True)

        mapper.insert(new_conv)
        print("--- BEENDET ---\n")

        # testen von find_all
        print("TESTEN VON FIND_ALL")
        result = mapper.find_all()
        for konversation in result:
            print(konversation)
        print("--- BEENDET ---\n")

        # testen von find_by_key
        print("TESTEN VON FIND_BY_KEY")
        chose = mapper.find_by_key(0)
        print(chose)
        print("--- BEENDET ---\n")
