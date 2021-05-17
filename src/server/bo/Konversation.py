from server.bo import BusinessObject as bo


class Konversation(bo.BusinessObject):
    """Realisierung der Konversationsklasse

    Baut auf BusinessObject auf und hat zusätzlich Teilnehmer und Nachrichten als Listen
    als Attribute. Dafür gibt es jeweils Getter und Add-Methoden
    """
    def __init__(self):
        super().__init__()
        self._ist_gruppenchat = False

    """Im Folgenden sind alle Getter- & Setter-Methoden sämtlicher Attribute"""

    def get_ist_gruppenchat(self):
        return self._ist_gruppenchat

    def set_ist_gruppenchat(self, wert: bool):
        self._ist_gruppenchat = wert

    @staticmethod
    def from_dict(dictionary=dict()):
        obj = Konversation()
        obj.set_id(dictionary["id"])
        obj.set_erstellungszeitpunkt(dictionary["erstellungszeitpunkt"])
        obj.set_ist_gruppenchat(dictionary["ist_gruppenchat"])
        return obj