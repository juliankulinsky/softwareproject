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

        for (id, erstellungszeitpunkt, lernvorlieben_id) in tuples:
            profile = Profil()
            profile.set_id(id)
            profile.set_erstellungszeitpunkt(erstellungszeitpunkt)
            profile.set_lernvorlieben_id(lernvorlieben_id)
            result.append(profile)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_key(self, key):
        """Suchen eines Profils mit vorgegebener ID. Da diese eindeutig ist,
        wird genau ein Objekt zurückgegeben.

        :param key Primärschlüsselattribut (->DB)
        :return Profil-Objekt, das dem übergebenen Schlüssel entspricht, None bei
            nicht vorhandenem DB-Tupel.
        """

        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, erstellungszeitpunkt, lernvorlieben_id FROM profile WHERE id={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, erstellungszeitpunkt, lernvorlieben_id) = tuples[0]
            profile = Profil()
            profile.set_id(id)
            profile.set_erstellungszeitpunkt(erstellungszeitpunkt)
            profile.set_lernvorlieben_id(lernvorlieben_id)
            result = profile
        except IndexError:

            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, profile):
        """Einfügen eines Profil-Objekts in die Datenbank.



        :param Profil das zu speichernde Objekt
        :return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID.
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM profile ")
        tuples = cursor.fetchall()

        for maxid in tuples:
            profile.set_id(maxid[0] + 1)

        command = "INSERT INTO profile (id, erstellungszeitpunkt, lernvorlieben_id) VALUES (%s,%s,%s)"
        data = (

            profile.get_id(),
            profile.get_erstellungszeitpunkt(),
            profile.get_lernvorlieben_id()
        )
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return profile

    def update(self, profile):
        """Aktualisieren eines Objekts in der Datenbank anhand seiner ID

        :param profile das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()

        command = "UPDATE profile" + "SET erstellungszeitpunkt=%s WHERE id=%s"
        data = (
            profile.get_lernvorlieben_id(),
            profile.get_erstellungszeitpunkt(),
            profile.get_id()
        )
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, profile):
        """Löschen der Daten eines User-Objekts aus der Datenbank.

        :param profil das aus der DB zu löschende "Objekt"
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM profile WHERE id={}".format(profile.get_id())
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

        #testen von find_all
        print("TESTEN VON FIND_ALL")
        result = mapper.find_all()
        for profile in result:
            print(profile.__dict__)
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
