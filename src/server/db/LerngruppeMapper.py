from server.bo.Lerngruppe import Lerngruppe
from server.db.Mapper import Mapper

"""Mapper-Klasse, welche Lerngruppe-Objekte in eine relationale Datenbank (DB),
    und umgekehrt von einer DB auf ein Objekt, abbilden kann.
    Dazu werden die folgenden Methoden zur Verfügung gestellt,
    mit denen Objekte gesucht, erzeugt, modifiziert und gelöscht werden können."""


class LerngruppeMapper(Mapper):
    def __init__(self):
        super().__init__()

    def find_all(self):
        """Extrahieren aller Lerngruppe-Objekte."""

        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * from lerngruppen")  # SQL Statement
        tuples = cursor.fetchall()

        for (id,
             erstellungszeitpunkt,
             gruppenname,
             profil_id,
             konversation_id
             ) in tuples:
            lerngruppe = Lerngruppe()
            lerngruppe.set_id(id)
            lerngruppe.set_erstellungszeitpunkt(erstellungszeitpunkt)
            lerngruppe.set_gruppenname(gruppenname)
            lerngruppe.set_profil_id(profil_id)
            lerngruppe.set_konversation_id(konversation_id)
            result.append(lerngruppe)

        self._cnx.commit()
        cursor.close()

        return result  # Rückgabe der Sammlung aller Lerngruppe-Objekte

    def find_by_key(self, key: int):
        """Suchen einer Lerngruppe mit vorgegebener ID."""

        result = None
        cursor = self._cnx.cursor()
        command = ("SELECT id, erstellungszeitpunkt, gruppenname, profil_id, konversation_id FROM "
                   "lerngruppen WHERE id={}".format(key))
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

        except IndexError:  # Wenn eine leere Sequenz zurückgegeben wird (tuples).
            result = None

        self._cnx.commit()
        cursor.close()

        return result  # Der Rückgabe der ID entsprechendes Lerngruppe-Objekt (None bei fehlender DB-Tupel)

    def find_by_person_id(self, person_key: int):
        """Suchen von Lerngruppen, an denen eine bestimmte Person mit einer ID teilnimmt"""

        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT L.id, L.erstellungszeitpunkt, L.gruppenname, L.profil_id, L.konversation_id "
                       "FROM lerngruppen AS L LEFT OUTER JOIN gruppen_teilnahmen AS R "
                       "ON R.gruppen_id=L.id "
                       "WHERE R.person_id={}".format(person_key))
        tuples = cursor.fetchall()

        for (id,
             erstellungszeitpunkt,
             gruppenname,
             profil_id,
             konversation_id
             ) in tuples:
            lerngruppe = Lerngruppe()
            lerngruppe.set_id(id)
            lerngruppe.set_erstellungszeitpunkt(erstellungszeitpunkt)
            lerngruppe.set_gruppenname(gruppenname)
            lerngruppe.set_profil_id(profil_id)
            lerngruppe.set_konversation_id(konversation_id)
            result.append(lerngruppe)

        self._cnx.commit()
        cursor.close()

        return result  # Rückgabe der Sammlung aller Lerngruppe-Objekte

    def find_by_konversation_id(self, konversation_key: int):
        """Suchen von Lerngruppen, an denen eine bestimmte Person mit einer ID teilnimmt"""

        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT id, erstellungszeitpunkt, gruppenname, profil_id, konversation_id FROM "
                       "lerngruppen WHERE konversation_id={}".format(konversation_key))
        tuples = cursor.fetchall()

        for (id,
             erstellungszeitpunkt,
             gruppenname,
             profil_id,
             konversation_id
             ) in tuples:
            lerngruppe = Lerngruppe()
            lerngruppe.set_id(id)
            lerngruppe.set_erstellungszeitpunkt(erstellungszeitpunkt)
            lerngruppe.set_gruppenname(gruppenname)
            lerngruppe.set_profil_id(profil_id)
            lerngruppe.set_konversation_id(konversation_id)
            result.append(lerngruppe)

        self._cnx.commit()
        cursor.close()

        return result  # Rückgabe der Sammlung aller Lerngruppe-Objekte

    def insert(self, lerngruppe: Lerngruppe):
        """Einfügen eines Lerngruppe-Objekts in die Datenbank.
        Der Primärschlüssel wird dabei überprüft und ggf. berechtigt."""

        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM lerngruppen")
        tuples = cursor.fetchall()

        for maxid in tuples:
            lerngruppe.set_id(maxid[0] + 1)

        command = ("INSERT INTO lerngruppen (id, erstellungszeitpunkt, gruppenname, profil_id, konversation_id) "
                   "VALUES (%s,%s,%s,%s,%s)")
        data = (
            lerngruppe.get_id(),
            lerngruppe.get_erstellungszeitpunkt(),
            lerngruppe.get_gruppenname(),
            lerngruppe.get_profil_id(),
            lerngruppe.get_konversation_id()
        )
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return lerngruppe  # Rückgabe des bereits übergebenen Objektes, ggf. mit korrigierter ID

    def update(self, lerngruppe: Lerngruppe):
        """Aktualisieren eines Objekts in der Datenbank anhand seiner ID."""

        cursor = self._cnx.cursor()

        command = (
            "UPDATE lerngruppen SET gruppenname=%s, profil_id=%s, konversation_id=%s WHERE id=%s "
        )
        data = (
            lerngruppe.get_gruppenname(),
            lerngruppe.get_profil_id(),
            lerngruppe.get_konversation_id(),
            lerngruppe.get_id()
        )
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, lerngruppe: Lerngruppe):
        """Löschen eines Lerngruppe-Objekts aus der Datenbank."""
        cursor = self._cnx.cursor()

        command = "DELETE FROM lerngruppen WHERE id={}".format(lerngruppe.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()


"""Testing für Klasse"""
if __name__ == "__main__":
    with LerngruppeMapper() as mapper:

        test = Lerngruppe()
        test.set_gruppenname("Funky Java Kurs")
        test.set_profil_id(7)
        test.set_konversation_id(7)

        #   Methode insert
        print("Test der Methode: .insert")
        mapper.insert(test)

        #   Methode find_all
        print("Test der Methode: find_all")
        result = mapper.find_all()
        for r in result:
            print(r.__dict__)

        #   Methode find_by_key
        print("Test der Methode: .find_by_key")
        lostkey = mapper.find_by_key(1)
        print(lostkey.__dict__)

        #   Methode update
        print("Test der Methode: .update")
        updt = mapper.find_by_key(3)
        updt.set_gruppenname("Funky Python Kurs")
        mapper.update(updt)

        #   Nochmal find_all
        print("Erneut Methode: find_all")
        result = mapper.find_all()
        for r in result:
            print(r.__dict__)

        #   Methode delete
        print("Test der Methode: .delete")
        weg = mapper.find_by_key(3)
        mapper.delete(weg)

        #   Nochmal find_all
        print("Erneut Methode: find_all")
        result = mapper.find_all()
        for r in result:
            print(r.__dict__)
