from server.bo import Vorschlag as vo


class PartnerVorschlag(vo.Vorschlag):
    """Realisierung der Klasse PartnerVorschlag, welche von der abstrakten Klasse Vorschlag seine Grundstruktur erbt.
    Zusätzliche Attribute sind auf den vorgeschlagenen Lernpartner bezogen
    """

    def __init__(self):
        super().__init__()
        self._partner_id = 0  # Fremdschlüsselbeziehung zur vorgeschlagenen Person
        self._entscheidung_partner = False  # Ob sich der Partner entschieden hat

    def get_partner_id(self):
        """Auslesen der Partner ID"""
        return self._partner_id

    def set_partner_id(self, partner_id: int):
        """Setzen der Partner ID"""
        self._partner_id = partner_id

    def get_entscheidung_partner(self):
        """Auslesen der Entscheidung des Lernpartners"""
        return self._entscheidung_partner

    def set_entscheidung_partner(self, wert: bool):
        """Setzen der Entscheidung des Lernpartners"""
        self._entscheidung_partner = wert

    def __str__(self):
        return "Nr.{}: Person {} und Person {} mit Ähnl. {}: {} & {}".format(
            self.get_id(),
            self.get_person_id(),
            self.get_partner_id(),
            self.get_aehnlichkeit(),
            self.get_matchpoints(),
            self.get_entscheidung_person(),
            self.get_entscheidung_partner(),
        )

    @staticmethod
    def from_dict(dictionary=dict()):
        obj = PartnerVorschlag()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_erstellungszeitpunkt(dictionary["erstellungszeitpunkt"])
        obj.set_person_id(dictionary["person_id"])
        obj.set_partner_id(dictionary["partner_id"])
        obj.set_aehnlichkeit(dictionary["aehnlichkeit"])
        obj.set_matchpoints(dictionary["matchpoints"])
        obj.set_entscheidung_person(dictionary["entscheidung_person"])
        obj.set_entscheidung_partner(dictionary["entscheidung_partner"])
        return obj
