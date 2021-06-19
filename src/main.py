"""
Dieses Module trägt den Namen main.py.
Durch diese Namensgebung erleichtert sich das Deployment über die Google App Engine,
da Google dort jenen Namen bevorzugt.

Konkret wird hier eine Flask-Instanz erstellt. Hinzu kommt die REST-API über das Package flask-restx.
Ergänzt wird der Service durch die Implementierung von CORS (Cross Origin Resource Sharing).
Dies wird benötigt, damitdie Webanwendung die Berechtigung hat auf Ressourcen zurückzugreifen,
die auf einer Domain eines anderen Server liegen.
"""

# Zuerst werden die Imports getätigt.
# Die allgemeinen Anforderungen (Packages) für das Backend sollten der requirements.txt entnommen werden.
# Der Service basiert auf Flask:
from flask import Flask, request

# Wir nutzen RestX für das API
from flask_restx import Api, Resource, fields, namespace

# Um CORS zu ermöglichen benötigen wir das entsprechende Package
from flask_cors import CORS

# SECURITY DECORATOR IMPORTIEREN (muss noch gecodet werden)
from SecurityDecorator import secured

# Mapper implementieren

from server.bo.ChatTeilnahme import ChatTeilnahme
from server.bo.GruppenTeilnahme import GruppenTeilnahme
from server.bo.GruppenVorschlag import GruppenVorschlag
from server.bo.Konversation import Konversation
from server.bo.Lerngruppe import Lerngruppe
from server.bo.Lernvorliebe import Lernvorliebe
from server.bo.Nachricht import Nachricht
from server.bo.PartnerVorschlag import PartnerVorschlag
from server.bo.Person import Person
from server.bo.Profil import Profil
from server.Admin import Admin

from server.Algorithmus import Algorithmus

"""
Zuerst wird Flask instanziiert.
Anschließend instanziieren wir ein API-Objekt und übergeben unsere app als Argument.
"""
app = Flask(__name__)

CORS(app, resources=r'/studoo/*')

api = Api(app)

studoo = api.namespace("studoo", description="Lernapp SWP")

# CORS implementieren

"""
Implementation Flask REST
"""
#  Hier drunter die BO implementieren als model -> api.inherit("<name>", bo, {...})

bo = api.model(
    'BusinessObject',
    {
        'id': fields.Integer(attribute='_id', description='Die ID eines Business Objects'),
        'erstellungszeitpunkt': fields.String(attribute="_erstellungszeitpunkt", description='Timestamp des BO')
    })

nachricht = api.inherit(
    "Nachricht", bo,
    {
        "inhalt": fields.String(attribute="_inhalt", description="Nachrichteninhalt"),
        "absender_id": fields.Integer(attribute="_absender_id", description="Absender"),
        "konversation_id": fields.Integer(attribute="_konversation_id", description="Konversationszugehörigkeit")
    }
)

### Hier drunter die BO implementieren als model -> api.inherit("<name>", bo, {...})

gruppenteilnahme = api.inherit(
    "GruppenTeilnahme", bo,
    {
        "person_id": fields.Integer(attribute="_person_id", description="Useridentifikation"),
        "gruppen_id": fields.Integer(attribute="_gruppen_id", description="Gruppenidentifikation"),
        "ist_admin": fields.Boolean(attribute="_ist_admin", description="Berechtigunsüberprüfung")
    }
)

konversation = api.inherit(
    "Konversation", bo, {
        "ist_gruppenchat": fields.Boolean(attribute="_ist_gruppenchat",
                                          description="Konversation einer Gruppe (True) oder zwischen zwei Personen (False)")
    }

)

lernvorlieben = api.inherit(
    "Lernvorliebe", bo, {
        "lerntyp": fields.Integer(attribute="_lerntyp", description="Lerntyp"),
        "frequenz": fields.Integer(attribute="_frequenz", description="Lernfrequenz des Studis"),
        "extrovertiertheit": fields.Integer(attribute="_extrovertiertheit", description="Grad der Extrovertiertheit"),
        "remote_praesenz": fields.Integer(attribute="_remote_praesenz",
                                          description="Definiert Präferenz, ob lieber von Zuhause oder vor Ort gelernt wird"),
        "vorkenntnisse": fields.String(attribute="_vorkenntnisse", description="Angabe der Vorkenntnisse"),
        "lerninteressen": fields.String(attribute="_lerninteressen", description="Angabe der Lerninteressen")
    }
)

