from server.bo import BusinessObject as bo


class Lerngruppe(bo.BusinessObject):
    """Realisierung der Lerngruppenklasse

    Baut auf BusinessObject auf und hat zusätzlich
    """
    def __init__(self):
        super().__init__()
        self._gruppenname = ""          # Name der Lerngruppe als String
        self._profil_id = 0             # Fremdschlüsselbeziehung zum zur Gruppe gehörenden Profil
        self._konversation_id = 0       # Fremdschlüsselbeziehung zur zur Gruppe gehörenden Konversation

    def get_gruppenname(self):
        return self._gruppenname

    def set_gruppenname(self, gruppenname: str):
        self._gruppenname = gruppenname

    def get_profil_id(self):
        return self._profil_id

    def set_profil_id(self, profil_id: int):
        self._profil_id = profil_id

    def get_konversation_id(self):
        return self._konversation_id

    def set_konversation_id(self, konversation_id: int):
        self._konversation_id = konversation_id
