from server.bo.Lerngruppe import Lerngruppe
from server.db.Mapper import Mapper


class LerngruppeMapper(Mapper):
    """Mapper-Klasse, die Person-Objekte auf eine relationale
        Datenbank abbildet. Hierzu wird eine Reihe von Methoden zur Verfügung
        gestellt, mit deren Hilfe z.B. Objekte gesucht, erzeugt, modifiziert und
        gelöscht werden können. Das Mapping ist bidirektional. D.h., Objekte können
        in DB-Strukturen und DB-Strukturen in Objekte umgewandelt werden."""

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Lerngruppe-Objekte
        :return: Sammlung aller Lerngruppe-Objekte"""

        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * from lerngruppen")
        tuples = cursor.fetchall()

        for (id, erstellungszeitpunkt, gruppenname, profil_id, konversation_id) in tuples:
            lerngruppe = Lerngruppe()
            lerngruppe.set_id(id)
            lerngruppe.set_erstellungszeitpunkt(erstellungszeitpunkt)
            lerngruppe.set_gruppenname(gruppenname)
            lerngruppe.set_profil_id(profil_id)
            lerngruppe.set_konversation_id(konversation_id)
            result.append(lerngruppe)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_key(self, key):
        """Suchen einer Lerngruppe mit vorgegebener ID
        :param: key Primärschlüsselattribut
        :return: Der ID entsprechendes Lerngruppe-Objekt, None bei nicht vorhandener DB-Tupel"""

        result = None
        cursor = self._cnx.cursor()
        command = "SELECT id, erstellungszeitpunkt, gruppenname, profil_id, konversation_id FROM " \
                  "lerngruppen WHERE id={}"\
            .format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, erstellungszeitpunkt, gruppename, profil_id, konversation_id) = tuples[0]
            lerngruppe = Lerngruppe()
            lerngruppe.set_id(id)
            lerngruppe.set_erstellungszeitpunkt(erstellungszeitpunkt)
            lerngruppe.set_gruppenname(gruppename)
            lerngruppe.set_profil_id(profil_id)
            lerngruppe.set_konversation_id(konversation_id)
            result = lerngruppe

        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
                        keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, lerngruppe):
        """Einfügen eines Lerngruppe-Objekts in die Datenbank.
        Der Primärschlüssel wird dabei überprüft und ggf. berechtigt.

        :param: lerngruppe als das zu speichernde Objekt
        :return: das bereits übergebene Objekt, ggf. mit korrigierter ID."""

        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM lerngruppen")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            lerngruppe.set_id(maxid[0] + 1)

        command = "INSERT INTO lerngruppen (id, erstellungszeitpunkt, gruppenname, profil_id, konversation_id) " \
                  "VALUES (%s,%s,%s,%s,%s)"
        data = (lerngruppe.get_id(), lerngruppe.get_erstellungszeitpunkt(), lerngruppe.get_gruppenname(),
                lerngruppe.get_profil_id(), lerngruppe.get_konversation_id())
        cursor.execute(command, data)

        """Optional:
        cursor.execute("INSERT INTO lerngruppe (id, erstellungszeitpunkt, gruppenname, profil_id, konversation_id) "
                       "VALUES ('{}','{}','{}','{}','{}')"
                       .format(nachricht.get_id(), nachricht.get_erstellungszeitpunkt(), nachricht.get_gruppenname(),
                               nachricht.get_profil_id(), nachricht.get_konversation_id()))
        """

        self._cnx.commit()
        cursor.close()

        return lerngruppe

    def update(self, lerngruppen):
        """Aktualisieren eines Objekts in der Datenbank anhand seiner ID

        :param: lerngruppe als Objekt, welches in die DB geschrieben werden soll"""

        cursor = self._cnx.cursor()

        command = "DELETE FROM lerngruppen WHERE id={}".format(lerngruppen.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def delete(self, lerngruppen):
        """Löschen eines Lerngruppe-Objekts aus der Datenbank."""
        cursor = self._cnx.cursor()

        command = "DELETE FROM lerngruppen WHERE id={}".format(lerngruppen.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()


"""Testing für Klasse"""
if (__name__ == "__main__"):
    with LerngruppeMapper() as mapper:

        test = Lerngruppe()
        test.set_gruppenname("Funky Python Kurs")
        test.set_profil_id(6)
        test.set_konversation_id(6)

        mapper.insert(test)

        # Alle Daten aus der Tabelle ausgeben
        print("Find all")
        result = mapper.find_all()
        for r in result:
            print(r.__dict__)


        """# Löschen
        print("Delete")
        mapper.delete(test)

        result = mapper.find_all()
        for r in result:
            print(r.__dict__)"""