lerngruppe = api.inherit(
    "Lerngruppe", bo, {
        "gruppenname": fields.String(attribute="_gruppenname", description="Gruppenname"),
        "profil_id": fields.Integer(attribute="_profil_id", description="Profil ID"),
        "konversation_id": fields.Integer(attribute="_konversation_id", description="Konversation ID")
    }
)

profil = api.inherit(
    "Profil", bo, {
        "lernvorlieben_id": fields.Integer(attribute="_lernvorlieben_id", description="Lernvorlieben_id")
    }
)

person = api.inherit(
    'Person', bo,
    {
        'name': fields.String(attribute="_name", description="Der Name einer Person"),
        'email': fields.String(attribute="_email", description="Die Email einer Person"),
        'google_user_id': fields.String(attribute="_google_user_id", description="Die Google-User-ID einer Person"),
        'alter': fields.Integer(attribute="_alter", description="Das Alter einer Person"),
        'studiengang': fields.String(attribute="_studiengang",
                                     description="Der Studiengang in welchem sich eine Person befindet"),
        'wohnort': fields.String(attribute="_wohnort", description="Der Wohnort einer Person"),
        'semester': fields.Integer(attribute="_semester", description=" Das Semester in dem sich eine Person befindet"),
        'profil_id': fields.Integer(attribute="_profil_id", description="Fremdschlüsselbeziehung zum Profil der Person")
    }
)

chatteilnahme = api.inherit(
    "ChatTeilnahme", bo, {
        "person_id": fields.Integer(attribute="_person_id",
                                    description="ID der Person, welche an einer Konversation teilnimmt"),
        "konversation_id": fields.Integer(attribute="_konversation_id",
                                          description="ID der Konversation, an welcher eine Person teilnimmt")
    }
)

partnervorschlag = api.inherit(
    "PartnerVorschlag", bo, {
        "person_id": fields.Integer(attribute="_person_id", description="ID der Person"),
        "partner_id": fields.Integer(attribute="_partner_id", description="ID des Partners"),
        "aehnlichkeit": fields.Float(attribute="_aehnlichkeit",
                                     description="Berechnete Ähnlichkeit der Person zum potentiellen Partner"),
        "matchpoints": fields.Integer(attribute="_matchpoints", description="Matchpoints des Vorschlags"),
        "entscheidung_person": fields.Boolean(attribute="_entscheidung_person",
                                              description="Ob Person eine Entscheidung getroffen hat"),
        "entscheidung_partner": fields.Boolean(attribute="_entscheidung_partner",
                                               description="Ob Partner eine Entscheidung getroffen hat")
    }
)

gruppenvorschlag = api.inherit(
    "GruppenVorschlag", bo, {
        "person_id": fields.Integer(attribute="_person_id", description="ID der Person"),
        "gruppen_id": fields.Integer(attribute="_gruppen_id", description="ID der Gruppe"),
        "aehnlichkeit": fields.Float(attribute="_aehnlichkeit",
                                     description="Berechnete Ähnlichkeit der Person zur Gruppe"),
        "matchpoints": fields.Integer(attribute="_matchpoints", description="Matchpoints des Vorschlags"),
        "entscheidung_person": fields.Boolean(attribute="_entscheidung_person",
                                              description="Ob die Person eine Entscheidung getroffen hat"),
        "entscheidung_gruppe": fields.Boolean(attribute="_entscheidung_gruppe",
                                              description="Ob die Gruppe eine Entscheidung getroffen hat")
    }
)

"""
API Routes
"""


@studoo.route('/nachrichten')
@studoo.response(500, 'Falls es zu einem Fehler kommt')
class NachrichtenListOperations(Resource):

    @studoo.marshal_list_with(nachricht)
    @secured
    def get(self):
        adm = Admin()
        return adm.get_all_nachrichten()

    @studoo.marshal_with(nachricht, code=200)
    @studoo.expect(nachricht)
    @secured
    def post(self):
        adm = Admin()
        proposal = Nachricht.from_dict(api.payload)
        if proposal is not None:
            n = adm.create_nachricht(proposal.get_inhalt(), proposal.get_absender_id(), proposal.get_konversation_id())
            return n, 200
        else:
            return '', 500


