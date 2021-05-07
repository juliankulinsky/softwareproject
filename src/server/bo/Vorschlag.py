# from server.bo import BusinessObject as bo
from server.bo import Profil


class Vorschlag("""bo.BusinessObject"""):
    """Realisieren der Klasse Vorschlag, welche den Algorithmus zum Matches generien übernimmt"""

    def __init__(self):
        super().__init__()
        self._matches = []
        self._matches_gruppen = []
        self._profile = Profil

    def zeige_matches(self):
        """Ausgeben der vorhandenen Matches für ein Profil"""
        return self._matches

    def zeige_matches_gruppen(self):
        """Ausgeben der vorgeschlagenen Lerngruppen"""
        return self._matches_gruppen

    def generiere_matches(self, profil=Profil):
        """Algo verwirklichen"""
        self._profile = profil
        # Wie realisieren?

