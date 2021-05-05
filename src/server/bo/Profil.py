# from server.bo import BusinessObject as bo
from server.bo import Lernvorliebe
from server.bo import Person


class Profil("""bo.BusinessObject"""):
    """Realisieren der Klasse Profil"""

    def __init__(self):
        super().__init__()
        self.lvl = Lernvorliebe
        self.user = Person

# Wie realisieren wir das?
    def erstelle_profil(self, lernvorlieben: Lernvorliebe, person: Person):
        """Erstellen des Profils"""
        pass