@studoo.route('/nachricht/<int:id>')
@studoo.response(500, 'Falls es zu einem Fehler kommt')
class NachrichtOperations(Resource):

    @studoo.marshal_with(nachricht)
    @secured
    def get(self, id):
        adm = Admin()
        return adm.get_nachricht_by_id(id)

    @studoo.marshal_with(nachricht)
    @studoo.expect(nachricht, validate=True)
    @secured
    def put(self, id):
        adm = Admin()
        p = Nachricht.from_dict(api.payload)

        if p is not None:
            p.set_id(id)
            adm.save_nachricht(p)
            return '', 200
        else:
            return '', 500

    @secured
    def delete(self, id):
        adm = Admin()
        message = adm.get_nachricht_by_id(id)
        adm.delete_nachricht(message)
        return '', 200


@studoo.route('/konversation/<int:konversation_id>/nachrichten')
@studoo.response(500, 'Falls es zu einem Fehler kommt')
class NachrichtenByKonversationIDOperations(Resource):

    @studoo.marshal_with(nachricht)
    @secured
    def get(self, konversation_id):
        adm = Admin()
        return adm.get_nachrichten_by_konversation_id(konversation_id)


@studoo.route('/konversation/<int:id>')
@studoo.response(500, 'Falls es zu einem Fehler kommt')
class KonversationOperations(Resource):

    @studoo.marshal_with(konversation)
    @secured
    def get(self, id):
        adm = Admin()
        return adm.get_konversation_by_id(id)

    @studoo.marshal_with(konversation)
    @studoo.expect(konversation, validate=True)
    @secured
    def put(self, id):
        adm = Admin()
        p = Konversation.from_dict(api.payload)

        if p is not None:
            p.set_id(id)
            adm.save_konversation(p)
            return '', 200
        else:
            return '', 500

    @secured
    def delete(self, id):
        adm = Admin()
        conv = adm.get_konversation_by_id(id)
        adm.delete_konversation(conv)
        return '', 200


@studoo.route('/konversationen')
@studoo.response(500, 'Falls es zu einem Fehler kommt')
class KonversationListOperations(Resource):

    @studoo.marshal_list_with(konversation)
    @secured
    def get(self):
        adm = Admin()
        return adm.get_all_konversationen()

    @studoo.marshal_with(konversation, code=200)
    @studoo.expect(konversation)
    @secured
    def post(self):
        adm = Admin()
        proposal = Konversation.from_dict(api.payload)
        if proposal is not None:
            p = adm.create_konversation(proposal.get_ist_gruppenchat())
            return p, 200
        else:
            return '', 500


@studoo.route('/person/<int:person_id>/konversationen')
@studoo.response(500, 'Falls es zu einem Fehler kommt')
class KonversationenByPersonIDOperations(Resource):

    @studoo.marshal_with(konversation)
    @secured
    def get(self, person_id):
        """Auslesen einer bestimmten Lerngruppe."""
        admin = Admin()
        return admin.get_konversationen_by_person_id(person_id)


@studoo.route('/personen')
@studoo.response(500, 'Falls es zu einem Fehler kommt')
class PersonenListOperations(Resource):

    @studoo.marshal_list_with(person)
    @secured
    def get(self):
        adm = Admin()
        return adm.get_all_personen()

    @studoo.marshal_with(person, code=200)
    @studoo.expect(person)
    @secured
    def post(self):
        adm = Admin()
        proposal = Person.from_dict(api.payload)
        if proposal is not None:
            p = adm.create_person(proposal.get_name(), proposal.get_email(), proposal.get_google_user_id(),
                                  proposal.get_alter(), proposal.get_studiengang(), proposal.get_wohnort(),
                                  proposal.get_semester(), proposal.get_profil_id())
            return p, 200
        else:
            return '', 500


@studoo.route('/konversation/<int:konversation_id>/personen')
@studoo.response(500, 'Falls es zu einem Fehler kommt')
class PersonenByKonversationIDOperations(Resource):

    @studoo.marshal_list_with(person)
    @secured
    def get(self, konversation_id):
        adm = Admin()
        return adm.get_personen_by_konversation_id(konversation_id)


