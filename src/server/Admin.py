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
    def create_chatteilnahme(self, person_id, konversation_id):
        """Eine Chatteilnahme erstellen"""
        chat_teilnahme = ChatTeilnahme()
        chat_teilnahme.set_person_id(person_id)
        chat_teilnahme.set_konversation_id(konversation_id)
        chat_teilnahme.set_id(1)

        with ChatTeilnahmeMapper as mapper:
            return mapper.insert(chat_teilnahme)

    def get_all_chatteilnahmen(self):
        """Alle Chatteilnahmen ausgeben."""
        with ChatTeilnahmeMapper() as mapper:
            return mapper.find_all()

    def get_chatteilnahme_by_id(self, key):
        """Die Chatteilnahme mit gegebener ID auslesen."""
        with ChatTeilnahmeMapper() as mapper:
            return mapper.find_by_key(key)

    def save_chatteilnahme(self, chat_teilnahme: ChatTeilnahme):
        """Die gegebene Chatteilnahme speichern."""
        with ChatTeilnahmeMapper as mapper:
            mapper.update(chat_teilnahme)

    def delete_chatteilnahme(self, chat_teilnahme: ChatTeilnahme):
        """Die gegebene Chatteilnahme aus dem System löschen"""
        with ChatTeilnahmeMapper() as mapper:
            mapper.delete(chat_teilnahme)

    """
        GruppenTeilnahme - Spezifische Methoden
    """

    """
        GruppenVorschlag - Spezifische Methoden
    """
    def create_gruppenvorschlag(self, person_id, gruppenvorschlag_id):
        """Einen Gruppenvorschlag erstellen."""
        gruppenvorschlag = GruppenVorschlag()
        gruppenvorschlag.set_person_id(person_id)
        gruppenvorschlag.set_gruppenvorschlag_id(gruppenvorschlag_id)
        gruppenvorschlag.set_id(1)

        with GruppenVorschlagMapper() as mapper:
            return mapper.insert(gruppenvorschlag)

    def get_all_gruppenvorschlaege(self):
        """Alle Gruppenvorschläge ausgeben."""
        with GruppenVorschlagMapper() as mapper:
            return mapper.find_all()

    def get_gruppenvorschlag_by_id(self, key):
        """Den Gruppenvorschlag mit gegebener ID auslesen."""
        with GruppenVorschlagMapper() as mapper:
            return mapper.find_by_key(key)

    def save_gruppenvorschlag(self, gruppenvorschlag: GruppenVorschlag):
        """Den gegebenen Gruppenvorschlag speichern."""
        with GruppenVorschlagMapper as mapper:
            mapper.update(gruppenvorschlag)

    def delete_gruppenvorschlag(self, gruppenvorschlag: GruppenVorschlag):
        """Den gegebenen Gruppenvorschlag aus dem System löschen"""
        with GruppenVorschlagMapper() as mapper:
            mapper.delete(gruppenvorschlag)

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

    """
        Person - Spezifische Methoden
    """

    """
        Profil - Spezifische Methoden
    """
