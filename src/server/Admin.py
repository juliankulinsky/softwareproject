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
    def get_all_nachrichten(self):
        """Alle Nachrichten auslesen"""
        with NachrichtMapper() as mapper:
            return mapper.find_all()

    def create_nachricht(self, inhalt, absender_id, konversation_id):
        """ Eine Nachricht erstellen """
        nachricht = Nachricht()
        nachricht.set_inhalt(inhalt)
        nachricht.set_absender_id(absender_id)
        nachricht.set_konversation_id(konversation_id)

        with NachrichtMapper() as mapper:
            return mapper.insert()

    def get_nachricht_by_id(self, id):
        """ Eine Nachricht anhand der ID auslesen """
        with NachrichtMapper() as mapper:
            return mapper.find_by_key(id)

    def save_nachricht(self, nachricht):
        """ Änderungen einer Nachricht speichern """
        with NachrichtMapper() as mapper:
            return mapper.update(nachricht)

    def delete_nachricht(self, nachricht):
        """ Löschen einer Nachricht """
        with NachrichtMapper() as mapper:
            return mapper.insert(nachricht)

    """
        PartnerVorschlag - Spezifische Methoden
    """

    """
        Person - Spezifische Methoden
    """

    def get_all_personen(self):
        """ Alle Personen auslesen """
        with PersonMapper() as mapper:
            return mapper.find_all()

    def create_person(self, vorname, nachname, alter, studiengang, wohnort, semester, profil_id):
        """ Eine Person erstellen """
        person = Person()
        person.set_vorname(vorname)
        person.set_nachname(nachname)
        person.set_alter(alter)
        person.set_studiengang(studiengang)
        person.set_wohnort(wohnort)
        person.set_semester(semester)
        person.set_profil_id(profil_id)

        with PersonMapper() as mapper:
            return mapper.insert()

    def get_person_by_id(self, id):
        """ Eine Person anhand der ID auslesen """
        with PersonMapper() as mapper:
            return mapper.find_by_key(id)

    def save_person(self, person):
        """ Änderungen einer Person speichern """
        with PersonMapper() as mapper:
            return mapper.update(person)

    def delete_person(self, person):
        """ Löschen einer Person """
        with PersonMapper() as mapper:
            return mapper.insert(person)
    """
        Profil - Spezifische Methoden
    """