@studoo.route('/person/<int:id>')
@studoo.response(500, 'Falls es zu einem Fehler kommt')
class PersonOperations(Resource):

    @studoo.marshal_with(person)
    @secured
    def get(self, id):
        adm = Admin()
        return adm.get_person_by_id(id)

    @studoo.marshal_with(person)
    @studoo.expect(person, validate=True)
    @secured
    def put(self, id):
        adm = Admin()
        p = Person.from_dict(api.payload)

        if p is not None:
            p.set_id(id)
            adm.save_person(p)
            return '', 200
        else:
            return '', 500

    @secured
    def delete(self, id):
        adm = Admin()
        pers = adm.get_person_by_id(id)
        adm.delete_person(pers)
        return '', 200


@studoo.route('/googleuserid/<uid>/person')
@studoo.response(500, 'Falls es zu einem Fehler kommt')
class PersonUIDOperations(Resource):

    @studoo.marshal_with(person)
    @secured
    def get(self, uid):
        adm = Admin()
        return adm.get_person_by_google_user_id(uid)


@studoo.route('/lernvorlieben')
@studoo.response(500, 'Falls es zu einem Fehler kommt')
class LernvorliebenListOperations(Resource):

    @studoo.marshal_list_with(lernvorlieben)
    @secured
    def get(self):
        """Auslesen aller Lernvorlieben"""
        adm = Admin()
        return adm.get_all_lernvorlieben()

    @studoo.marshal_with(lernvorlieben, code=200)
    @studoo.expect(lernvorlieben)
    @secured
    def post(self):
        """Anlegen eines neuer Lernvorlieben"""
        adm = Admin()
        proposal = Lernvorliebe.from_dict(api.payload)
        if proposal is not None:
            lv = adm.create_lernvorliebe(proposal.get_lerntyp(), proposal.get_frequenz(),
                                         proposal.get_extrovertiertheit(), proposal.get_remote_praesenz(),
                                         proposal.get_vorkenntnisse(), proposal.get_lerninteressen())
            return lv, 200
        else:
            return '', 500


@studoo.route('/lernvorliebe/<int:id>')
@studoo.response(500, 'Falls es zu einem Fehler kommt')
class LernvorliebeOperations(Resource):

    @studoo.marshal_with(lernvorlieben)
    @secured
    def get(self, id):
        """Auslesen einer bestimmten Lernvorliebe"""
        adm = Admin()
        return adm.get_lernvorliebe_by_id(id)

    @studoo.marshal_with(lernvorlieben)
    @studoo.expect(lernvorlieben, validate=True)
    @secured
    def put(self, id):
        """Update einer bestimmten Lernvorliebe"""
        adm = Admin()
        lv = Lernvorliebe.from_dict(api.payload)

        if lv is not None:
            lv.set_id(id)
            adm.save_lernvorliebe(lv)
            algo = Algorithmus()
            person = adm.get_person_by_profil_id(adm.get_profil_by_lernvorlieben_id(id).get_id())
            vorschlaege = adm.get_all_partnervorschlaege_for_person_id(person.get_id())
            for vorschlag in vorschlaege:
                algo.match(vorschlag)
            return '', 200
        else:
            return '', 500

    @secured
    def delete(self, id):
        """Löschen einer bestimmten Lernvorliebe"""
        adm = Admin()
        lv = adm.get_lernvorliebe_by_id(id)
        adm.delete_lernvorliebe(lv)
        return '', 200


@studoo.route('/gruppenteilnahmen')
@studoo.response(500, 'Falls es zu einem Fehler kommt')
class GruppenTeilnahmeListOperations(Resource):

    @studoo.marshal_list_with(gruppenteilnahme)
    @secured
    def get(self):
        """Auslesen aller GruppenTeilnahme-Objekte"""
        adm = Admin()
        gt = adm.get_all_gruppen_teilnahme()
        return gt

    @studoo.marshal_with(gruppenteilnahme, code=200)
    @studoo.expect(gruppenteilnahme)
    @secured
    def post(self):
        """Anlegen eines neuen GruppenTeilnahme-Objektes"""
        adm = Admin()
        proposal = GruppenTeilnahme.from_dict(api.payload)
        if proposal is not None:
            gt = adm.create_gruppen_teilnahme(proposal.get_person_id(), proposal.get_gruppen_id(), proposal.get_ist_admin())
            return gt, 200
        else:
            return '', 500


