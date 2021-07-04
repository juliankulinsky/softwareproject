from server.bo.PartnerVorschlag import PartnerVorschlag
from server.db.Mapper import Mapper
from datetime import datetime


class PartnerVorschlagMapper(Mapper):
    """ """

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller PartnerVorschlag-Objekte aus der Datenbank

        :return: Sammlung mit PartnerVorschlag-Objekten
        """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * from partner_vorschlaege")
        tuples = cursor.fetchall()

        for (
            id,
            erstellungszeitpunkt,
            person_id,
            partner_id,
            aehnlichkeit,
            matchpoints,
            entscheidung_person,
            entscheidung_partner,
        ) in tuples:
            partner_vorschlag = PartnerVorschlag()
            partner_vorschlag.set_id(id)
            partner_vorschlag.set_erstellungszeitpunkt(erstellungszeitpunkt)
            partner_vorschlag.set_person_id(person_id)
            partner_vorschlag.set_partner_id(partner_id)
            partner_vorschlag.set_aehnlichkeit(aehnlichkeit)
            partner_vorschlag.set_matchpoints(matchpoints)
            partner_vorschlag.set_entscheidung_person(entscheidung_person)
            partner_vorschlag.set_entscheidung_partner(entscheidung_partner)
            result.append(partner_vorschlag)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_key(self, key):
        """Auslesen aller PartnerVorschlag-Objekte der zugehörigen PartnerVorschlag ID

        :param key: PartnerVorschlag ID
        :return: Sammlung mit PartnerVorschlag-Objekten, der zugehörigen PartnerVorschlag ID
        """
        result = None
        cursor = self._cnx.cursor()
        command = (
            "SELECT id, erstellungszeitpunkt, person_id, partner_id, aehnlichkeit, matchpoints, entscheidung_person,"
            "entscheidung_partner FROM partner_vorschlaege WHERE id={}".format(key)
        )
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (
                id,
                erstellungszeitpunkt,
                person_id,
                partner_id,
                aehnlichkeit,
                matchpoints,
                entscheidung_person,
                entscheidung_partner,
            ) = tuples[0]
            partner_vorschlag = PartnerVorschlag()
            partner_vorschlag.set_id(id)
            partner_vorschlag.set_erstellungszeitpunkt(erstellungszeitpunkt)
            partner_vorschlag.set_person_id(person_id)
            partner_vorschlag.set_partner_id(partner_id)
            partner_vorschlag.set_aehnlichkeit(aehnlichkeit)
            partner_vorschlag.set_matchpoints(matchpoints)
            partner_vorschlag.set_entscheidung_person(entscheidung_person)
            partner_vorschlag.set_entscheidung_partner(entscheidung_partner)
            result = partner_vorschlag
        except IndexError:
            """ """
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_eingehende_by_person_id(self, person_key):
        """Auslesen der PartnerVorschlag-Objekte der gegebenen Person ID bei dem die Entscheidung des Partners schon
                    getroffen ist, die Entscheidung der Person jedoch noch nicht

        :param person_key: Person ID
        :return: Sammlung mit PartnerVorschlag-Objekten, der gegebenen Person ID
        """
        result = []
        cursor = self._cnx.cursor()
        command = (
            "SELECT * FROM partner_vorschlaege WHERE "
            "(person_id={} AND entscheidung_person=FALSE AND entscheidung_partner=TRUE AND matchpoints=1) "
            "OR (partner_id={} AND entscheidung_person=TRUE AND entscheidung_partner=FALSE AND matchpoints=1) ".format(
                person_key, person_key
            )
        )
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (
            id,
            erstellungszeitpunkt,
            person_id,
            partner_id,
            aehnlichkeit,
            matchpoints,
            entscheidung_person,
            entscheidung_partner,
        ) in tuples:
            partner_vorschlag = PartnerVorschlag()
            partner_vorschlag.set_id(id)
            partner_vorschlag.set_erstellungszeitpunkt(erstellungszeitpunkt)
            partner_vorschlag.set_person_id(person_id)
            partner_vorschlag.set_partner_id(partner_id)
            partner_vorschlag.set_aehnlichkeit(aehnlichkeit)
            partner_vorschlag.set_matchpoints(matchpoints)
            partner_vorschlag.set_entscheidung_person(entscheidung_person)
            partner_vorschlag.set_entscheidung_partner(entscheidung_partner)
            result.append(partner_vorschlag)

        self._cnx.commit()
        cursor.close()

        return result

    def find_ausgehende_by_person_id(self, person_key):
        """Auslesen der PartnerVorschlags-Objekte der gegebenen Person ID bei dem die Entscheidung der Person schon
                   getroffen ist, die Entscheidung des Partners jedoch noch nicht

        :param person_key: Person ID
        :return: Sammlung mit PartnerVorschlag-Objekten, der gegebenen Person ID
        """
        result = []
        cursor = self._cnx.cursor()
        command = (
            "SELECT * FROM partner_vorschlaege WHERE "
            "(person_id={} AND entscheidung_person=TRUE AND entscheidung_partner=FALSE AND matchpoints=1) "
            "OR (partner_id={} AND entscheidung_person=FALSE AND entscheidung_partner=TRUE AND matchpoints=1) ".format(
                person_key, person_key
            )
        )
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (
            id,
            erstellungszeitpunkt,
            person_id,
            partner_id,
            aehnlichkeit,
            matchpoints,
            entscheidung_person,
            entscheidung_partner,
        ) in tuples:
            partner_vorschlag = PartnerVorschlag()
            partner_vorschlag.set_id(id)
            partner_vorschlag.set_erstellungszeitpunkt(erstellungszeitpunkt)
            partner_vorschlag.set_person_id(person_id)
            partner_vorschlag.set_partner_id(partner_id)
            partner_vorschlag.set_aehnlichkeit(aehnlichkeit)
            partner_vorschlag.set_matchpoints(matchpoints)
            partner_vorschlag.set_entscheidung_person(entscheidung_person)
            partner_vorschlag.set_entscheidung_partner(entscheidung_partner)
            result.append(partner_vorschlag)

        self._cnx.commit()
        cursor.close()

        return result

    def find_best_by_person_id(self, person_key):
        """Auslesen der PartnerVorschlags-Objekte der gegebenen Person ID, bei denen noch keine Entscheidung der
            Person getroffen wurde in absteigender Reihenfolge

        :param person_key: Person ID
        :return: Sammlung mit PartnerVorschlag-Objekten, der gegebenen Person ID
        """
        result = None
        cursor = self._cnx.cursor()
        command = (
            "SELECT * FROM partner_vorschlaege WHERE (person_id={} AND entscheidung_person is FALSE) "
            "OR (partner_id={} AND entscheidung_partner is FALSE) ORDER BY aehnlichkeit DESC ".format(
                person_key, person_key
            )
        )
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (
                id,
                erstellungszeitpunkt,
                person_id,
                partner_id,
                aehnlichkeit,
                matchpoints,
                entscheidung_person,
                entscheidung_partner,
            ) = tuples[0]
            partner_vorschlag = PartnerVorschlag()
            partner_vorschlag.set_id(id)
            partner_vorschlag.set_erstellungszeitpunkt(erstellungszeitpunkt)
            partner_vorschlag.set_person_id(person_id)
            partner_vorschlag.set_partner_id(partner_id)
            partner_vorschlag.set_aehnlichkeit(aehnlichkeit)
            partner_vorschlag.set_matchpoints(matchpoints)
            partner_vorschlag.set_entscheidung_person(entscheidung_person)
            partner_vorschlag.set_entscheidung_partner(entscheidung_partner)
            result = partner_vorschlag
        except IndexError:
            """ """
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_all_offene_for_person_id(self, person_key):
        """Auslesen aller PartnerVorschlags-Objekte der gegebenen Person ID, bei denen noch keine Entscheidung der
                    Person getroffen

        :param person_key: Person ID
        :return: Sammlung mit PartnerVorschlag-Objekten, der gegebenen Person ID
        """
        result = []
        cursor = self._cnx.cursor()
        command = (
            "SELECT * FROM partner_vorschlaege WHERE (person_id={} AND entscheidung_person is FALSE) "
            "OR (partner_id={} AND entscheidung_partner is FALSE)".format(
                person_key, person_key
            )
        )
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (
            id,
            erstellungszeitpunkt,
            person_id,
            partner_id,
            aehnlichkeit,
            matchpoints,
            entscheidung_person,
            entscheidung_partner,
        ) in tuples:
            partner_vorschlag = PartnerVorschlag()
            partner_vorschlag.set_id(id)
            partner_vorschlag.set_erstellungszeitpunkt(erstellungszeitpunkt)
            partner_vorschlag.set_person_id(person_id)
            partner_vorschlag.set_partner_id(partner_id)
            partner_vorschlag.set_aehnlichkeit(aehnlichkeit)
            partner_vorschlag.set_matchpoints(matchpoints)
            partner_vorschlag.set_entscheidung_person(entscheidung_person)
            partner_vorschlag.set_entscheidung_partner(entscheidung_partner)
            result.append(partner_vorschlag)

        self._cnx.commit()
        cursor.close()

        return result

    def find_all_for_person_id(self, person_key):
        """Auslesen aller PartnerVorschlags-Objekte der gegebenen Person ID

        :param person_key: Person ID
        :return: Sammlung mit PartnerVorschlags-Objekten, der gegebenen Person ID
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM partner_vorschlaege WHERE person_id={} OR partner_id={}".format(
            person_key, person_key
        )
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (
            id,
            erstellungszeitpunkt,
            person_id,
            partner_id,
            aehnlichkeit,
            matchpoints,
            entscheidung_person,
            entscheidung_partner,
        ) in tuples:
            partner_vorschlag = PartnerVorschlag()
            partner_vorschlag.set_id(id)
            partner_vorschlag.set_erstellungszeitpunkt(erstellungszeitpunkt)
            partner_vorschlag.set_person_id(person_id)
            partner_vorschlag.set_partner_id(partner_id)
            partner_vorschlag.set_aehnlichkeit(aehnlichkeit)
            partner_vorschlag.set_matchpoints(matchpoints)
            partner_vorschlag.set_entscheidung_person(entscheidung_person)
            partner_vorschlag.set_entscheidung_partner(entscheidung_partner)
            result.append(partner_vorschlag)

        self._cnx.commit()
        cursor.close()

        return result

    def find_all_anfragen(self):
        """Auslesen aller PartnerVorschlag-Objekte aus der Datenbank, welche als Anfragen gezählt werden,
        also die eine einseitige, positive Entscheidung haben, aber noch nicht angenommen oder abgelehnt wurden

        :return:
        """
        """ Auslesen aller GruppenVorschlags-Objekte, deren Matchpoints auf 1 gesetzt ist, entweder durch eine
                    Entscheidung seitens der Gruppe, oder der Person, jedoch nicht beiderseits

        :return: Sammlung mit GruppenVorschlags-Objekten
        """
        result = []
        cursor = self._cnx.cursor()
        command = (
            "SELECT * FROM partner_vorschlaege WHERE matchpoints=1 AND "
            "((entscheidung_person=TRUE AND entscheidung_partner=FALSE) "
            "OR (entscheidung_partner=TRUE AND entscheidung_person=FALSE)) "
        )
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (
            id,
            erstellungszeitpunkt,
            person_id,
            partner_id,
            aehnlichkeit,
            matchpoints,
            entscheidung_person,
            entscheidung_partner,
        ) in tuples:
            partner_vorschlag = PartnerVorschlag()
            partner_vorschlag.set_id(id)
            partner_vorschlag.set_erstellungszeitpunkt(erstellungszeitpunkt)
            partner_vorschlag.set_person_id(person_id)
            partner_vorschlag.set_partner_id(partner_id)
            partner_vorschlag.set_aehnlichkeit(aehnlichkeit)
            partner_vorschlag.set_matchpoints(matchpoints)
            partner_vorschlag.set_entscheidung_person(entscheidung_person)
            partner_vorschlag.set_entscheidung_partner(entscheidung_partner)
            result.append(partner_vorschlag)

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, partner_vorschlag: PartnerVorschlag):
        """Einfügen eines PartnerVorschlags-Objekts in die Datenbank.

        Der Primärschlüssel wird dabei überprüft und ggf. berechtigt.

        :param: partner_vorschlag : Das zu speichernde PartnerVorschlags-Objekt
        :return: Das bereits übergebene PartnerVorschlags-Objekt, jedoch mit ggf, korrigierter ID.
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM partner_vorschlaege")
        tuples = cursor.fetchall()

        for maxid in tuples:
            if maxid[0] is not None:
                partner_vorschlag.set_id(maxid[0] + 1)
            else:
                partner_vorschlag.set_id(1)

        command = (
            "INSERT INTO partner_vorschlaege (id, erstellungszeitpunkt, person_id, partner_id, "
            "aehnlichkeit, matchpoints, entscheidung_person, entscheidung_partner) "
            "VALUES (%s,%s,%s,%s,%s,%s,%s,%s)"
        )
        data = (
            partner_vorschlag.get_id(),
            partner_vorschlag.get_erstellungszeitpunkt(),
            partner_vorschlag.get_person_id(),
            partner_vorschlag.get_partner_id(),
            partner_vorschlag.get_aehnlichkeit(),
            partner_vorschlag.get_matchpoints(),
            partner_vorschlag.get_entscheidung_person(),
            partner_vorschlag.get_entscheidung_partner(),
        )
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return partner_vorschlag

    def update(self, partner_vorschlag: PartnerVorschlag):
        """Aktualisieren eines PartnerVorschlags-Objekts in der Datenbank anhand seiner ID

        :param partner_vorschlag: Das PartnerVorschlags-Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()

        command = (
            "UPDATE partner_vorschlaege SET erstellungszeitpunkt=%s, person_id=%s, partner_id=%s, "
            "aehnlichkeit=%s, matchpoints=%s, entscheidung_person=%s, entscheidung_partner=%s WHERE id=%s"
        )
        data = (
            datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            partner_vorschlag.get_person_id(),
            partner_vorschlag.get_partner_id(),
            partner_vorschlag.get_aehnlichkeit(),
            partner_vorschlag.get_matchpoints(),
            partner_vorschlag.get_entscheidung_person(),
            partner_vorschlag.get_entscheidung_partner(),
            partner_vorschlag.get_id(),
        )
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, partner_vorschlag: PartnerVorschlag):
        """Löschen der Daten eines PartnerVorschlags-Objekts aus der Datenbank.

        :param partner_vorschlag: Das aus der Datenbank zu löschende PartnerVorschlags-Objekt
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM partner_vorschlaege WHERE id={}".format(
            partner_vorschlag.get_id()
        )
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()


"""Testbereich, ob die Klasse funktioniert"""

if __name__ == "__main__":
    with PartnerVorschlagMapper() as mapper:
        result = mapper.find_all()
        print("los")
        for p in result:
            print(p)

        neu = PartnerVorschlag()
        neu.set_aehnlichkeit(100)
        mapper.insert(neu)

        weg = mapper.find_by_key(2)
        mapper.delete(weg)
        result = mapper.find_all()
        print("los")
        for p in result:
            print(p)
