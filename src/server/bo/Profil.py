from server.bo import BusinessObject as bo


class Profil(bo.BusinessObject):
    """Realisierung der Klasse Profil"""

    def __init__(self):
        super().__init__()
        self._lernvorlieben_id = 0

    def get_lernvorlieben_id(self):
        return self._lernvorlieben_id

    def set_lernvorlieben_id(self, lernvorlieben_id: int):
        self._lernvorlieben_id = lernvorlieben_id

    @staticmethod
    def from_dict(dictionary=dict()):
        obj = Profil()
        obj.set_id(dictionary["id"])
        obj.set_erstellungszeitpunkt(dictionary["erstellungszeitpunkt"])
        obj.set_lernvorlieben_id(dictionary["lernvorlieben_id"])
        return obj
