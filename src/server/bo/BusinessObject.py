from abc import ABC, abstractmethod
from datetime import datetime


class BusinessObject(ABC):
    """Gemeinsame Basisklasse aller in diesem Projekt relevanten Klassen.

    Jedes BusinessObject hat eine Id, welche in der Datenbank als Primärschlüssel dient.
    Zusätzlich hat jedes ein Erstellungszeitpunkt.
    """
    def __init__(self):
        self._id = 0   # Die eindeutige Identifikationsnummer einer Instanz dieser Klasse.
        self._erstellungszeitpunkt = datetime.now().strftime("%Y-%m-%d %H:%M:%S")   # Das aktuelle Datum mit Uhrzeit

    def get_id(self):
        """Auslesen der ID"""
        return self._id

    def set_id(self, value):
        """Setzen der ID"""
        self._id = value

    def get_erstellungszeitpunkt(self):
        """Auslesen des Erstellungszeitpunkts"""
        return self._erstellungszeitpunkt

    def set_erstellungszeitpunkt(self, zeitpunkt: str):
        """Setzen des Erstellungszeitpunkts"""
        self._erstellungszeitpunkt = zeitpunkt
