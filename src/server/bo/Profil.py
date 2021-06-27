from server.bo import BusinessObject as bo


class Profil(bo.BusinessObject):
    """Realisierung der Klasse Profil"""

    def __init__(self):
        super().__init__()
        self._lernvorlieben_id = 0
        self._beschreibung = ""

    def get_lernvorlieben_id(self):
        """Auslesen der Lernvorlieben ID"""
        return self._lernvorlieben_id

    def set_lernvorlieben_id(self, lernvorlieben_id: int):
        """Setzen der Lernvorlieben ID"""
        self._lernvorlieben_id = lernvorlieben_id

    def get_beschreibung(self):
        """Auslesen der Beschreibung"""
        return self._beschreibung

    def set_beschreibung(self, beschreibung: str):
        """Setzen der Beschreibung"""
        self._beschreibung = beschreibung

    @staticmethod
    def from_dict(dictionary=dict()):
        obj = Profil()
        obj.set_id(dictionary["id"])
        obj.set_erstellungszeitpunkt(dictionary["erstellungszeitpunkt"])
        obj.set_lernvorlieben_id(dictionary["lernvorlieben_id"])
        obj.set_beschreibung(dictionary["beschreibung"])
        return obj
