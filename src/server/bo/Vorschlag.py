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
        self._entscheidung_person = None   # Entscheidung der Person über den ggf. vorgeschlagenen Partner/Gruppe

    def get_person_id(self):
        return self._person_id

    def set_person_id(self, person_id: int):
        self._person_id = person_id

    def get_aehnlichkeit(self):
        return self._aehnlichkeit

    def set_aehnlichkeit(self, wert: float):
        self._aehnlichkeit = wert

    def get_entscheidung_person(self):
        return self._entscheidung_person

    def set_entscheidung_person(self, entscheidung: bool):
        self._entscheidung_person = entscheidung
