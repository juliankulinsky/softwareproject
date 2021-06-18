from server.bo import Vorschlag as vo


class GruppenVorschlag(vo.Vorschlag):
    """Realisierung der Klasse GruppenVorschlag, welche von der abstrakten Klasse Vorschlag seine Grundstruktur erbt.
    Zusätzliche Attribute sind auf die vorgeschlagene Lerngruppe bezogen
    """
    def __init__(self):
        super().__init__()
        self._gruppen_id = 0        # Fremdschlüsselbeziehung zur vorgeschlagenen Gruppe
        self._entscheidung_gruppe = False  # Ob die Gruppe schon eine Entscheidung zum Vorschlag getroffen hat

    def get_gruppen_id(self):
        return self._gruppen_id

    def set_gruppen_id(self, gruppen_id: int):
        self._gruppen_id = gruppen_id

    def get_entscheidung_gruppe(self):
        return self._entscheidung_gruppe

    def set_entscheidung_gruppe(self, entscheidung_getroffen: bool):
        self._entscheidung_gruppe = entscheidung_getroffen

    def __str__(self):
        """Dunder-Method für GruppenVorschlag
        :return: String, der die Klasse beschreibt.
        """
        return "Nr.{}: Person {} und Gruppe {} mit Ähnl. {}: {} & {}".format(
            self.get_id(),self.get_person_id(),self.get_gruppen_id(),self.get_aehnlichkeit(),self.get_matchpoints(),
            self.get_entscheidung_person(),self.get_entscheidung_gruppe()
        )

    @staticmethod
    def from_dict(dictionary=dict()):
        obj = GruppenVorschlag()
        obj.set_id(dictionary["id"])
        obj.set_erstellungszeitpunkt(dictionary["erstellungszeitpunkt"])
        obj.set_person_id(dictionary["person_id"])
        obj.set_gruppen_id(dictionary["gruppen_id"])
        obj.set_aehnlichkeit(dictionary["aehnlichkeit"])
        obj.set_matchpoints(dictionary["matchpoints"])
        obj.set_entscheidung_person(dictionary["entscheidung_person"])
        obj.set_entscheidung_gruppe(dictionary["entscheidung_gruppe"])
        return obj
