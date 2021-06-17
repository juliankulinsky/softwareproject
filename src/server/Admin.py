"""
Hier implementieren wir eine Administrationsklasse. Sie ist erforderlich, um Daten per HTTP-Request
aus der Datenbank auslesen bzw. in die Datenbank inserieren zu können.
Mithilfe dieser Klasse können wir also mit dem Frontend kommunizieren (Service Layer).
"""

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

        with ChatTeilnahmeMapper() as mapper:
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
    def create_gruppen_teilnahme(self, person_id, gruppen_id):
        """Gruppen_Teilnahme erstellen"""
        gruppenteilnahme = GruppenTeilnahme()
        gruppenteilnahme.set_person_id(person_id)
        gruppenteilnahme.set_gruppen_id(gruppen_id)

        with GruppenTeilnahmeMapper() as mapper:
            return mapper.insert(gruppenteilnahme)

    def get_all_gruppen_teilnahme(self):
        """Alle Gruppen_Teilnahmen auslesen"""
        with GruppenTeilnahmeMapper() as mapper:
            return mapper.find_all()

    def get_gruppen_teilnahme_by_id(self, value):
        """Eine Gruppen_Teilnahme auswählen"""
        with GruppenTeilnahmeMapper() as mapper:
            return mapper.find_by_key(value)

    def save_gruppen_teilnahme(self, gruppen_teilnahme: GruppenTeilnahme):
        """Gruppen_Teilnahme speichern"""
        with GruppenTeilnahmeMapper() as mapper:
            mapper.update(gruppen_teilnahme)

    def delete_gruppen_teilnahme(self, gruppen_teilnahme: GruppenTeilnahme):
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
            return mapper.insert(konversation)

    def get_all_konversationen(self):
        """Alle Konversationen ausgeben"""
        with KonversationMapper() as mapper:
            return mapper.find_all()

    def get_konversationen_by_person_id(self, person_id):
        """alle Konversationen, an denen die Person mit der ID person_id teilnimmt"""
        with KonversationMapper() as mapper:
            return mapper.find_by_person_id(person_id)

    def get_konversation_by_id(self, id):
        """Konversation mit gegebener ID ausgeben"""
        with KonversationMapper() as mapper:
            return mapper.find_by_key(id)

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
            return mapper.insert(lerngruppe)

    def get_all_lerngruppen(self):
        """Auslesen aller Lerngruppen."""
        with LerngruppeMapper() as mapper:
            return mapper.find_all()

    def get_lerngruppen_by_person_id(self, person_id: int):
        with LerngruppeMapper() as mapper:
            return mapper.find_by_person_id(person_id)

    def get_lerngruppe_by_id(self, key):
        """Lerngruppe nach einer spezifischen ID auslesen."""
        with LerngruppeMapper() as mapper:
            return mapper.find_by_key(key)

    def get_lerngruppe_by_konversation_id(self, key: int):
        """Lerngruppe nach einer spezifischen ID auslesen."""
        with LerngruppeMapper() as mapper:
            return mapper.find_by_konversation_id(key)

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
    def create_lernvorliebe(self, lerntyp=0, frequenz=0, extrovertiertheit=0, remote_praesenz=0, vorkenntnisse="", lerninteressen=""):
        """
        Lernvorlieben erstellen:
        Diese Klasse wird bei der Profilerstellung instanziiert.
        """
        lv = Lernvorliebe()
        lv.set_lerntyp(lerntyp)
        lv.set_frequenz(frequenz)
        lv.set_extrovertiertheit(extrovertiertheit)
        lv.set_remote_praesenz(remote_praesenz)
        lv.set_vorkenntnisse(vorkenntnisse)
        lv.set_lerninteressen(lerninteressen)

        with LernvorliebeMapper() as mapper:
            return mapper.insert(lv)

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
    def create_nachricht(self, inhalt, absender_id, konversation_id):
        """ Eine Nachricht erstellen """
        nachricht = Nachricht()
        nachricht.set_inhalt(inhalt)
        nachricht.set_absender_id(absender_id)
        nachricht.set_konversation_id(konversation_id)

        with NachrichtMapper() as mapper:
            return mapper.insert(nachricht)

    def get_all_nachrichten(self):
        """Alle Nachrichten auslesen"""
        with NachrichtMapper() as mapper:
            return mapper.find_all()

    def get_nachrichten_by_konversation_id(self, konversation_id):
        """Alle Nachrichten einer Konversation mit der ID konversation_id ausgeben"""
        with NachrichtMapper() as mapper:
            return mapper.find_by_konversation_id(konversation_id)

    def get_nachricht_by_id(self, id):
        """ Eine Nachricht anhand der ID auslesen """
        with NachrichtMapper() as mapper:
            return mapper.find_by_key(id)

    def save_nachricht(self, nachricht: Nachricht):
        """ Änderungen einer Nachricht speichern """
        with NachrichtMapper() as mapper:
            mapper.update(nachricht)

    def delete_nachricht(self, nachricht: Nachricht):
        """ Löschen einer Nachricht """
        with NachrichtMapper() as mapper:
            mapper.delete(nachricht)

    """
        PartnerVorschlag - Spezifische Methoden
    """
    def create_partnervorschlag(self, person_id, partner_id, aehnlichkeit, matchpoints,
                                entscheidung_person, entscheidung_partner):
        """Ein PartnerVorschlag anlegen"""
        partner_vorschlag = PartnerVorschlag()
        partner_vorschlag.set_person_id(person_id)
        partner_vorschlag.set_partner_id(partner_id)
        partner_vorschlag.set_aehnlichkeit(aehnlichkeit)
        partner_vorschlag.set_matchpoints(matchpoints)
        partner_vorschlag.set_entscheidung_person(entscheidung_person)
        partner_vorschlag.set_entscheidung_partner(entscheidung_partner)

        with PartnerVorschlagMapper() as mapper:
            return mapper.insert(partner_vorschlag)

    def get_all_partner_vorschlag(self):
        """Alle PartnerVorschläge auslesen."""
        with PartnerVorschlagMapper() as mapper:
            return mapper.find_all()

    def get_partner_vorschlag_by_id(self, id):
        """PartnerVorschlag mit der gegebenen ID auslesen."""
        with PartnerVorschlagMapper() as mapper:
            return mapper.find_by_key(id)

    def get_best_partner_vorschlag_for_person_id(self, person_id):
        """Den noch nicht bewerteten PartnerVorschlag mit der höchsten Ähnlichkeit für eine Person auslesen"""
        with PartnerVorschlagMapper() as mapper:
            return mapper.find_best_by_person_id(person_id)

    def save_partner_vorschlag(self, partner_vorschlag: PartnerVorschlag):
        """PartnerVorschlag speichern."""
        with PartnerVorschlagMapper() as mapper:
            mapper.update(partner_vorschlag)

    def delete_partner_vorschlag(self, partner_vorschlag: PartnerVorschlag):
        """PartnerVorschlag aus unserem System löschen."""
        with PartnerVorschlagMapper() as mapper:
            mapper.delete(partner_vorschlag)

    """
        Person - Spezifische Methoden
    """
    def create_person(self, name, email, google_user_id, alter=0, studiengang="", wohnort="", semester=0, profil_id=0):
        """ Eine Person erstellen """
        person = Person()
        person.set_name(name)
        person.set_email(email)
        person.set_google_user_id(google_user_id)
        person.set_alter(alter)
        person.set_studiengang(studiengang)
        person.set_wohnort(wohnort)
        person.set_semester(semester)
        person.set_profil_id(profil_id)

        with PersonMapper() as mapper:
            return mapper.insert(person)

    def get_all_personen(self):
        """ Alle Personen auslesen """
        with PersonMapper() as mapper:
            return mapper.find_all()

    def get_person_by_id(self, id):
        """ Eine Person anhand der ID auslesen """
        with PersonMapper() as mapper:
            return mapper.find_by_key(id)

    def get_person_by_google_user_id(self, google_user_id):
        """ Eine Person anhand der Google_User_ID auslesen """
        with PersonMapper() as mapper:
            return mapper.find_by_google_user_id(google_user_id)

    def get_personen_by_konversation_id(self, konversation_id):
        """ Alle Personen, die an einer bestimmten Konversation teilnehmen, auslesen"""
        with PersonMapper() as mapper:
            return mapper.find_by_konversation_id(konversation_id)

    def save_person(self, person: Person):
        """ Änderungen einer Person speichern """
        with PersonMapper() as mapper:
            mapper.update(person)

    def delete_person(self, person: Person):
        """ Löschen einer Person """
        with PersonMapper() as mapper:
            mapper.delete(person)

    """
        Profil - Spezifische Methoden
    """
    def create_profil(self, lernvorlieben_id):
        """Ein Profil anlegen"""
        profil = Profil()
        profil.set_lernvorlieben_id(lernvorlieben_id)

        with ProfilMapper() as mapper:
            return mapper.insert(profil)

    def get_all_profile(self):
        """Alle Profile auslesen."""
        with ProfilMapper() as mapper:
            return mapper.find_all()

    def get_profil_by_id(self, id):
        """Das Profil mit der gegebenen ID auslesen."""
        with ProfilMapper() as mapper:
            return mapper.find_by_key(id)

    def save_profil(self, profil: Profil):
        """Das Profil speichern."""
        with ProfilMapper() as mapper:
            mapper.update(profil)

    def delete_profil(self, profil: Profil):
        """Das Profil aus unserem System löschen."""
        with ProfilMapper() as mapper:
            mapper.delete(profil)
