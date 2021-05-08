from server.bo import BusinessObject as bo


class GruppenTeilnahme(bo.BusinessObject):
    """Realisierung der Klasse GruppenTeilnahme zur Zuordnung von Personen zu Gruppen
    """
    def __init__(self):
        super().__init__()
        self._person_id = 0          # Fremdschlüsselbeziehung zur Person, welche an einer Lerngruppe teilnimmt
        self._gruppen_id = 0         # Fremdschlüsselbeziehung zur Lerngruppe, an welcher die Person teilnimmt
        self._ist_admin = False

    def get_person_id(self):
        return self._person_id

    def set_person_id(self, person_id: int):
        self._person_id = person_id

    def get_gruppen_id(self):
        return self._gruppen_id

    def set_gruppen_id(self, gruppen_id: int):
        self._gruppen_id = gruppen_id

    def get_ist_admin(self):
        return self._ist_admin

    def set_ist_admin(self, wert: bool):
        self._ist_admin = wert
