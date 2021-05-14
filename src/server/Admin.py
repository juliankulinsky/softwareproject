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
from .db.GruppenTeilnahmeMapper import GruppenTeilnahmeMapper
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

    def get_all_gruppen_teilnahme(self):
        with GruppenTeilnahmeMapper() as mapper:
            return mapper.find_all()

    def create_gruppen_teilnahme(self, person_id, gruppen_id):
        gruppenteilnahme = GruppenTeilnahme()
        gruppenteilnahme.set_person_id(person_id)
        gruppenteilnahme.set_gruppen_id(gruppen_id)

        with GruppenTeilnahmeMapper() as mapper:
            return mapper.insert(gruppenteilnahme)

    def get_gruppen_teilnahme_by_id(self, value):
        with GruppenTeilnahmeMapper() as mapper:
            return mapper.find_by_key(value)

    def save_gruppen_teilnahme(self, gruppen_teilnahme):
        with GruppenTeilnahmeMapper() as mapper:
            mapper.update(gruppen_teilnahme)

    def delete_gruppen_teilnahme(self, gruppen_teilnahme):
        with GruppenTeilnahmeMapper() as mapper:
            mapper.delete(gruppen_teilnahme)

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

    """
        Person - Spezifische Methoden
    """

    """
        Profil - Spezifische Methoden
    """
