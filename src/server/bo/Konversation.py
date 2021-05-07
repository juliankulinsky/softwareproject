from server.bo import BusinessObject as bo


class Konversation(bo.BusinessObject):
    """Realisierung der Konversationsklasse

    Baut auf BusinessObject auf und hat zusätzlich Teilnehmer und Nachrichten als Listen
    als Attribute. Dafür gibt es jeweils Getter und Add-Methoden
    """
    def __init__(self):
        super().__init__()
        self._teilnehmer = []    # Teilnehmerliste der Konversation
        self._nachrichten = []   # Liste der Nachrichten der Konversation

    def get_teilnehmer(self):
        """Auslesen der Teilnehmer als Liste"""
        return self._teilnehmer

    def add_teilnehmer(self, teilnehmer):
        """Einen Teilnehmer zur Konversation hinzufügen"""
        self._teilnehmer.append(teilnehmer)

    def get_nachrichten(self):
        """Auslesen der Nachrichten der Konversation"""
        return self._nachrichten

    def add_nachricht(self, nachricht):
        """Eine Nachricht zur Konversation hinzufügen"""
        self._nachrichten.append(nachricht)
