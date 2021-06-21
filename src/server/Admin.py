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

    def get_chatteilnahme_by_person_id_und_konversation_id(self, person_id: int, konversation_id: int):
        """Die Chatteilnahme mit PersonID und KonversationID auslesen"""
        with ChatTeilnahmeMapper() as mapper:
            return mapper.find_by_person_id_und_konversation_id(person_id,konversation_id)

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
    def create_gruppen_teilnahme(self, person_id, gruppen_id, ist_admin):
        """Gruppen_Teilnahme erstellen"""
        gruppenteilnahme = GruppenTeilnahme()
        gruppenteilnahme.set_person_id(person_id)
        gruppenteilnahme.set_gruppen_id(gruppen_id)
        gruppenteilnahme.set_ist_admin(ist_admin)

        with GruppenTeilnahmeMapper() as mapper:
            neue_gruppenteilnahme = mapper.insert(gruppenteilnahme)
            adm = Admin()
            adm.berechne_gruppen_lernvorlieben(neue_gruppenteilnahme.get_gruppen_id())
            return neue_gruppenteilnahme

    def get_all_gruppen_teilnahme(self):
        """Alle Gruppen_Teilnahmen auslesen"""
        with GruppenTeilnahmeMapper() as mapper:
            return mapper.find_all()

    def get_all_gruppen_teilnahmen_for_gruppen_id(self, gruppen_id):
        """Auslesen aller Gruppenteilnahmen einer Gruppe"""
        with GruppenTeilnahmeMapper() as mapper:
            return mapper.find_all_by_gruppen_id(gruppen_id)

    def get_all_gruppen_teilnahmen_for_person_id(self, person_id):
        """Auslesen aller Gruppenteilnahmen einer Gruppe"""
        with GruppenTeilnahmeMapper() as mapper:
            return mapper.find_all_by_person_id(person_id)

    def get_gruppen_teilnahme_by_id(self, value):
        """Eine Gruppen_Teilnahme auswählen"""
        with GruppenTeilnahmeMapper() as mapper:
            return mapper.find_by_key(value)

    def get_gruppen_teilnahme_by_person_id_und_gruppen_id(self, person_id, gruppen_id):
        """Eine Gruppen-Teilnahme durch PersonID und GruppenID auslesen"""
        with GruppenTeilnahmeMapper() as mapper:
            return mapper.find_by_person_id_und_gruppen_id(person_id, gruppen_id)

    def save_gruppen_teilnahme(self, gruppen_teilnahme: GruppenTeilnahme):
        """Gruppen_Teilnahme speichern"""
        with GruppenTeilnahmeMapper() as mapper:
            mapper.update(gruppen_teilnahme)

    def delete_gruppen_teilnahme(self, gruppen_teilnahme: GruppenTeilnahme):
        """Gruppen_Teilnahme löschen"""
        with GruppenTeilnahmeMapper() as mapper:
            deleted_gruppen_teilnahme = gruppen_teilnahme
            mapper.delete(gruppen_teilnahme)
            adm = Admin()
            adm.berechne_gruppen_lernvorlieben(deleted_gruppen_teilnahme.get_gruppen_id())

    """
        GruppenVorschlag - Spezifische Methoden
    """
    def create_gruppenvorschlag(self, person_id, gruppen_id, aehnlichkeit=0, matchpoints=0,
                                entscheidung_person=False, entscheidung_gruppe=False):
        """Einen Gruppenvorschlag erstellen."""
        gruppenvorschlag = GruppenVorschlag()
        gruppenvorschlag.set_person_id(person_id)
        gruppenvorschlag.set_gruppen_id(gruppen_id)
        gruppenvorschlag.set_aehnlichkeit(aehnlichkeit)
        gruppenvorschlag.set_matchpoints(matchpoints)
        gruppenvorschlag.set_entscheidung_person(entscheidung_person)
        gruppenvorschlag.set_entscheidung_gruppe(entscheidung_gruppe)

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

    def get_gruppenvorschlag_by_person_id_und_gruppen_id(self, person_id, gruppen_id):
        """Den Gruppenvorschlag mit gegebener ID auslesen."""
        with GruppenVorschlagMapper() as mapper:
            return mapper.find_by_person_id_und_gruppen_id(person_id, gruppen_id)

    def get_eingehende_gruppen_vorschlaege_for_person_id(self, person_id):
        """Eingehende Gruppenvorschläge an eine Person auslesen"""
        with GruppenVorschlagMapper() as mapper:
            return mapper.find_eingehende_by_person_id(person_id)

    def get_ausgehende_gruppen_vorschlaege_for_person_id(self, person_id):
        """Eingehende Gruppenvorschläge an eine Person auslesen"""
        with GruppenVorschlagMapper() as mapper:
            return mapper.find_ausgehende_by_person_id(person_id)

    def get_eingehende_gruppen_vorschlaege_for_gruppen_id(self, gruppen_id):
        """Eingehende Gruppenbeitrittsanfragen an eine Gruppe auslesen"""
        with GruppenVorschlagMapper() as mapper:
            return mapper.find_eingehende_by_gruppen_id(gruppen_id)

    def get_gruppen_vorschlaege_for_gruppen_id(self, gruppen_id):
        """Eingehende Gruppenbeitrittsanfragen an eine Gruppe auslesen"""
        with GruppenVorschlagMapper() as mapper:
            return mapper.find_by_gruppen_id(gruppen_id)

    def get_best_gruppenvorschlag_for_person_id(self, person_id):
        """Den besten Gruppenvorschlag für eine Person auslesen. """
        with GruppenVorschlagMapper() as mapper:
            return mapper.find_best_for_person_id(person_id)

    def get_all_gruppenvorschlaege_for_person_id(self, person_id):
        with GruppenVorschlagMapper() as mapper:
            return mapper.find_all_for_person_id(person_id)

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

        with LerngruppeMapper() as mapper:
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
        with LerngruppeMapper() as mapper:
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

    def get_eingehende_partner_vorschlaege_for_person_id(self, person_id):
        """Eingehende Partnervorschläge für eine Person auslesen"""
        with PartnerVorschlagMapper() as mapper:
            return mapper.find_eingehende_by_person_id(person_id)

    def get_ausgehende_partner_vorschlaege_for_person_id(self, person_id):
        """Eingehende Partnervorschläge für eine Person auslesen"""
        with PartnerVorschlagMapper() as mapper:
            return mapper.find_ausgehende_by_person_id(person_id)

    def get_best_partner_vorschlag_for_person_id(self, person_id):
        """Den noch nicht bewerteten PartnerVorschlag mit der höchsten Ähnlichkeit für eine Person auslesen"""
        with PartnerVorschlagMapper() as mapper:
            return mapper.find_best_by_person_id(person_id)

    def get_all_partnervorschlaege_for_person_id(self, person_id):
        with PartnerVorschlagMapper() as mapper:
            return mapper.find_all_for_person_id(person_id)

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

    def get_person_by_profil_id(self, profil_id):
        """ Eine Person anhand der Profil_ID auslesen"""
        with PersonMapper() as mapper:
            return mapper.find_by_profil_id(profil_id)

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
    def create_profil(self, lernvorlieben_id, beschreibung=""):
        """Ein Profil anlegen"""
        profil = Profil()
        profil.set_lernvorlieben_id(lernvorlieben_id)
        profil.set_beschreibung(beschreibung)

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

    def get_profil_by_lernvorlieben_id(self, lernvorlieben_id):
        """Das Profil mit der gegebenen Lernvorlieben_ID auslesen."""
        with ProfilMapper() as mapper:
            return mapper.find_by_lernvorlieben_id(lernvorlieben_id)

    def save_profil(self, profil: Profil):
        """Das Profil speichern."""
        with ProfilMapper() as mapper:
            mapper.update(profil)

    def delete_profil(self, profil: Profil):
        """Das Profil aus unserem System löschen."""
        with ProfilMapper() as mapper:
            mapper.delete(profil)

    def berechne_gruppen_lernvorlieben(self, gruppen_id: int):
        """ Berechnet die Lernvorlieben einer Lerngruppe aus ihren Teilnehmern """
        adm = Admin()
        gruppen_profil = adm.get_profil_by_id(adm.get_lerngruppe_by_id(gruppen_id).get_profil_id())
        gruppen_lernvorliebe = adm.get_lernvorliebe_by_id(gruppen_profil.get_lernvorlieben_id())
        alle_teilnahmen = adm.get_all_gruppen_teilnahmen_for_gruppen_id(gruppen_id)
        lerntypen_sammlung = []
        vorkenntnisse_sammlung = []
        lerninteressen_sammlung = []
        frequenz_extro_remote_sammlung = [0, 0, 0]
        for teilnahme in alle_teilnahmen:
            person_profil = adm.get_profil_by_id(adm.get_person_by_id(teilnahme.get_person_id()).get_profil_id())
            person_lernvorliebe = adm.get_lernvorliebe_by_id(person_profil.get_lernvorlieben_id())
            frequenz_extro_remote_sammlung[0] += person_lernvorliebe.get_frequenz()
            frequenz_extro_remote_sammlung[1] += person_lernvorliebe.get_extrovertiertheit()
            frequenz_extro_remote_sammlung[2] += person_lernvorliebe.get_remote_praesenz()
            lerntypen_sammlung.append(person_lernvorliebe.get_lerntyp())
            vorkenntnisse_person = person_lernvorliebe.get_vorkenntnisse().lower().replace(" ", "")
            vorkenntnisse_list_person = vorkenntnisse_person.split(",")
            for vorkenntniss in vorkenntnisse_list_person:
                vorkenntnisse_sammlung.append(vorkenntniss)

            lerninteressen_person = person_lernvorliebe.get_lerninteressen().lower().replace(" ", "")
            lerninteressen_list_person = lerninteressen_person.split(",")
            for lerninteresse in lerninteressen_list_person:
                lerninteressen_sammlung.append(lerninteresse)

        teilnahmen_anzahl = len(alle_teilnahmen)
        frequenz_extro_remote_schnitt = []
        for wert in frequenz_extro_remote_sammlung:
            frequenz_extro_remote_schnitt.append(wert/teilnahmen_anzahl)

        gruppen_lernvorliebe.set_frequenz(frequenz_extro_remote_schnitt[0])
        gruppen_lernvorliebe.set_extrovertiertheit(frequenz_extro_remote_schnitt[1])
        gruppen_lernvorliebe.set_remote_praesenz(frequenz_extro_remote_schnitt[2])

        vorkenntnisse_gruppe_list = []
        for vorkenntniss in vorkenntnisse_sammlung:
            if vorkenntnisse_sammlung.count(vorkenntniss) > 1:
                if vorkenntniss not in vorkenntnisse_gruppe_list:
                    vorkenntnisse_gruppe_list.append(vorkenntniss)
        vorkenntnisse_gruppe_final = ", ".join(vorkenntnisse_gruppe_list)

        gruppen_lernvorliebe.set_vorkenntnisse(vorkenntnisse_gruppe_final)

        lerninteressen_gruppe_list = []
        for lerninteresse in lerninteressen_sammlung:
            if lerninteressen_sammlung.count(lerninteresse) > 1:
                if lerninteresse not in lerninteressen_gruppe_list:
                    lerninteressen_gruppe_list.append(lerninteresse)
        lerninteressen_gruppe_final = ", ".join(lerninteressen_gruppe_list)

        gruppen_lernvorliebe.set_lerninteressen(lerninteressen_gruppe_final)

        gruppen_lerntyp = 1
        lerntypen_counter = {}
        for lerntyp in lerntypen_sammlung:
            lerntypen_counter[lerntyp] = lerntypen_counter.get(lerntyp, 0) + 1
        hoechste_anzahl = 0
        for lerntyp in lerntypen_counter:
            lerntyp_anzahl = lerntypen_counter[lerntyp]
            if lerntyp_anzahl > hoechste_anzahl:
                hoechste_anzahl = lerntyp_anzahl
                gruppen_lerntyp = lerntyp

        gruppen_lernvorliebe.set_lerntyp(gruppen_lerntyp)
        adm.save_lernvorliebe(gruppen_lernvorliebe)

        vorschlaege_der_gruppe = adm.get_gruppen_vorschlaege_for_gruppen_id(gruppen_id)
        for vorschlag in vorschlaege_der_gruppe:
            adm.match_gruppen(vorschlag)

    def match(self, partnervorschlag: PartnerVorschlag):
        a = Admin()
        personid = partnervorschlag.get_person_id()
        partnerid = partnervorschlag.get_partner_id()
        person = a.get_person_by_id(personid)
        partner = a.get_person_by_id(partnerid)
        personprofil = a.get_profil_by_id(person.get_profil_id())
        partnerprofil = a.get_profil_by_id(partner.get_profil_id())
        lernvorliebeperson = a.get_lernvorliebe_by_id(personprofil.get_lernvorlieben_id())
        lernvorliebepartner = a.get_lernvorliebe_by_id(partnerprofil.get_lernvorlieben_id())
        listeperson = [lernvorliebeperson.get_frequenz(), lernvorliebeperson.get_extrovertiertheit(),
                       lernvorliebeperson.get_remote_praesenz()]
        listepartner = [lernvorliebepartner.get_frequenz(), lernvorliebepartner.get_extrovertiertheit(),
                        lernvorliebepartner.get_remote_praesenz()]

        aehnlichkeit = 0
        count = 0
        for aufruf in listeperson:
            if aufruf - listepartner[count] == 0:
                aehnlichkeit += 10
                count += 1
            elif aufruf - listepartner[count] == 1 or aufruf - listepartner[count] == -1:
                aehnlichkeit += 5
                count += 1
            elif aufruf - listepartner[count] == 2 or aufruf - listepartner[count] == -2:
                aehnlichkeit += 1
                count += 1
            elif aufruf - listepartner[count] == 3 or aufruf - listepartner[count] == -3:
                aehnlichkeit -= 2
                count += 1
            else:
                aehnlichkeit -= 5
                count += 1
        if lernvorliebeperson.get_lerntyp() == lernvorliebepartner.get_lerntyp():
            aehnlichkeit += 10

        lerninteressenperson = lernvorliebeperson.get_lerninteressen().lower().replace(" ", "")
        lerninteressenpartner = lernvorliebepartner.get_lerninteressen().lower().replace(" ", "")
        lerninteressen_list_person = lerninteressenperson.split(",")
        lerninteressen_list_partner = lerninteressenpartner.split(",")
        for lerninteresse in lerninteressen_list_person:
            if lerninteressen_list_partner.count(lerninteresse) > 0:
                aehnlichkeit += 15

        with PartnerVorschlagMapper() as mapper:
            result = mapper.find_by_key(partnervorschlag.get_id())
            result.set_aehnlichkeit(aehnlichkeit)
            mapper.update(result)

    def match_gruppen(self, gruppenvorschlag: GruppenVorschlag):
        a = Admin()
        personid = gruppenvorschlag.get_person_id()
        gruppenid = gruppenvorschlag.get_gruppen_id()
        person = a.get_person_by_id(personid)
        gruppe = a.get_lerngruppe_by_id(gruppenid)
        personprofil = a.get_profil_by_id(person.get_profil_id())
        gruppenprofil = a.get_profil_by_id(gruppe.get_profil_id())
        lernvorliebeperson = a.get_lernvorliebe_by_id(personprofil.get_lernvorlieben_id())
        lernvorliebegruppe = a.get_lernvorliebe_by_id(gruppenprofil.get_lernvorlieben_id())
        listeperson = [lernvorliebeperson.get_frequenz(), lernvorliebeperson.get_extrovertiertheit(),
                       lernvorliebeperson.get_remote_praesenz()]
        listegruppe = [lernvorliebegruppe.get_frequenz(), lernvorliebegruppe.get_extrovertiertheit(),
                       lernvorliebegruppe.get_remote_praesenz()]

        aehnlichkeit = 0
        count = 0
        for aufruf in listeperson:
            if aufruf - listegruppe[count] == 0:
                aehnlichkeit += 10
                count += 1
            elif aufruf - listegruppe[count] == 1 or aufruf - listegruppe[count] == -1:
                aehnlichkeit += 5
                count += 1
            elif aufruf - listegruppe[count] == 2 or aufruf - listegruppe[count] == -2:
                aehnlichkeit += 1
                count += 1
            elif aufruf - listegruppe[count] == 3 or aufruf - listegruppe[count] == -3:
                aehnlichkeit -= 2
                count += 1
            else:
                aehnlichkeit -= 5
                count += 1
        if lernvorliebeperson.get_lerntyp() == lernvorliebegruppe.get_lerntyp():
            aehnlichkeit += 10
        lerninteressenperson = lernvorliebeperson.get_lerninteressen()
        lerninteressengruppe = lernvorliebegruppe.get_lerninteressen()
        lerninteressenperson = lernvorliebeperson.get_lerninteressen().lower().replace(" ", "")
        lerninteressengruppe = lernvorliebegruppe.get_lerninteressen().lower().replace(" ", "")
        lerninteressen_list_person = lerninteressenperson.split(",")
        lerninteressen_list_gruppe = lerninteressengruppe.split(",")
        for lerninteresse in lerninteressen_list_person:
            if lerninteressen_list_gruppe.count(lerninteresse) > 0:
                aehnlichkeit += 15

        with GruppenVorschlagMapper() as mapper:
            result = mapper.find_by_key(gruppenvorschlag.get_id())
            result.set_aehnlichkeit(aehnlichkeit)
            mapper.update(result)
