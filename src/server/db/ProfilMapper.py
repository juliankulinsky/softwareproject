from server.bo.Profil import Profil
from server.db.Mapper import Mapper


class ProfilMapper(Mapper):
    def __init__(self):
        super().__init__()

    def find_all(self):

        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * from profile")
        tuples = cursor.fetchall()

        for (id, erstellungszeitpunkt, lernvorlieben_id, beschreibung) in tuples:
            profile = Profil()
            profile.set_id(id)
            profile.set_erstellungszeitpunkt(erstellungszeitpunkt)
            profile.set_lernvorlieben_id(lernvorlieben_id)
            profile.set_beschreibung(beschreibung)
            result.append(profile)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_key(self, key: int):
        """Suchen eines Profils mit vorgegebener ID. Da diese eindeutig ist,
        wird genau ein Objekt zurückgegeben.

        :param key Primärschlüsselattribut (->DB)
        :return Profil-Objekt, das dem übergebenen Schlüssel entspricht, None bei
            nicht vorhandenem DB-Tupel.
        """

        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, erstellungszeitpunkt, lernvorlieben_id, beschreibung FROM profile WHERE id={}".format(
            key
        )
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, erstellungszeitpunkt, lernvorlieben_id, beschreibung) = tuples[0]
            profil = Profil()
            profil.set_id(id)
            profil.set_erstellungszeitpunkt(erstellungszeitpunkt)
            profil.set_lernvorlieben_id(lernvorlieben_id)
            profil.set_beschreibung(beschreibung)
            result = profil
        except IndexError:

            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_lernvorlieben_id(self, lernvorlieben_id: int):
        """Suchen eines Profils mit vorgegebener ID. Da diese eindeutig ist,
        wird genau ein Objekt zurückgegeben.

        :param key Primärschlüsselattribut (->DB)
        :return Profil-Objekt, das dem übergebenen Schlüssel entspricht, None bei
            nicht vorhandenem DB-Tupel.
        """

        result = None

        cursor = self._cnx.cursor()
        command = (
            "SELECT id, erstellungszeitpunkt, lernvorlieben_id, beschreibung FROM profile WHERE "
            "lernvorlieben_id={}".format(lernvorlieben_id)
        )
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, erstellungszeitpunkt, lernvorlieben_id, beschreibung) = tuples[0]
            profil = Profil()
            profil.set_id(id)
            profil.set_erstellungszeitpunkt(erstellungszeitpunkt)
            profil.set_lernvorlieben_id(lernvorlieben_id)
            profil.set_beschreibung(beschreibung)
            result = profil
        except IndexError:

            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, profil: Profil):
        """Einfügen eines Profil-Objekts in die Datenbank.

        :param profil das zu speichernde Objekt
        :return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID.
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM profile")
        tuples = cursor.fetchall()

        for maxid in tuples:
            profil.set_id(maxid[0] + 1)

        command = "INSERT INTO profile (id, erstellungszeitpunkt, lernvorlieben_id, beschreibung) VALUES (%s,%s,%s,%s)"
        data = (
            profil.get_id(),
            profil.get_erstellungszeitpunkt(),
            profil.get_lernvorlieben_id(),
            profil.get_beschreibung(),
        )
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return profil

    def update(self, profil: Profil):
        """Aktualisieren eines Objekts in der Datenbank anhand seiner ID

        :param profil das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()

        command = "UPDATE profile SET lernvorlieben_id=%s, beschreibung=%s WHERE id=%s"
        data = (
            profil.get_lernvorlieben_id(),
            profil.get_beschreibung(),
            profil.get_id(),
        )
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, profil: Profil):
        """Löschen der Daten eines User-Objekts aus der Datenbank.

        :param profil das aus der DB zu löschende "Objekt"
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM profile WHERE id={}".format(profil.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()


if __name__ == "__main__":

    with ProfilMapper() as mapper:

        # testen von insert
        print("TESTEN VON INSERT")
        new_conv = Profil()
        new_conv.set_id(999)
        new_conv.set_erstellungszeitpunkt("2022-05-11 23:42:00")

        mapper.insert(new_conv)
        print("--- BEENDET ---\n")

        # testen von find_all
        print("TESTEN VON FIND_ALL")
        result = mapper.find_all()
        for profil in result:
            print(profil.__dict__)
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
