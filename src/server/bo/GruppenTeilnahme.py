from server.bo import BusinessObject as bo


class GruppenTeilnahme(bo.BusinessObject):
    """Realisierung der Klasse GruppenTeilnahme zur Zuordnung von Personen zu Gruppen"""

    def __init__(self):
        super().__init__()
        self._person_id = 0  # Fremdschlüsselbeziehung zur Person, welche an einer Lerngruppe teilnimmt
        self._gruppen_id = (
            0  # Fremdschlüsselbeziehung zur Lerngruppe, an welcher die Person teilnimmt
        )
        self._ist_admin = False

    def get_person_id(self):
        """Auslesen der Person ID"""
        return self._person_id

    def set_person_id(self, person_id: int):
        """Setzen der Person ID"""
        self._person_id = person_id

    def get_gruppen_id(self):
        """Auslesen der Gruppen ID"""
        return self._gruppen_id

    def set_gruppen_id(self, gruppen_id: int):
        """Setzen der Gruppen ID"""
        self._gruppen_id = gruppen_id

    def get_ist_admin(self):
        """Auslesen des boolschen Wertes, ob eine Person der Admin einer Gruppe ist"""
        return self._ist_admin

    def set_ist_admin(self, wert: bool):
        """Setzen des boolschen Wertes, ob eine Person der Admin einer Gruppe ist"""
        self._ist_admin = wert

    @staticmethod
    def from_dict(dictionary=dict()):
        obj = GruppenTeilnahme()
        obj.set_id(dictionary["id"])
        obj.set_erstellungszeitpunkt(dictionary["erstellungszeitpunkt"])
        obj.set_person_id(dictionary["person_id"])
        obj.set_gruppen_id(dictionary["gruppen_id"])
        obj.set_ist_admin(dictionary["ist_admin"])
        return obj
