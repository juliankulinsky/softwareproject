from server.bo.PartnerVorschlag import PartnerVorschlag
from server.db.Mapper import Mapper


class PartnerVorschlagMapper (Mapper):
    """

    """
    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller PartnerVorschlag-Objekte aus der Datenbank

        :return:
        """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * from partner_vorschlaege")
        tuples = cursor.fetchall()

        for (id, erstellungszeitpunkt, person_id, partner_id, aehnlichkeit, matchpoints, entscheidung_person,
             entscheidung_partner) in tuples:
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
        """

        :param key:
        :return:
        """
        result = None
        cursor = self._cnx.cursor()
        command = "SELECT id, erstellungszeitpunkt, person_id, partner_id, aehnlichkeit, matchpoints, entscheidung_person," \
                  "entscheidung_partner FROM partner_vorschlaege WHERE id={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, erstellungszeitpunkt, person_id, partner_id, aehnlichkeit, matchpoints, entscheidung_person,
             entscheidung_partner) = tuples[0]
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
            """"""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_eingehende_by_person_id(self, person_key):
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM partner_vorschlaege WHERE " \
                  "(person_id={} AND entscheidung_person=FALSE AND entscheidung_partner=TRUE AND matchpoints=1) " \
                  "OR (partner_id={} AND entscheidung_person=TRUE AND entscheidung_partner=FALSE AND matchpoints=1) "\
            .format(person_key,person_key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, erstellungszeitpunkt, person_id, partner_id, aehnlichkeit, matchpoints, entscheidung_person,
             entscheidung_partner) in tuples:
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
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM partner_vorschlaege WHERE " \
                  "(person_id={} AND entscheidung_person=TRUE AND entscheidung_partner=FALSE AND matchpoints=1) " \
                  "OR (partner_id={} AND entscheidung_person=FALSE AND entscheidung_partner=TRUE AND matchpoints=1) "\
            .format(person_key,person_key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, erstellungszeitpunkt, person_id, partner_id, aehnlichkeit, matchpoints, entscheidung_person,
             entscheidung_partner) in tuples:
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
        """

        :param person_key:
        :return:
        """
        result = None
        cursor = self._cnx.cursor()
        command = "SELECT * FROM partner_vorschlaege WHERE (person_id={} AND entscheidung_person is FALSE) " \
                  "OR (partner_id={} AND entscheidung_partner is FALSE) ORDER BY aehnlichkeit DESC "\
            .format(person_key, person_key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, erstellungszeitpunkt, person_id, partner_id, aehnlichkeit, matchpoints, entscheidung_person,
             entscheidung_partner) = tuples[0]
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
            """"""
            result = None

        self._cnx.commit()
        cursor.close()

        print(result)

        return result

    def insert(self, partner_vorschlag: PartnerVorschlag):
        """

        :param partner_vorschlag:
        :return:
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM partner_vorschlaege")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            partner_vorschlag.set_id(maxid[0]+1)

        command = "INSERT INTO partner_vorschlaege (id, erstellungszeitpunkt, person_id, partner_id, " \
                  "aehnlichkeit, matchpoints, entscheidung_person, entscheidung_partner) " \
                  "VALUES (%s,%s,%s,%s,%s,%s,%s,%s)"
        data = (
            partner_vorschlag.get_id(),
            partner_vorschlag.get_erstellungszeitpunkt(),
            partner_vorschlag.get_person_id(),
            partner_vorschlag.get_partner_id(),
            partner_vorschlag.get_aehnlichkeit(),
            partner_vorschlag.get_matchpoints(),
            partner_vorschlag.get_entscheidung_person(),
            partner_vorschlag.get_entscheidung_partner()
        )
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return partner_vorschlag

    def update(self, partner_vorschlag: PartnerVorschlag):
        """

        :param partner_vorschlag:
        :return:
        """
        cursor = self._cnx.cursor()

        command = "UPDATE partner_vorschlaege SET person_id=%s, partner_id=%s, " \
                  "aehnlichkeit=%s, matchpoints=%s, entscheidung_person=%s, entscheidung_partner=%s WHERE id=%s"
        data = (
            partner_vorschlag.get_person_id(),
            partner_vorschlag.get_partner_id(),
            partner_vorschlag.get_aehnlichkeit(),
            partner_vorschlag.get_matchpoints(),
            partner_vorschlag.get_entscheidung_person(),
            partner_vorschlag.get_entscheidung_partner(),
            partner_vorschlag.get_id()
        )
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, partner_vorschlag: PartnerVorschlag):
        """

        :param partner_vorschlag:
        :return:
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM partner_vorschlaege WHERE id={}".format(partner_vorschlag.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()


"""Testbereich, ob die Klasse funktioniert"""

if (__name__ == "__main__"):
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
