from server.bo import BusinessObject as bo


class Lerngruppe(bo.BusinessObject):
    """Realisierung der Lerngruppenklasse

    Baut auf BusinessObject auf und hat zusätzlich
    """

    def __init__(self):
        super().__init__()
        self._gruppenname = ""  # Name der Lerngruppe als String
        self._profil_id = 0  # Fremdschlüsselbeziehung zum zur Gruppe gehörenden Profil
        self._konversation_id = (
            0  # Fremdschlüsselbeziehung zur zur Gruppe gehörenden Konversation
        )

    def get_gruppenname(self):
        """Auslesen des Gruppennamens"""
        return self._gruppenname

    def set_gruppenname(self, gruppenname: str):
        """Setzen des Gruppennamens"""
        self._gruppenname = gruppenname

    def get_profil_id(self):
        """Auslesen der Profil ID"""
        return self._profil_id

    def set_profil_id(self, profil_id: int):
        """Setzen der Profil ID"""
        self._profil_id = profil_id

    def get_konversation_id(self):
        """Auslesen der Konversations ID"""
        return self._konversation_id

    def set_konversation_id(self, konversation_id: int):
        """Setzen der Konversations ID"""
        self._konversation_id = konversation_id

    @staticmethod
    def from_dict(dictionary=dict()):
        obj = Lerngruppe()
        obj.set_id(dictionary["id"])
        obj.set_erstellungszeitpunkt(dictionary["erstellungszeitpunkt"])
        obj.set_gruppenname(dictionary["gruppenname"])
        obj.set_profil_id(dictionary["profil_id"])
        obj.set_konversation_id(dictionary["konversation_id"])
        return obj