@studoo.route('/gruppenteilnahme/<int:id>')
@studoo.response(500, 'Falls es zu einem Fehler kommt')
class GruppenTeilnahmeOperations(Resource):

    @studoo.marshal_with(gruppenteilnahme)
    @secured
    def get(self, id):
        """Auslesen eines bestimmten GruppenTeilnahme-Objektes"""
        adm = Admin()
        return adm.get_gruppen_teilnahme_by_id(id)

    @studoo.marshal_with(gruppenteilnahme)
    @studoo.expect(gruppenteilnahme, validate=True)
    @secured
    def put(self, id):
        """Update eines bestimmten GruppenTeilnahme-Objektes"""
        adm = Admin()
        gt = GruppenTeilnahme.from_dict(api.payload)

        if gt is not None:
            gt.set_id(id)
            adm.save_gruppen_teilnahme(gt)
            return '', 200
        else:
            return '', 500

    @secured
    def delete(self, id):
        """Löschen eines bestimmten GruppenTeilnahme-Objektes"""
        adm = Admin()
        gruppenteil = adm.get_gruppen_teilnahme_by_id(id)
        adm.delete_gruppen_teilnahme(gruppenteil)
        return '', 200


@studoo.route('/person/<int:person_id>/gruppe/<int:gruppen_id>/gruppenteilnahme')
@studoo.response(500, 'Falls es zu einem Fehler kommt')
class GruppenTeilnahmeByPersonIDundGruppenIDOperations(Resource):

    @studoo.marshal_with(gruppenteilnahme)
    @secured
    def get(self, person_id, gruppen_id):
        """Auslesen eines bestimmten GruppenTeilnahme-Objektes"""
        adm = Admin()
        return adm.get_gruppen_teilnahme_by_person_id_und_gruppen_id(person_id, gruppen_id)


@studoo.route('/gruppe/<int:gruppen_id>/gruppenteilnahmen')
@studoo.response(500, 'Falls es zu einem Fehler kommt')
class GruppenTeilnahmenByGruppenIDOperations(Resource):

    @studoo.marshal_with(gruppenteilnahme)
    @secured
    def get(self, gruppen_id):
        """Auslesen eines bestimmten GruppenTeilnahme-Objektes"""
        adm = Admin()
        return adm.get_all_gruppen_teilnahmen_for_gruppen_id(gruppen_id)


@studoo.route('/chatteilnahmen')
@studoo.response(500, 'Falls es zu einem Fehler kommt')
class ChatteilnahmenListOperations(Resource):

    @studoo.marshal_list_with(chatteilnahme)
    @secured
    def get(self):
        adm = Admin()
        return adm.get_all_chatteilnahmen()

    @studoo.marshal_with(chatteilnahme, code=200)
    @studoo.expect(chatteilnahme)
    @secured
    def post(self):
        adm = Admin()
        proposal = ChatTeilnahme.from_dict(api.payload)
        if proposal is not None:
            p = adm.create_chatteilnahme(proposal.get_person_id(), proposal.get_konversation_id())
            return p, 200
        else:
            return '', 500


@studoo.route('/chatteilnahme/<int:id>')
@studoo.response(500, 'Falls es zu einem Fehler kommt')
class ChatteilnahmeOperations(Resource):

    @studoo.marshal_with(chatteilnahme)
    @secured
    def get(self, id):
        adm = Admin()
        return adm.get_chatteilnahme_by_id(id)

    @studoo.marshal_with(chatteilnahme)
    @studoo.expect(chatteilnahme, validate=True)
    @secured
    def put(self, id):
        adm = Admin()
        p = ChatTeilnahme.from_dict(api.payload)

        if p is not None:
            p.set_id(id)
            adm.save_chatteilnahme(p)
            return '', 200
        else:
            return '', 500

    @secured
    def delete(self, id):
        adm = Admin()
        ct = adm.get_chatteilnahme_by_id(id)
        adm.delete_chatteilnahme(ct)
        return '', 200


@studoo.route('/person/<int:person_id>/konversation/<int:konversation_id>/chatteilnahme')
@studoo.response(500, 'Falls es zu einem Fehler kommt')
class ChatteilnahmeByPersonIDundKonversationIDOperations(Resource):

    @studoo.marshal_with(chatteilnahme)
    @secured
    def get(self, person_id, konversation_id):
        adm = Admin()
        return adm.get_chatteilnahme_by_person_id_und_konversation_id(person_id, konversation_id)


