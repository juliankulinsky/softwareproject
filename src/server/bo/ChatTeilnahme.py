from server.bo import BusinessObject as bo


class ChatTeilnahme(bo.BusinessObject):
    """Realisierung der Klasse ChatTeilnahme zur Zuordnung von Personen zu Konversationen
    """
    def __init__(self):
        super().__init__()
        self._person_id = 0          # Fremdschlüsselbeziehung zur Person, welche an einer Konversation teilnimmt
        self._konversation_id = 0    # Fremdschlüsselbeziehung zur Konversation, an welcher die Person teilnimmt

    def get_person_id(self):
        return self._person_id

    def set_person_id(self, person_id: int):
        self._person_id = person_id

    def get_konversation_id(self):
        return self._konversation_id

    def set_konversation_id(self, konversation_id: int):
        self._konversation_id = konversation_id
