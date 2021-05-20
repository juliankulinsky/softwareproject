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

        for (id, erstellungszeitpunkt, person_id, partnervorschlag_id, aehnlichkeit, entscheidung_person,
             entscheidung_partner) in tuples:
            partner_vorschlag = PartnerVorschlag()
            partner_vorschlag.set_id(id)
            partner_vorschlag.set_erstellungszeitpunkt(erstellungszeitpunkt)
            partner_vorschlag.set_person_id(person_id)
            partner_vorschlag.set_partnervorschlag_id(partnervorschlag_id)
            partner_vorschlag.set_aehnlichkeit(aehnlichkeit)
            partner_vorschlag.set_entscheidung_person(entscheidung_person)
            partner_vorschlag.set_entscheidung_partner(entscheidung_partner)
            result.append(partner_vorschlag)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_key(self, key: int):
        """

        :param key:
        :return:
        """
        result = None
        cursor = self._cnx.cursor()
        command = "SELECT id, erstellungszeitpunkt, person_id, partnervorschlag_id, aehnlichkeit, entscheidung_person," \
                  "entscheidung_partner FROM partner_vorschlaege WHERE id={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, erstellungszeitpunkt, person_id, partnervorschlag_id, aehnlichkeit, entscheidung_person,
             entscheidung_partner) = tuples[0]
            partner_vorschlag = PartnerVorschlag()
            partner_vorschlag.set_id(id)
            partner_vorschlag.set_erstellungszeitpunkt(erstellungszeitpunkt)
            partner_vorschlag.set_person_id(person_id)
            partner_vorschlag.set_partnervorschlag_id(partnervorschlag_id)
            partner_vorschlag.set_aehnlichkeit(aehnlichkeit)
            partner_vorschlag.set_entscheidung_person(entscheidung_person)
            partner_vorschlag.set_entscheidung_partner(entscheidung_partner)
            result = partner_vorschlag
        except IndexError:
            """"""
            result = None

        self._cnx.commit()
        cursor.close()

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

        command = "INSERT INTO partner_vorschlaege (id, erstellungszeitpunkt, person_id, partnervorschlag_id, " \
                  "aehnlichkeit, entscheidung_person, entscheidung_partner) " \
                  "VALUES (%s,%s,%s,%s,%s,%s,%s)"
        data = (
            partner_vorschlag.get_id(),
            partner_vorschlag.get_erstellungszeitpunkt(),
            partner_vorschlag.get_person_id(),
            partner_vorschlag.get_partnervorschlag_id(),
            partner_vorschlag.get_aehnlichkeit(),
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

        command = "UPDATE partner_vorschlaege SET person_id=%s, partnervorschlag_id=%s, " \
                  "aehnlichkeit=%s, entscheidung_person=%s, entscheidung_partner=%s"
        data = (
            partner_vorschlag.get_person_id(),
            partner_vorschlag.get_partnervorschlag_id(),
            partner_vorschlag.get_aehnlichkeit(),
            partner_vorschlag.get_entscheidung_person(),
            partner_vorschlag.get_entscheidung_partner()
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