@studoo.route('/partnervorschlaege')
@studoo.response(500, 'Falls es zu einem Fehler kommt')
class PartnervorschlaegeListOperations(Resource):

    @studoo.marshal_list_with(partnervorschlag)
    @secured
    def get(self):
        adm = Admin()
        return adm.get_all_partner_vorschlag()

    @studoo.marshal_with(partnervorschlag, code=200)
    @studoo.expect(partnervorschlag)
    @secured
    def post(self):
        adm = Admin()
        proposal = PartnerVorschlag.from_dict(api.payload)
        if proposal is not None:
            p = adm.create_partnervorschlag(proposal.get_person_id(), proposal.get_partnervorschlag_id(),
                                            proposal.get_aehnlichkeit(), proposal.get_matchpoints(),
                                            proposal.get_entscheidung_person(), proposal.get_entscheidung_partner())
            return p, 200
        else:
            return '', 500


@studoo.route('/partnervorschlag/<int:id>')
@studoo.response(500, 'Falls es zu einem Fehler kommt')
class PartnervorschlagOperations(Resource):

    @studoo.marshal_with(partnervorschlag)
    @secured
    def get(self, id):
        adm = Admin()
        return adm.get_partner_vorschlag_by_id(id)

    @studoo.marshal_with(partnervorschlag)
    @studoo.expect(partnervorschlag, validate=True)
    @secured
    def put(self, id):
        adm = Admin()
        p = PartnerVorschlag.from_dict(api.payload)

        if p is not None:
            p.set_id(id)
            adm.save_partner_vorschlag(p)
            vorschlag = adm.get_partner_vorschlag_by_id(p.get_id())
            if vorschlag.get_matchpoints() >= 2:
                chat = adm.create_konversation(ist_gruppenchat=False)
                adm.create_chatteilnahme(person_id=vorschlag.get_person_id(), konversation_id=chat.get_id())
                adm.create_chatteilnahme(person_id=vorschlag.get_partner_id(), konversation_id=chat.get_id())
            return '', 200
        else:
            return '', 500

    @secured
    def delete(self, id):
        adm = Admin()
        pv = adm.get_partner_vorschlag_by_id(id)
        adm.delete_partner_vorschlag(pv)
        return '', 200


@studoo.route('/person/<int:person_id>/partnervorschlag')
@studoo.response(500, 'Falls es zu einem Fehler kommt')
class PartnervorschlagForPersonIDOperations(Resource):

    @studoo.marshal_with(partnervorschlag)
    @secured
    def get(self, person_id):
        adm = Admin()
        return adm.get_best_partner_vorschlag_for_person_id(person_id)


@studoo.route('/person/<int:person_id>/partnervorschlaege/eingehend')
@studoo.response(500, 'Falls es zu einem Fehler kommt')
class EingehendePartnervorschlaegeForPersonIDOperations(Resource):

    @studoo.marshal_with(partnervorschlag)
    @secured
    def get(self, person_id):
        adm = Admin()
        return adm.get_eingehende_partner_vorschlaege_for_person_id(person_id)


@studoo.route('/person/<int:person_id>/partnervorschlaege/ausgehend')
@studoo.response(500, 'Falls es zu einem Fehler kommt')
class AusgehendePartnervorschlaegeForPersonIDOperations(Resource):

    @studoo.marshal_with(partnervorschlag)
    @secured
    def get(self, person_id):
        adm = Admin()
        return adm.get_ausgehende_partner_vorschlaege_for_person_id(person_id)


@studoo.route('/gruppenvorschlaege')
@studoo.response(500, 'Falls es zu einem Fehler kommt')
class GruppenvorschlaegeListOperations(Resource):

    @studoo.marshal_list_with(gruppenvorschlag)
    @secured
    def get(self):
        adm = Admin()
        return adm.get_all_gruppenvorschlaege()

    @studoo.marshal_with(gruppenvorschlag, code=200)
    @studoo.expect(gruppenvorschlag)
    @secured
    def post(self):
        adm = Admin()
        proposal = GruppenVorschlag.from_dict(api.payload)
        if proposal is not None:
            p = adm.create_gruppenvorschlag(proposal.get_person_id(), proposal.get_gruppen_id(),
                                            proposal.get_aehnlichkeit(), proposal.get_matchpoints(),
                                            proposal.get_entscheidung_person(), proposal.get_entscheidung_gruppe())
            return p, 200
        else:
            return '', 500


