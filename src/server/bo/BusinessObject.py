from abc import ABC, abstractmethod
from datetime import datetime


class BusinessObject(ABC):
    """Gemeinsame Basisklasse aller in diesem Projekt für die Umsetzung des Fachkonzepts relevanten Klassen.

    Zentrales Merkmal ist, dass jedes BusinessObject eine Nummer besitzt, die man in
    einer relationalen Datenbank auch als Primärschlüssel bezeichnen würde.
    """
    def __init__(self):
        self._id = 0   # Die eindeutige Identifikationsnummer einer Instanz dieser Klasse.
        self._erstellungszeitpunkt = datetime.now()   # Das aktuelle Datum mit Uhrzeit

    def get_id(self):
        """Auslesen der ID."""
        return self._id

    def set_id(self,value):
        """Setzen der ID."""
        self._id = value

    def get_erstellungszeitpunkt(self):
        """Auslesen des Erstellungszeitpunkts"""
        return self._erstellungszeitpunkt
