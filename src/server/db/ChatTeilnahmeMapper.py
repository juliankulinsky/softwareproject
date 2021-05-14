from server.bo.ChatTeilnahme import ChatTeilnahme
from server.db.Mapper import Mapper


class ChatTeilnahmeMapper (Mapper):
    """

    """
    def __init__(self):
        super().__init__()

    def find_all(self):
        """

        :return:
        """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * from chat_teilnahmen")
        tuples = cursor.fetchall()

        for (id, erstellungszeitpunkt, person_id, konversation_id) in tuples:
            chat_teilnahme = ChatTeilnahme()
            chat_teilnahme.set_id(id)
            chat_teilnahme.set_erstellungszeitpunkt(erstellungszeitpunkt)
            chat_teilnahme.set_person_id(person_id)
            chat_teilnahme.set_konversation_id(konversation_id)
            result.append(chat_teilnahme)

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
        command = "SELECT id, erstellungszeitpunkt, person_id, konversation_id FROM chat_teilnahmen WHERE id={}"\
            .format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, erstellungszeitpunkt, person_id, konversation_id) = tuples[0]
            chat_teilnahme = ChatTeilnahme()
            chat_teilnahme.set_id(id)
            chat_teilnahme.set_erstellungszeitpunkt(erstellungszeitpunkt)
            chat_teilnahme.set_person_id(person_id)
            chat_teilnahme.set_konversation_id(konversation_id)
            result = chat_teilnahme
        except IndexError:
            """
            """
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, chat_teilnahme: ChatTeilnahme):
        """

        :param chat_teilnahme:
        :return:
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM chat_teilnahmen")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            chat_teilnahme.set_id(maxid[0]+1)

        command = "INSERT INTO chat_teilnahmen (id, erstellungszeitpunkt, person_id, konversation_id) " \
                  "VALUES (%s,%s,%s,%s)"
        data = (chat_teilnahme.get_id(), chat_teilnahme.get_erstellungszeitpunkt(), chat_teilnahme.get_person_id(),
                chat_teilnahme.get_konversation_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return chat_teilnahme

    def update(self, chat_teilnahme: ChatTeilnahme):
        """

        :param chat_teilnahme:
        :return:
        """
        cursor = self._cnx.cursor()

        command = "UPDATE chat_teilnahmen SET erstellungszeitpunkt=%s, person_id=%s, konversation_id=%s WHERE id=%s"
        data = (chat_teilnahme.get_erstellungszeitpunkt(), chat_teilnahme.get_person_id(),
                chat_teilnahme.get_konversation_id(),chat_teilnahme.get_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, chat_teilnahme: ChatTeilnahme):
        """

        :param chat_teilnahme:
        :return:
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM chat_teilnahmen WHERE id={}".format(chat_teilnahme.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()


"""Testbereich, ob die Klasse funktioniert"""

if (__name__ == "__main__"):
    with ChatTeilnahmeMapper() as mapper:
        print("--TESTING FIND_ALL")
        result = mapper.find_all()
        for p in result:
            print(p)
        print("--BEENDET")

        print("--TESTING DELETE")
        weg = mapper.find_by_key(1)
        mapper.delete(weg)

        result = mapper.find_all()
        for p in result:
            print(p)
        print("--BEENDET")

        print("--TESTING INSERT")
        neu = ChatTeilnahme()
        neu.set_person_id(4)
        neu.set_konversation_id(5)
        mapper.insert(neu)

        result = mapper.find_all()
        for p in result:
            print(p)
        print("--BEENDET")

        print("--TESTING UPDATE")
        aktualisiert = mapper.find_by_key(2)
        aktualisiert.set_konversation_id(99)
        mapper.update(aktualisiert)

        result = mapper.find_all()
        for p in result:
            print(p)
        print("--BEENDET")
