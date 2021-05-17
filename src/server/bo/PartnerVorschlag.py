from server.bo import Vorschlag as vo


class PartnerVorschlag(vo.Vorschlag):
    """Realisierung der Klasse PartnerVorschlag, welche von der abstrakten Klasse Vorschlag seine Grundstruktur erbt.
    Zusätzliche Attribute sind auf den vorgeschlagenen Lernpartner bezogen
    """
    def __init__(self):
        super().__init__()
        self.partnervorschlag_id = 0       # Fremdschlüsselbeziehung zur vorgeschlagenen Person
        self.entscheidung_partner = None   #

    def get_partnervorschlag_id(self):
        return self.partnervorschlag_id

    def set_partnervorschlag_id(self, partner_id: int):
        self.partnervorschlag_id = partner_id

    def get_entscheidung_partner(self):
        return self.entscheidung_partner

    def set_entscheidung_partner(self, wert: float):
        self.entscheidung_partner = wert

    def __str__(self):
        return "Nr.{}: Person {} und Person {} mit Ähnl. {}: {} & {}".format(
            self.get_id(),self.get_person_id(),self.get_partnervorschlag_id(),self.get_aehnlichkeit(),
            self.get_entscheidung_person(),self.get_entscheidung_partner()
        )

    @staticmethod
    def from_dict(dictionary=dict()):
        obj = PartnerVorschlag()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_erstellungszeitpunkt(dictionary["erstellungszeitpunkt"])
        obj.set_partnervorschlag_id(dictionary["partnervorschlag_id"])
        obj.set_entscheidung_partner(dictionary["entscheidung_partner"])
        return obj