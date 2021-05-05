from server.bo import BusinessObject as bo
from server.bo import Konversation
from server.bo import Profil
from server.bo import Lernvorliebe



class Lerngruppe(bo.BusinessObject):
    """Realisierung der Lerngruppenklasse

    Baut auf BusinessObject auf und hat zusätzlich
    """
    def __init__(self):
        super().__init__()
        self._name = str                      # Name der Lerngruppe als String
        self._teilnehmer = list               # Teilnehmerliste der Lerngruppe
        self._profil = Profil                 # Profil der Lerngruppe
        self._lernvorlieben = Lernvorliebe    # Lernvorlieben der Lerngruppe
        self._chat = Konversation             # Zur Lerngruppe zugehörige Konversation

    def get_teilnehmer(self):
        """Auslesen der Teilnehmer als Liste"""
        return self._teilnehmer

    def set_teilnehmer(self, teilnehmer: list):
        """Teilnehmer einer Lerngruppe festlegen in einer Liste"""
        self._teilnehmer = teilnehmer

    def add_teilnehmer(self, teilnehmer: list):
        """Eine Liste an Teilnehmern zu der Lerngruppe hinzufügen"""
        self._teilnehmer += teilnehmer

    def delete_teilnehmer(self, teilnehmer: list):
        """Eine Liste an Teilnehmern aus einer Lerngruppe entfernen"""
        for name in teilnehmer:
            self._teilnehmer.remove(name)

    def gruppe_verwalten(self, lernvorliebe: Lernvorliebe, profil: Profil):
        """Die Lernvorlieben und das Profil der Lerngruppe aktualisieren"""
        self._lernvorlieben = lernvorliebe
        self._profil = profil

    def create_chat(self, chat: Konversation):
        """Erstellen einer Konversation zur Lengruppe"""
        self._chat = chat

