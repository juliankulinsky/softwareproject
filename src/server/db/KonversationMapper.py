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
        """ Auslesen aller Konversations-Objekte

        :return: Sammlung aller Konversations-Objekte
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

    def find_by_key(self, key: int):
        """
        Auslesen eines Konversations-Objektes der gegebenen Konversations ID

        :param key: Konversations ID
                    Primärschlüsselattribut der relationalen Datenbank Konversation
        :return: Ein einzelnes Konversations-Objekt der gegeben Konversations ID
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

    def find_by_person_id(self, person_key):
        """
        Auslesen aller Konversations-Objekte mit der gegebenen Person ID

        :param person_key: Person ID
        :return: Sammlung aller Konversations-Objekte der gegebenen Person ID
        """
        result = []
        cursor = self._cnx.cursor()
        # Hier wird nun das SQL-Statement ausgeführt, um Konversations-Objekte aus der Datenbank zu extrahieren.
        cursor.execute("SELECT L.id, L.erstellungszeitpunkt, L.ist_gruppenchat "
                       "FROM konversationen AS L LEFT OUTER JOIN chat_teilnahmen AS R "
                       "ON R.konversation_id=L.id "
                       "WHERE R.person_id={}".format(person_key))
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

    def insert(self, konversation: Konversation):
        """
        Einfügen eines Konverastion-Objekts in die Datenbank

        Der Primärschlüssel wird dabei überprüft und ggf. berechtigt.

        :param konversation: Das zu speichernde Konversations-Objekt
        :return: Das bereits übergebene Konversations-Objekt, jedoch mit ggf, korrigierter ID.
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM konversationen")
        tuples = cursor.fetchall()

        for maxid in tuples:
            # Wir erhöhen die ID um 1, damit die neue Objekt-ID nahtlos adaptiert und inkrementiert wird
            if maxid[0] is not None:
                konversation.set_id(maxid[0]+1)
            else:
                konversation.set_id(1)

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

    def update(self, konversation: Konversation):
        """
        Aktualisieren einer Konversations-Objekt in der Datenbank anhand seiner ID

        :param konversation: Konversations-objekt, das in der Datenbank übergeschrieben werden soll
        """
        cursor = self._cnx.cursor()
        command = (
            "UPDATE konversationen SET ist_gruppenchat=%s WHERE id=%s"
        )
        data = (
            konversation.get_ist_gruppenchat(),
            konversation.get_id()
        )
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, konversation: Konversation):
        """
        Löschen der Daten eines Konversations-Objekts
        :param konversation: Das aus der Datenbank zu löschende Konversations-Objekt
        """
        cursor = self._cnx.cursor()
        # Löschen von Konversation mit übergebener ID (durch parameter konversation)
        command = "DELETE FROM konversationen WHERE id={}".format(konversation.get_id())
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
            print(konversation.__dict__)
        print("--- BEENDET ---\n")

        # testen von find_by_key
        print("TESTEN VON FIND_BY_KEY")
        chose = mapper.find_by_key(1)
        print(chose.__dict__)
        print("--- BEENDET ---\n")

        # testen von delete
        print("TESTEN VON DELETE")
        obj = mapper.find_by_key(3)
        mapper.delete(obj)
        print("--- BEENDET ---\n")
