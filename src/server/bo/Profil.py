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