@studoo.route('/gruppenvorschlag/<int:id>')
@studoo.response(500, 'Falls es zu einem Fehler kommt')
class GruppenvorschlagOperations(Resource):

    @studoo.marshal_with(gruppenvorschlag)
    @secured
    def get(self, id):
        adm = Admin()
        return adm.get_gruppenvorschlag_by_id(id)

    @studoo.marshal_with(gruppenvorschlag)
    @studoo.expect(gruppenvorschlag, validate=True)
    @secured
    def put(self, id):
        adm = Admin()
        p = GruppenVorschlag.from_dict(api.payload)

        if p is not None:
            p.set_id(id)
            adm.save_gruppenvorschlag(p)
            vorschlag = adm.get_gruppenvorschlag_by_id(p.get_id())
            aktuelle_lerngruppe = adm.get_lerngruppe_by_id(vorschlag.get_gruppen_id())
            if vorschlag.get_matchpoints() >= 2:
                adm.create_gruppen_teilnahme(vorschlag.get_person_id(), vorschlag.get_gruppen_id(), False)
                adm.create_chatteilnahme(vorschlag.get_person_id(), aktuelle_lerngruppe.get_konversation_id())
            return '', 200
        else:
            return '', 500

    @secured
    def delete(self, id):
        adm = Admin()
        pv = adm.get_gruppenvorschlag_by_id(id)
        adm.delete_gruppenvorschlag(pv)
        return '', 200


@studoo.route('/person/<int:person_id>/gruppenvorschlag')
@studoo.response(500, 'Falls es zu einem Fehler kommt')
class GruppenvorschlagByPersonIDOperations(Resource):

    @studoo.marshal_with(gruppenvorschlag)
    @secured
    def get(self, person_id):
        adm = Admin()
        return adm.get_best_gruppenvorschlag_for_person_id(person_id)


@studoo.route('/person/<int:person_id>/gruppenvorschlaege/eingehend')
@studoo.response(500, 'Falls es zu einem Fehler kommt')
class EingehendeGruppenvorschlaegeForPersonIDOperations(Resource):

    @studoo.marshal_with(gruppenvorschlag)
    @secured
    def get(self, person_id):
        adm = Admin()
        return adm.get_eingehende_gruppen_vorschlaege_for_person_id(person_id)


@studoo.route('/person/<int:person_id>/gruppenvorschlaege/ausgehend')
@studoo.response(500, 'Falls es zu einem Fehler kommt')
class AusgehendeGruppenvorschlaegeForPersonIDOperations(Resource):

    @studoo.marshal_with(gruppenvorschlag)
    @secured
    def get(self, person_id):
        adm = Admin()
        return adm.get_ausgehende_gruppen_vorschlaege_for_person_id(person_id)


@studoo.route('/gruppe/<int:gruppen_id>/gruppenvorschlaege/eingehend')
@studoo.response(500, 'Falls es zu einem Fehler kommt')
class EingehendeGruppenvorschlaegeForGruppenIDOperations(Resource):

    @studoo.marshal_with(gruppenvorschlag)
    @secured
    def get(self, gruppen_id):
        adm = Admin()
        return adm.get_eingehende_gruppen_vorschlaege_for_gruppen_id(gruppen_id)


@studoo.route('/gruppe/<int:gruppen_id>/gruppenvorschlaege')
@studoo.response(500, 'Falls es zu einem Fehler kommt')
class GruppenvorschlaegeForGruppenIDOperations(Resource):

    @studoo.marshal_with(gruppenvorschlag)
    @secured
    def get(self, gruppen_id):
        adm = Admin()
        return adm.get_gruppen_vorschlaege_for_gruppen_id(gruppen_id)


@studoo.route('/lerngruppen')
@studoo.response(500, 'Falls es zu einem Fehler kommt')
class LerngruppenListOperations(Resource):

    @studoo.marshal_list_with(lerngruppe)
    @secured
    def get(self):
        """Auslesen aller Lerngruppen."""
        admin = Admin()
        lerngruppen = admin.get_all_lerngruppen()
        return lerngruppen

    @studoo.marshal_with(lerngruppe, code=200)
    @studoo.expect(lerngruppe)
    @secured
    def post(self):
        """Anlegen einer bestimmten Lerngruppe."""
        admin = Admin()
        proposal = Lerngruppe.from_dict(api.payload)
        if proposal is not None:
            lg = admin.create_lerngruppe(proposal.get_gruppenname(), proposal.get_profil_id(),
                                         proposal.get_konversation_id())
            return lg, 200
        else:
            return '', 500


