from server.bo.Lernvorliebe import Lernvorliebe
from server.db.Mapper import Mapper


class LernvorliebeMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * FROM lernvorlieben")
        tuples = cursor.fetchall()

        for (id, erstellungszeitpunkt, lerntyp, frequenz, extrovertiertheit, remote_praesenz, vorkenntsnisse, lerninteressen) in tuples:
            lernvorliebe = Lernvorliebe()
            lernvorliebe.set_id(id)
            lernvorliebe.set_erstellungszeitpunkt(erstellungszeitpunkt)
            lernvorliebe.set_lerntyp(lerntyp)
            lernvorliebe.set_frequenz(frequenz)
            lernvorliebe.set_extrovertiertheit(extrovertiertheit)
            lernvorliebe.set_remote_praesenz(remote_praesenz)
            lernvorliebe.set_vorkenntnisse(vorkenntsnisse)
            lernvorliebe.set_lerninteressen(lerninteressen)
            result.append(lernvorliebe)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_key(self, key):
        result = None
        cursor = self._cnx.cursor()
        command = "SELECT id, erstellungszeitpunkt, lerntyp, frequenz, extrovertiertheit, remote_praesenz," \
                  "vorkenntnisse, lerninteressen FROM lernvorliebe WHERE id={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, erstellungszeitpunkt, lerntyp, frequenz, extrovertiertheit, remote_praesenz, vorkenntsnisse,
             lerninteressen) = tuples[0]
            lernvorliebe = Lernvorliebe()
            lernvorliebe.set_id(id)
            lernvorliebe.set_erstellungszeitpunkt(erstellungszeitpunkt)
            lernvorliebe.set_lerntyp(lerntyp)
            lernvorliebe.set_frequenz(frequenz)
            lernvorliebe.set_extrovertiertheit(extrovertiertheit)
            lernvorliebe.set_remote_praesenz(remote_praesenz)
            lernvorliebe.set_vorkenntnisse(vorkenntsnisse)
            lernvorliebe.set_lerninteressen(lerninteressen)
            result = lernvorliebe
        except IndexError:
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, object):
        pass

    def update(self, object):
        pass

    def delete(self, object):
        pass





