from server.bo import BusinessObject as bo


class Lernvorliebe(bo.BusinessObject):
    """Realisierung der Klasse Lernvorlieben, welche einem Profil zugeordnet wird."""

    def __init__(self):
        super().__init__()
        self._lerntyp = 0
        self._frequenz = 0
        self._extrovertiertheit = 0
        self._remote_praesenz = 0
        self._vorkenntnisse = ""
        self._lerninteressen = ""

    def get_lerntyp(self):
        """Auslesen des Lerntyps"""
        return self._lerntyp

    def set_lerntyp(self, wert: int):
        """Festlegen des Lerntyps"""
        self._lerntyp = wert

    def get_frequenz(self):
        """Auslesen der Lernfrequenz"""
        return self._frequenz

    def set_frequenz(self, wert: int):
        """Festlegen der Lernfrequenz"""
        self._frequenz = wert

    def get_extrovertiertheit(self):
        """Auslesen der Extrovertiertheit bzw. Persönlichkeit"""
        return self._extrovertiertheit

    def set_extrovertiertheit(self, wert: int):
        """Festlegen der Extrovertiertheit"""
        self._extrovertiertheit = wert

    def get_remote_praesenz(self):
        """Auslesen der gewünschten Lernart (ob Anwesenheit oder Remote)"""
        return self._remote_praesenz

    def set_remote_praesenz(self, wert: int):
        """Festlegen der Lernart"""
        self._remote_praesenz = wert

    def get_vorkenntnisse(self):
        """Auslesen der Vorkenntnisse"""
        return self._vorkenntnisse

    def set_vorkenntnisse(self, liste: str):
        """Festlegen der Vorkenntnisse"""
        self._vorkenntnisse = liste

    def get_lerninteressen(self):
        """Auslesen der Lerninteressen"""
        return self._lerninteressen

    def set_lerninteressen(self, liste: str):
        """Festlegen der Lerninteressen"""
        self._lerninteressen = liste

    @staticmethod
    def from_dict(dictionary=dict()):
        obj = Lernvorliebe()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_erstellungszeitpunkt(dictionary["erstellungszeitpunkt"])
        obj.set_lerntyp(dictionary["lerntyp"])
        obj.set_frequenz(dictionary["frequenz"])
        obj.set_extrovertiertheit(dictionary["extrovertiertheit"])
        obj.set_remote_praesenz(dictionary["remote_praesenz"])
        obj.set_vorkenntnisse(dictionary["vorkenntnisse"])
        obj.set_lerninteressen(dictionary["lerninteressen"])
        return obj
