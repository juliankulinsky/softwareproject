"""
Hier implementieren wir eine Administrationsklasse. Sie ist erforderlich, um Daten per HTTP-Request
aus der Datenbank auslesen bzw. in die Datenbank inserieren zu können.
Mithilfe dieser Klasse können wir also mit dem Frontend kommunizieren (Service Layer).
"""

from .bo.BusinessObject import BusinessObject
from .bo.ChatTeilnahme import ChatTeilnahme
from .bo.GruppenTeilnahme import GruppenTeilnahme
from .bo.GruppenVorschlag import GruppenVorschlag
from .bo.Konversation import Konversation
from .bo.Lerngruppe import Lerngruppe
from .bo.Lernvorliebe import Lernvorliebe
from .bo.Nachricht import Nachricht
from .bo.PartnerVorschlag import PartnerVorschlag
from .bo.Person import Person
from .bo.Profil import Profil
from .bo.Vorschlag import Vorschlag

from .db.KonversationMapper import KonversationMapper
from .db.LerngruppeMapper import LerngruppeMapper
from .db.LernvorliebeMapper import LernvorliebeMapper
from .db.NachrichtMapper import NachrichtMapper
from .db.PersonMapper import PersonMapper

# from .db.ChatTeilnahmeMapper import ChatTeilnahmeMapper
# from .db.GruppenTeilnahmeMapper import GruppenTeilnahmeMapper
from .db.GruppenVorschlagMapper import GruppenVorschlagMapper
from .db.ProfilMapper import ProfilMapper
from .db.PartnerVorschlagMapper import PartnerVorschlagMapper


class Admin(object):
    """Mithilfe dieser Klasse verbinden wir unsere Applikationslogik mit der Datenbank und
    können darüber Daten ans Frontend übergeben, die diese via HTTP-Requests anfragen kann.
    """

    """
    Methoden welche aus MapperKlassen übernommen werden müssen:
        get_all_...
        create_...
        get_..._by_id
        save_...
        delete_...
    """

    def __init__(self):
        pass

    def get_all_nachrichten(self):
        """Alle Nachrichten auslesen"""
        with NachrichtMapper() as mapper:
            return mapper.find_all()

    """
        ChatTeilnahme - Spezifische Methoden
    """

    """
        GruppenTeilnahme - Spezifische Methoden
    """

    """
        GruppenVorschlag - Spezifische Methoden
    """

    """
        Konversation - Spezifische Methoden
    """

    """
        Lerngruppe - Spezifische Methoden
    """

    """
        Lernvorliebe - Spezifische Methoden
    """

    """
        Nachricht - Spezifische Methoden
    """

    """
        PartnerVorschlag - Spezifische Methoden
    """
    def create_partnervorschlag(self, id, erstellungszeitpunkt, person_id, partnervorschlag_id, aehnlichkeit,
                                entscheidung_person, entscheidung_partner   ):
        """Ein PartnerVorschlag anlegen"""
        partner_vorschlag = PartnerVorschlag()
        partner_vorschlag.set_id(id)
        partner_vorschlag.set_erstellungszeitpunkt(erstellungszeitpunkt)
        partner_vorschlag.set_person_id(person_id)
        partner_vorschlag.set_partnervorschlag_id(partnervorschlag_id)
        partner_vorschlag.set_aehnlichkeit(aehnlichkeit)
        partner_vorschlag.set_entscheidung_person(entscheidung_person)
        partner_vorschlag.set_entscheidung_partner(entscheidung_partner)

        with PartnerVorschlagMapper() as mapper:
            return mapper.insert(partner_vorschlag)

    def get_all_profile(self, partner_vorschlag):
        """Alle PartnerVorschläge auslesen."""
        with PartnerVorschlagMapper() as mapper:
            return mapper.find_all(partner_vorschlag)

    def get_profile_by_id(self, id):
        """PartnerVorschlag mit der gegebenen ID auslesen."""
        with PartnerVorschlagMapper() as mapper:
            return mapper.find_by_key(id)

    def save_profile(self, partner_vorschlag):
        """PartnerVorschlag speichern."""
        with PartnerVorschlagMapper() as mapper:
            mapper.update(partner_vorschlag)

    def delete_user(self, partner_vorschlag):
        """PartnerVorschlag aus unserem System löschen."""
        with PartnerVorschlag() as mapper:
            mapper.delete(partner_vorschlag)

    """
        Person - Spezifische Methoden
    """

    """
        Profil - Spezifische Methoden
    """

    def create_profile(self, id, erstellungszeitpunkt ):
        """Ein Profil anlegen"""
        profile = Profil()
        profile.set_id(id)
        profile.set_erstellungszeitpunkt(erstellungszeitpunkt)

        with ProfilMapper() as mapper:
            return mapper.insert(profile)

    def get_all_profile(self, profile):
        """Alle Profile auslesen."""
        with ProfilMapper() as mapper:
            return mapper.find_all(profile)

    def get_profile_by_id(self, id):
        """Das Profil mit der gegebenen ID auslesen."""
        with ProfilMapper() as mapper:
            return mapper.find_by_key(id)

    def save_profile(self, profile):
        """Das Profil speichern."""
        with ProfilMapper() as mapper:
            mapper.update(profile)

    def delete_user(self, profile):
        """Das Profil aus unserem System löschen."""
        with ProfilMapper() as mapper:
            mapper.delete(profile)