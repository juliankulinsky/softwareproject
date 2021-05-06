from server.bo import BusinessObject as bo
#from server.bo import Person


class Nachricht(bo.BusinessObject):
    """Realisierung der Nachrichtenklasse

    Baut auf BusinessObject auf und hat zusätzlich den Nachrichteninhalt, einen Absender
    und einen Empfänger.

    ##NOTE: nicht lieber auf eine Konversation verweisen statt Empfänger?
    """
    def __init__(self):
        super().__init__()
        self._inhalt = str          # Inhalt der Nachricht
        self._absender = int     # Absender der Nachricht
        self._empfaenger = int   # Empfänger der Nachricht

    def get_inhalt(self):
        """Auslesen des Inhalts einer Nachricht"""
        return self._inhalt

    def set_inhalt(self, inhalt: str):
        """Festlegen des Inhalts einer Nachricht"""
        self._inhalt = inhalt

    def get_absender(self):
        """Auslesen des Absenders einer Nachricht"""
        return self._absender

    def set_absender(self, absender_id: int):
        """Festlegen des Absenders einer Nachricht"""
        self._absender = absender_id

    def get_empfaenger(self):
        """Auslesen des Empfängers einer Nachricht"""
        return self._empfaenger

    def set_empfaenger(self, empfaenger_id: int):
        """Festlegen des Empfängers einer Nachricht"""
        self._empfaenger = empfaenger_id

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz

        Bestehend aus ID, Zeitpunkt, Absender, Empfänger und Inhalt"""
        return "Nachricht {}: Von {}, An {}, Inhalt: {}, Zeitpunkt: {}".format(
            self.get_id(), self.get_absender(), self.get_empfaenger(), self.get_inhalt(),
            self.get_erstellungszeitpunkt()
        )
