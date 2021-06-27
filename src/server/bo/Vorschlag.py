from abc import ABC, abstractmethod
from server.bo import BusinessObject as bo


class Vorschlag(bo.BusinessObject, ABC):
    """Realisierung der abstrakten Klasse Vorschlag, um die Grundstruktur für die Klassen PartnerVorschlag und
    GruppenVorschlag zu bilden. Dafür sind die Attribute person_id, aehnlichkeit und entscheidung_person mit
    jeweils Getter- und Setter-Methoden implementiert worden.
    Sie erbt von der Klasse BusinessObject die Attribute id und erstellungszeitpunkt.
    """
    def __init__(self):
        super().__init__()
        self._person_id = 0                # Fremdschlüsselbeziehung zur Person für die Vorschläge gesucht werden
        self._aehnlichkeit = 0             # durch Algorithmus ermittelte Ähnlichkeit
        self._matchpoints = 0              # Matchpoints -> 0=keine Entscheidung, 1=eine Partei entschied sich dafür, 2= beidseitige positive Entscheidung
        self._entscheidung_person = False   # Ob die Person eine Entscheidung getroffen hat

    def get_person_id(self):
        """Auslesen der Person ID"""
        return self._person_id

    def set_person_id(self, person_id: int):
        """Setzen der Person ID"""
        self._person_id = person_id

    def get_aehnlichkeit(self):
        """Auslesen der Ähnlichkeit"""
        return self._aehnlichkeit

    def set_aehnlichkeit(self, wert: float):
        """Setzen der Ähnlichkeit"""
        self._aehnlichkeit = wert

    def get_matchpoints(self):
        """Auslesen der Matchpoints"""
        return self._matchpoints

    def set_matchpoints(self, wert: int):
        """Setzen der Matchpoints"""
        self._matchpoints = wert

    def get_entscheidung_person(self):
        """Auslesen der Entscheidung der Person"""
        return self._entscheidung_person

    def set_entscheidung_person(self, entscheidung: bool):
        """Setzen der Entscheidung der Person"""
        self._entscheidung_person = entscheidung

    @staticmethod
    def from_dict(dictionary=dict()):
        obj = Vorschlag()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_erstellungszeitpunkt(dictionary["erstellungszeitpunkt"])
        obj.set_person_id(dictionary["person_id"])
        obj.set_aehnlichkeit(dictionary["aehnlichkeit"])
        obj.set_matchpoints(dictionary["matchpoints"])
        obj.set_entscheidung_person(dictionary["entscheidung_person"])
        return obj
