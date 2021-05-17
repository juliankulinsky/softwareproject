from server.bo import BusinessObject as bo


class Nachricht(bo.BusinessObject):
    """Realisierung der Nachrichtenklasse

    Baut auf BusinessObject auf und hat zusätzlich den Nachrichteninhalt, eine Absender_ID
    und eine Konversation_ID, an welche die Nachricht gerichtet ist.
    """
    def __init__(self):
        super().__init__()
        self._inhalt = ""           # Inhalt der Nachricht
        self._absender_id = 0       # Fremdschlüsselbeziehung zur Absender-Person der Nachricht
        self._konversation_id = 0   # Fremdschlüsselbeziehung zur Konversation, an die die Nachricht geht

    """Im Folgenden sind alle Getter- & Setter-Methoden sämtlicher Attribute"""

    def get_inhalt(self):
        """Auslesen des Inhalts einer Nachricht"""
        return self._inhalt

    def set_inhalt(self, inhalt: str):
        """Festlegen des Inhalts einer Nachricht"""
        self._inhalt = inhalt

    def get_absender_id(self):
        """Auslesen der Absender_ID einer Nachricht"""
        return self._absender_id

    def set_absender_id(self, absender_id: int):
        """Festlegen der Absender_ID einer Nachricht"""
        self._absender_id = absender_id

    def get_konversation_id(self):
        """Auslesen der Konversation_ID einer Nachricht"""
        return self._konversation_id

    def set_konversation_id(self, konversation_id: int):
        """Festlegen der Konversation_ID einer Nachricht"""
        self._konversation_id = konversation_id

    """Im Folgenden werden weitere Funktionen definiert"""

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz

        Bestehend aus ID, Zeitpunkt, Absender_ID, Konversation_ID und Inhalt"""
        return "Nachricht {}: Von {}, An {}, Inhalt: {}, Zeitpunkt: {}".format(
            self.get_id(), self.get_absender_id(), self.get_konversation_id(), self.get_inhalt(),
            self.get_erstellungszeitpunkt()
        )

    @staticmethod
    def from_dict(dictionary=dict()):
        obj = Nachricht()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_erstellungszeitpunkt(dictionary["erstellungszeitpunkt"])
        obj.set_inhalt(dictionary["inhalt"])
        obj.set_konversation_id(dictionary["konversation_id"])
        obj.set_absender_id(dictionary["absender_id"])
        return obj