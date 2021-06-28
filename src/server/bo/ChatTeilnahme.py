from server.bo import BusinessObject as bo


class ChatTeilnahme(bo.BusinessObject):
    """Realisierung der Klasse ChatTeilnahme zur Zuordnung von Personen zu Konversationen
    """
    def __init__(self):
        super().__init__()
        self._person_id = 0          # Fremdschlüsselbeziehung zur Person, welche an einer Konversation teilnimmt
        self._konversation_id = 0    # Fremdschlüsselbeziehung zur Konversation, an welcher die Person teilnimmt

    def get_person_id(self):
        """Auslesen der Person ID"""
        return self._person_id

    def set_person_id(self, person_id: int):
        """Setzen der PersonID"""
        self._person_id = person_id

    def get_konversation_id(self):
        """Auslesen der Konversations ID"""
        return self._konversation_id

    def set_konversation_id(self, konversation_id: int):
        """Setzen der Konversations ID """
        self._konversation_id = konversation_id

    def __str__(self):
        """Ausgeben des Objekts als String"""
        return "Nr.{}: Person {} nimmt bei Chat {} teil (seit: {})"\
            .format(self.get_id(),self.get_person_id(),self.get_konversation_id(),self.get_erstellungszeitpunkt())

    @staticmethod
    def from_dict(dictionary=dict()):
        obj = ChatTeilnahme()
        obj.set_id(dictionary["id"])
        obj.set_erstellungszeitpunkt(dictionary["erstellungszeitpunkt"])
        obj.set_person_id(dictionary["person_id"])
        obj.set_konversation_id(dictionary["konversation_id"])
        return obj
