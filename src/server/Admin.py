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


    """
        ChatTeilnahme - Spezifische Methoden
    """

    """
        GruppenTeilnahme - Spezifische Methoden
    """

    def get_all_gruppen_teilnahme(self):
        """Alle Gruppen_Teilnahmen auslesen"""
        with GruppenTeilnahmeMapper() as mapper:
            return mapper.find_all()

    def create_gruppen_teilnahme(self, person_id, gruppen_id):
        """Gruppen_Teilnahme erstellen"""
        gruppenteilnahme = GruppenTeilnahme()
        gruppenteilnahme.set_person_id(person_id)
        gruppenteilnahme.set_gruppen_id(gruppen_id)

        with GruppenTeilnahmeMapper() as mapper:
            return mapper.insert(gruppenteilnahme)

    def get_gruppen_teilnahme_by_id(self, value):
        """Eine Gruppen_Teilnahme auswählen"""
        with GruppenTeilnahmeMapper() as mapper:
            return mapper.find_by_key(value)

    def save_gruppen_teilnahme(self, gruppen_teilnahme):
        """Gruppen_Teilnahme speichern"""
        with GruppenTeilnahmeMapper() as mapper:
            mapper.update(gruppen_teilnahme)

    def delete_gruppen_teilnahme(self, gruppen_teilnahme):
        """Gruppen_Teilnahme löschen"""
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

    def save_nachricht(self, nachricht: Nachricht):
        """ Änderungen einer Nachricht speichern """
        with NachrichtMapper() as mapper:
            return mapper.update(nachricht)

    def delete_nachricht(self, nachricht: Nachricht):
        """ Löschen einer Nachricht """
        with NachrichtMapper() as mapper:
            return mapper.delete(nachricht)

    """
        PartnerVorschlag - Spezifische Methoden
    """
    def create_partnervorschlag(self, person_id, partnervorschlag_id, aehnlichkeit,
                                entscheidung_person, entscheidung_partner ):
        """Ein PartnerVorschlag anlegen"""
        partner_vorschlag = PartnerVorschlag()
        partner_vorschlag.set_person_id(person_id)
        partner_vorschlag.set_partnervorschlag_id(partnervorschlag_id)
        partner_vorschlag.set_aehnlichkeit(aehnlichkeit)
        partner_vorschlag.set_entscheidung_person(entscheidung_person)
        partner_vorschlag.set_entscheidung_partner(entscheidung_partner)

        with PartnerVorschlagMapper() as mapper:
            return mapper.insert(partner_vorschlag)

    def get_all_partner_vorschlag(self, partner_vorschlag):
        """Alle PartnerVorschläge auslesen."""
        with PartnerVorschlagMapper() as mapper:
            return mapper.find_all(partner_vorschlag)

    def get_partner_vorschlag_by_id(self, id):
        """PartnerVorschlag mit der gegebenen ID auslesen."""
        with PartnerVorschlagMapper() as mapper:
            return mapper.find_by_key(id)

    def save_partner_vorschlag(self, partner_vorschlag):
        """PartnerVorschlag speichern."""
        with PartnerVorschlagMapper() as mapper:
            mapper.update(partner_vorschlag)

    def delete_partner_vorschlag(self, partner_vorschlag):
        """PartnerVorschlag aus unserem System löschen."""
        with PartnerVorschlag() as mapper:
            mapper.delete(partner_vorschlag)

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

    def save_person(self, person: Person):
        """ Änderungen einer Person speichern """
        with PersonMapper() as mapper:
            return mapper.update(person)

    def delete_person(self, person: Person):
        """ Löschen einer Person """
        with PersonMapper() as mapper:
            return mapper.delete(person)
    """
        Profil - Spezifische Methoden
    """

    def create_profil(self, ):
        """Ein Profil anlegen"""
        profil = Profil()

        with ProfilMapper() as mapper:
            return mapper.insert(profil)

    def get_all_profile(self, profil):
        """Alle Profile auslesen."""
        with ProfilMapper() as mapper:
            return mapper.find_all(profil)

    def get_profil_by_id(self, id):
        """Das Profil mit der gegebenen ID auslesen."""
        with ProfilMapper() as mapper:
            return mapper.find_by_key(id)

    def save_profil(self, profil):
        """Das Profil speichern."""
        with ProfilMapper() as mapper:
            mapper.update(profil)

    def delete_profil(self, profil):
        """Das Profil aus unserem System löschen."""
        with ProfilMapper() as mapper:
            mapper.delete(profil)
