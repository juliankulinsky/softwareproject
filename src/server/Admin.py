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
from .db.ChatTeilnahmeMapper import ChatTeilnahmeMapper
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
    def create_chatteilnahme(self, person_id, konversation_id):
        """Eine Chatteilnahme erstellen"""
        chat_teilnahme = ChatTeilnahme()
        chat_teilnahme.set_person_id(person_id)
        chat_teilnahme.set_konversation_id(konversation_id)

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
        with ChatTeilnahmeMapper() as mapper:
            mapper.update(chat_teilnahme)

    def delete_chatteilnahme(self, chat_teilnahme: ChatTeilnahme):
        """Die gegebene Chatteilnahme aus dem System löschen"""
        with ChatTeilnahmeMapper() as mapper:
            mapper.delete(chat_teilnahme)

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
    def create_gruppenvorschlag(self, person_id, gruppenvorschlag_id):
        """Einen Gruppenvorschlag erstellen."""
        gruppenvorschlag = GruppenVorschlag()
        gruppenvorschlag.set_person_id(person_id)
        gruppenvorschlag.set_gruppenvorschlag_id(gruppenvorschlag_id)

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
        with GruppenVorschlagMapper() as mapper:
            mapper.update(gruppenvorschlag)

    def delete_gruppenvorschlag(self, gruppenvorschlag: GruppenVorschlag):
        """Den gegebenen Gruppenvorschlag aus dem System löschen"""
        with GruppenVorschlagMapper() as mapper:
            mapper.delete(gruppenvorschlag)

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
    def create_lerngruppe(self, gruppenname, profil_id, konversation_id):
        """
            Lerngruppe erstellen:
            Diese Klasse wird bei der Erstellung einer Lerngruppe instanziiert.
        """
        lerngruppe = Lerngruppe()
        lerngruppe.set_gruppenname(gruppenname)
        lerngruppe.set_profil_id(profil_id)
        lerngruppe.set_konversation_id(konversation_id)

        with LerngruppeMapper as mapper:
            mapper.insert(lerngruppe)

    def get_all_lerngruppen(self):
        """Auslesen aller Lerngruppen."""
        with LerngruppeMapper() as mapper:
            mapper.find_all()

    def get_lerngruppe_by_id(self, key):
        """Lerngruppe nach einer spezifischen ID auslesen."""
        with LerngruppeMapper() as mapper:
            return mapper.find_by_key(key)

    def save_lerngruppe(self, lerngruppe: Lerngruppe):
        """Änderungen einer Lerngruppe speichern bzw. updaten."""
        with LerngruppeMapper as mapper:
            mapper.update(lerngruppe)

    def delete_lerngruppe(self, lerngruppe: Lerngruppe):
        """Eine Lerngruppe löschen."""
        with LerngruppeMapper() as mapper:
            mapper.delete(lerngruppe)


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

        with LernvorliebeMapper() as mapper:
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
