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

    def create_konversation(self, ist_gruppenchat):
        """
        Erstellen einer Konversation nach erfolgreichem Match.
        :return: Konversation, an der n>1 Parteien teilnehmen können.
        """
        konversation = Konversation()
        konversation.set_ist_gruppenchat(ist_gruppenchat)

        with KonversationMapper() as mapper:
            mapper.insert(konversation)

    def get_all_konversationen(self):
        """Alle Konversationen ausgeben"""
        with KonversationMapper() as mapper:
            mapper.find_all()

    def get_konversation_by_id(self, id):
        """Konversation mit gegebener ID ausgeben"""
        with KonversationMapper() as mapper:
            mapper.find_by_key(id)

    def save_konversation(self, konversation: Konversation):
        """Updaten einer Konversation"""
        with KonversationMapper() as mapper:
            mapper.update(konversation)

    def delete_konversation(self, konversation: Konversation):
        """Löschen einer Konversation"""
        with KonversationMapper() as mapper:
            mapper.delete(konversation)

    """
        Lerngruppe - Spezifische Methoden
    """

    """
        Lernvorliebe - Spezifische Methoden
    """

    def create_lernvorliebe(self, lerntyp, wert, lerninteressen, extrovertiertheit, remote_praesenz, vorkenntnisse):
        """
        Lernvorlieben erstellen:
        Diese Klasse wird bei der Profilerstellung instanziiert.
        """
        lv = Lernvorliebe()
        lv.set_lerntyp(lerntyp)
        lv.set_frequenz(wert)
        lv.set_lerninteressen(lerninteressen)
        lv.set_extrovertiertheit(extrovertiertheit)
        lv.set_remote_praesenz(remote_praesenz)
        lv.set_vorkenntnisse(vorkenntnisse)

        with LernvorliebeMapper as mapper:
            mapper.insert(lv)

    def get_all_lernvorlieben(self):
        """Auslesen aller Lernvorlieben"""
        with LernvorliebeMapper() as mapper:
            return mapper.find_all()

    def get_lernvorliebe_by_id(self, key):
        """Lernvorliebe einer bestimmten Person auslesen"""
        with LernvorliebeMapper() as mapper:
            return mapper.find_by_key(key)

    def save_lernvorliebe(self, lernvorliebe: Lernvorliebe):
        """Eine Lernvorliebe updaten"""
        with LernvorliebeMapper() as mapper:
            mapper.update(lernvorliebe)

    def delete_lernvorliebe(self, lernvorliebe: Lernvorliebe):
        with LernvorliebeMapper() as mapper:
            mapper.delete(lernvorliebe)

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