@studoo.route('/lerngruppe/<int:id>')
@studoo.response(500, 'Falls es zu einem Fehler kommt')
class LerngruppenOperations(Resource):

    @studoo.marshal_with(lerngruppe)
    @secured
    def get(self, id):
        """Auslesen einer bestimmten Lerngruppe."""
        admin = Admin()
        return admin.get_lerngruppe_by_id(id)

    @studoo.marshal_with(lerngruppe)
    @studoo.expect(lerngruppe, validate=True)
    @secured
    def put(self, id):
        """Update einer bestimmten Lerngruppe."""
        admin = Admin()
        lg = Lerngruppe.from_dict(api.payload)

        if lg is not None:
            lg.set_id(id)
            admin.save_lerngruppe(lg)
            return '', 200
        else:
            return '', 500

    @secured
    def delete(self, id):
        """Löschen einer bestimmten Lerngruppe."""
        admin = Admin()
        lg = admin.get_lerngruppe_by_id(id)
        admin.delete_lerngruppe(lg)
        return '', 200


@studoo.route('/person/<int:person_id>/lerngruppen')
@studoo.response(500, 'Falls es zu einem Fehler kommt')
class LerngruppenByPersonIDOperations(Resource):

    @studoo.marshal_with(lerngruppe)
    @secured
    def get(self, person_id):
        """Auslesen einer bestimmten Lerngruppe."""
        admin = Admin()
        return admin.get_lerngruppen_by_person_id(person_id)


@studoo.route('/konversation/<int:konversation_id>/lerngruppe')
@studoo.response(500, 'Falls es zu einem Fehler kommt')
class LerngruppenByKonversationIDOperations(Resource):

    @studoo.marshal_with(lerngruppe)
    @secured
    def get(self, konversation_id):
        """Auslesen einer bestimmten Lerngruppe."""
        admin = Admin()
        return admin.get_lerngruppe_by_konversation_id(konversation_id)


@studoo.route('/profile')
@studoo.response(500, 'Falls es zu einem Fehler kommt')
class ProfilListOperations(Resource):

    @studoo.marshal_list_with(profil)
    @secured
    def get(self):
        """Auslesen aller Profil-Objekte"""
        adm = Admin()
        p = adm.get_all_profile()
        return p

    @studoo.marshal_with(profil, code=200)
    @studoo.expect(profil)
    @secured
    def post(self):
        """Anlegen eines neuen Profil-Objektes"""
        adm = Admin()
        proposal = Profil.from_dict(api.payload)
        if proposal is not None:
            p = adm.create_profil(proposal.get_lernvorlieben_id())
            return p, 200
        else:
            return '', 500


@studoo.route('/profil/<int:id>')
@studoo.response(500, 'Falls es zu einem Fehler kommt')
class ProfilOperations(Resource):

    @studoo.marshal_with(profil)
    @secured
    def get(self, id):
        """Auslesen eines bestimmten Profil-Objektes"""
        adm = Admin()
        return adm.get_profil_by_id(id)

    @studoo.marshal_with(profil)
    @studoo.expect(profil, validate=True)
    @secured
    def put(self, id):
        """Update eines bestimmten Profil-Objektes"""
        adm = Admin()
        p = Profil.from_dict(api.payload)

        if p is not None:
            p.set_id(id)
            adm.save_profil(p)
            return '', 200
        else:
            return '', 500

    @secured
    def delete(self, id):
        """Löschen eines bestimmten Profil-Objektes"""
        adm = Admin()
        pr = adm.get_profil_by_id(id)
        adm.delete_profil(pr)
        return '', 200


"""
Der Service wird über app.run() gestartet.
Den Parameter 'debug' setzen wir auf True, um in der Development-Umgebung debuggen direkt im Browser anzeigen zu lassen.
Warnung: In der Produktions-Umgebung muss debug auf False gesetzt werden.
"""
if __name__ == "__main__":
    app.run(debug=True)
