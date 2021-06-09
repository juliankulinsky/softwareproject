from server.bo.Person import Person
from server.db.Mapper import Mapper


class PersonMapper (Mapper):
    """Mapper-Klasse, die Person-Objekte auf eine relationale
    Datenbank abbildet. Hierzu wird eine Reihe von Methoden zur Verfügung
    gestellt, mit deren Hilfe z.B. Objekte gesucht, erzeugt, modifiziert und
    gelöscht werden können. Das Mapping ist bidirektional. D.h., Objekte können
    in DB-Strukturen und DB-Strukturen in Objekte umgewandelt werden.
    """

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Person-Objekte

        :return: Sammlung mit Person-Objekten, die sämtliche Kunden repräsentieren
        """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * from personen")
        tuples = cursor.fetchall()

        for (id, erstellungszeitpunkt, name, email, google_user_id, alter, wohnort, studiengang, semester, profil_id) in tuples:
            person = Person()
            person.set_id(id)
            person.set_erstellungszeitpunkt(erstellungszeitpunkt)
            person.set_name(name)
            person.set_email(email)
            person.set_google_user_id(google_user_id)
            person.set_alter(alter)
            person.set_studiengang(studiengang)
            person.set_wohnort(wohnort)
            person.set_semester(semester)
            person.set_profil_id(profil_id)
            result.append(person)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_key(self, key: int):
        """Suchen einer Person mit vorgegebener Person-ID

        :param: key Primärschlüsselattribut
        :return: Person-Objekt, das dem übergebenen Schlüssel entspricht, None bei nicht vorhandenem DB-Tupel
        """
        result = None
        cursor = self._cnx.cursor()
        command = "SELECT id, erstellungszeitpunkt, `name`, email, google_user_id, `alter`, wohnort, studiengang, semester, " \
                  "profil_id FROM personen WHERE id={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, erstellungszeitpunkt, name, email, google_user_id, alter, wohnort, studiengang, semester, profil_id) = tuples[0]
            person = Person()
            person.set_id(id)
            person.set_erstellungszeitpunkt(erstellungszeitpunkt)
            person.set_name(name)
            person.set_email(email)
            person.set_google_user_id(google_user_id)
            person.set_alter(alter)
            person.set_studiengang(studiengang)
            person.set_wohnort(wohnort)
            person.set_semester(semester)
            person.set_profil_id(profil_id)
            result = person
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_google_user_id(self, key: str):
        """Suchen eines Person-Objekts mit der angegebenen Google-User-ID

        :param key:
        :return: das gesuchte Person-Objekt
        """
        result = None
        cursor = self._cnx.cursor()
        command = "SELECT id, erstellungszeitpunkt, `name`, email, google_user_id, `alter`, wohnort, studiengang, semester, " \
                  "profil_id FROM personen WHERE google_user_id='{}'".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, erstellungszeitpunkt, name, email, key, alter, wohnort, studiengang, semester, profil_id) = \
            tuples[0]
            person = Person()
            person.set_id(id)
            person.set_erstellungszeitpunkt(erstellungszeitpunkt)
            person.set_name(name)
            person.set_email(email)
            person.set_google_user_id(key)
            person.set_alter(alter)
            person.set_studiengang(studiengang)
            person.set_wohnort(wohnort)
            person.set_semester(semester)
            person.set_profil_id(profil_id)
            result = person
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result


    def insert(self, person: Person):
        """Einfügen eines Person-Objekts in die Datenbank.

        Der Primärschlüssel wird dabei überprüft und ggf. berechtigt.

        :param: person das zu speichernde Objekt
        :return: das bereits übergebene Objekt, jeodch mit ggf, korrigierter ID.
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM personen")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            person.set_id(maxid[0]+1)

        command = "INSERT INTO personen (id, erstellungszeitpunkt, name, email, google_user_id, `alter`, wohnort, " \
                  "studiengang, semester, profil_id) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
        data = (
            person.get_id(),
            person.get_erstellungszeitpunkt(),
            person.get_name(),
            person.get_email(),
            person.get_google_user_id(),
            person.get_alter(),
            person.get_wohnort(),
            person.get_studiengang(),
            person.get_semester(),
            person.get_profil_id()
        )
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return person

    def update(self, person: Person):
        """Aktualisieren eines Objekts in der Datenbank anhand seiner ID

        :param person: das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()

        command = "UPDATE personen SET name=%s, email=%s, google_user_id=%s, `alter`=%s, wohnort=%s, studiengang=%s, " \
                  "semester=%s, profil_id=%s WHERE id=%s"
        data = (
            person.get_name(),
            person.get_email(),
            person.get_google_user_id(),
            person.get_alter(),
            person.get_wohnort(),
            person.get_studiengang(),
            person.get_semester(),
            person.get_profil_id(),
            person.get_id()
        )
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, person: Person):
        """Löschen der Daten eines Person-Objekts aus der Datenbank.

        :param person: das aus der Datenbank zu löschende Objekt
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM personen WHERE id={}".format(person.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()


"""Testbereich, ob die Klasse funktioniert"""

if (__name__ == "__main__"):
    with PersonMapper() as mapper:

        neu = Person()
        neu.set_name("Moritz Mulser")
        neu.set_email("m.m@gmail.com")
        neu.set_google_user_id("ljknsdfjknbfdjkfsdjknfYO")
        neu.set_alter(23)
        neu.set_wohnort("Böblingen")
        neu.set_studiengang("WI7")
        neu.set_semester(4)
        neu.set_profil_id(5)
        mapper.insert(neu)

        print("Find all")
        result = mapper.find_all()
        for p in result:
            print(p.get_id(), p.get_erstellungszeitpunkt(), p.get_name(), p.get_email(), p.get_google_user_id,
                  p.get_alter(), p.get_wohnort(), p.get_studiengang(), p.get_semester(), p.get_profil_id())


        print("Delete")
        mapper.delete(neu)
        result = mapper.find_all()
        for p in result:
            print(p.get_id(), p.get_erstellungszeitpunkt(), p.get_name(), p.get_email(), p.get_google_user_id,
                  p.get_alter(), p.get_wohnort(), p.get_studiengang(), p.get_semester(), p.get_profil_id())

        auswahl = mapper.find_by_key(3)
        auswahl.set_name("NeuMusler")
        mapper.update(auswahl)

        result = mapper.find_all()
        for p in result:
            print(p.get_id(), p.get_erstellungszeitpunkt(), p.get_name(), p.get_email(), p.get_google_user_id,
                  p.get_alter(), p.get_wohnort(), p.get_studiengang(), p.get_semester(), p.get_profil_id())
