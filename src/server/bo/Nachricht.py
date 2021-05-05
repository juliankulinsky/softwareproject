from server.bo import BusinessObject as bo
from server.bo import Person


class Nachricht(bo.BusinessObject):
    """Realisierung der Nachrichtenklasse

    Baut auf BusinessObject auf und hat zusätzlich den Nachrichteninhalt, einen Absender
    und einen Empfänger.

    ##NOTE: nicht lieber auf eine Konversation verweisen statt Empfänger?
    """
    def __init__(self):
        super().__init__()
        self._inhalt = str          # Inhalt der Nachricht
        self._absender = Person     # Absender der Nachricht
        self._empfaenger = Person   # Empfänger der Nachricht

    def get_inhalt(self):
        """Auslesen des Inhalts einer Nachricht"""
        return self._inhalt

    def set_inhalt(self, inhalt: str):
        """Festlegen des Inhalts einer Nachricht"""
        self._inhalt = inhalt

    def get_absender(self):
        """Auslesen des Absenders einer Nachricht"""
        return self._absender

    def set_absender(self, absender: Person):
        """Festlegen des Absenders einer Nachricht"""
        self._absender = absender

    def get_empfaenger(self):
        """Auslesen des Empfängers einer Nachricht"""
        return self._empfaenger

    def set_empfaenger(self, empfaenger: Person):
        """Festlegen des Empfängers einer Nachricht"""
        self._empfaenger = empfaenger
