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

"""
Zuerst wird Flask instanziiert.
Anschließend instanziieren wir ein API-Objekt und übergeben unsere app als Argument.
"""
app = Flask(__name__)
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
        "person": fields.Integer(attribute="_person_id", description="Useridentifikation"),
        "gruppe": fields.Integer(attribute="_gruppen_id", description="Gruppenidentifikation"),
        "istadmin": fields.Boolean(attribute="_ist_admin", description="Berechtigunsüberprüfung")
    }
)

konversation = api.inherit(
    "Konversation", bo, {
        "ist_gruppenchat": fields.Boolean(attribute="_ist_gruppenchat",
                                          description="Konversation einer Gruppe (True) oder zwischen zwei Personen (False)")
    }

)

lernvorliebe = api.inherit(
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
    "Person", bo,
    {
        "vorname": fields.String(attribute="_vorname", description="Der Vorname einer Person"),
        "nachname": fields.String(attribute="_nachname", description="Der Nachname einer Person"),
        "alter": fields.Integer(attribute="_alter", description="Das Alter einer Person"),
        "studiengang": fields.String(attribute="_studiengang",
                                     description="Der Studiengang in welchem sich eine Person befindet"),
        "wohnort": fields.String(attribute="_wohnort", description="Der Wohnort einer Person"),
        "semester": fields.Integer(attribute="_semester", description=" Das Semester in dem sich eine Person befindet"),
        "profil_id": fields.Integer(attribute="_profil_id", description="Fremdschlüsselbeziehung zum Profil der Person")
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
        "partnervorschlag_id": fields.Integer(attribute="_partnervorschlag_id", description="ID des Partners"),
        "aehnlichkeit": fields.Float(attribute="_aehnlichkeit",
                                     description="Berechnete Ähnlichkeit der Person zum potentiellen Partner"),
        "entscheidung_person": fields.Boolean(attribute="_entscheidung_person", description="Entscheidung der Person"),
        "entscheidung_partner": fields.Boolean(attribute="_entscheidung_partner",
                                               description="Entscheidung des Partners")
    }
)

gruppenvorschlag = api.inherit(
    "GruppenVorschlag", bo, {
        "person_id": fields.Integer(attribute="_person_id", description="ID der Person"),
        "gruppenvorschlag_id": fields.Integer(attribute="_gruppenvorschlag_id", description="ID der Gruppe"),
        "aehnlichkeit": fields.Float(attribute="_aehnlichkeit",
                                     description="Berechnete Ähnlichkeit der Person zur Gruppe"),
        "entscheidung_person": fields.Boolean(attribute="_entscheidung_person", description="Entscheidung der Person"),
        "entscheidung_gruppe": fields.Boolean(attribute="_entscheidung_gruppe", description="Entscheidung der Gruppe")
    }
)

"""
API Routes
"""


@studoo.route('/nachrichten')
@studoo.response(500, 'Falls es zu einem Fehler kommt')
class NachrichtenListOperations(Resource):

    @studoo.marshal_list_with(nachricht)
    def get(self):
        adm = Admin()
        return adm.get_all_nachrichten()

    @studoo.marshal_with(nachricht, code=200)
    @studoo.expect(nachricht)
    def post(self):
        adm = Admin()
        proposal = Nachricht.from_dict(api.payload)
        if proposal is not None:
            n = adm.create_nachricht(proposal.get_inhalt(), proposal.get_absender_id(), proposal.get_konversation_id())
            return n, 200
        else:
            return '', 500


@studoo.route('/konversationen/<int:id>')
@studoo.response(500, 'Falls es zu einem Fehler kommt')
class KonversationOperations(Resource):

    def delete(self, id):
        adm = Admin()
        conv = adm.get_konversation_by_id(id)
        adm.delete_konversation(conv)
        return '', 200


@studoo.route('/personen')
@studoo.response(500, 'Falls es zu einem Fehler kommt')
class PersonenListOperations(Resource):

    @studoo.marshal_list_with(person)
    def get(self):
        adm = Admin()
        return adm.get_all_personen()

    @studoo.marshal_with(person, code=200)
    @studoo.expect(person)
    def post(self):
        adm = Admin()
        proposal = Person.from_dict(api.payload)
        if proposal is not None:
            p = adm.create_person(proposal.get_vorname(), proposal.get_nachname(), proposal.get_alter(),
                                  proposal.get_studiengang(), proposal.get_wohnort(), proposal.get_semester(),
                                  proposal.get_profil_id())
            return p, 200
        else:
            return '', 500


@studoo.route('/person/<int:id>')
@studoo.response(500, 'Falls es zu einem Fehler kommt')
class PersonOperations(Resource):

    @studoo.marshal_with(person)
    def get(self, id):
        adm = Admin()
        return adm.get_person_by_id(id)

    @studoo.marshal_with(person)
    @studoo.expect(person, validate=True)
    def put(self, id):
        adm = Admin()
        p = Person.from_dict(api.payload)

        if p is not None:
            p.set_id(id)
            adm.save_person(p)
            return '', 200
        else:
            return '', 500

    def delete(self, id):
        adm = Admin()
        pers = adm.get_person_by_id(id)
        adm.delete_person(pers)
        return '', 200


@studoo.route('/lernprofil')
@studoo.response(500, 'Falls es zu einem Fehler kommt')
class LernprofilListOperations(Resource):

    @studoo.marshal_list_with(lernvorliebe)
    def get(self):
        """Auslesen aller Lernprofile"""
        adm = Admin()
        return adm.get_all_lernvorlieben()

    @studoo.marshal_with(lernvorliebe, code=200)
    @studoo.expect(lernvorliebe)
    def post(self):
        """Anlegen eines neuen Lernprofils"""
        adm = Admin()
        proposal = Lernvorliebe.from_dict(api.payload)
        if proposal is not None:
            lv = adm.create_lernvorliebe(proposal.get_lerntyp(), proposal.get_frequenz(),
                                         proposal.get_extrovertiertheit(), proposal.get_remote_praesenz(),
                                         proposal.get_vorkenntnisse(), proposal.get_lerninteressen())
            return lv, 200
        else:
            return '', 500


@studoo.route('/lernprofil/<int:id>')
@studoo.response(500, 'Falls es zu einem Fehler kommt')
class LernprofilOperations(Resource):

    @studoo.marshal_with(lernvorliebe)
    def get(self, id):
        """Auslesen eines bestimmten Lernprofils"""
        adm = Admin()
        return adm.get_lernvorliebe_by_id(id)

    @studoo.marshal_with(lernvorliebe)
    @studoo.expect(lernvorliebe, validate=True)
    def put(self, id):
        """Update eines bestimmten Lernprofils"""
        adm = Admin()
        lv = Lernvorliebe.from_dict(api.payload)

        if lv is not None:
            lv.set_id(id)
            adm.save_lernvorliebe(lv)
            return '', 200
        else:
            return '', 500

    def delete(self, id):
        """Löschen eines bestimmten Lernprofils"""
        adm = Admin()
        lernprofil = adm.get_lernvorliebe_by_id(id)
        adm.delete_lernvorliebe(lernprofil)
        return '', 200


@studoo.route('/gruppenteilnahme')
@studoo.response(500, 'Falls es zu einem Fehler kommt')
class GruppenTeilnahmeListOperations(Resource):

    @studoo.marshal_list_with(gruppenteilnahme)
    def get(self):
        """Auslesen aller GruppenTeilnahme-Objekte"""
        adm = Admin()
        gt = adm.get_all_gruppen_teilnahme()
        return gt

    @studoo.marshal_with(gruppenteilnahme, code=200)
    @studoo.expect(gruppenteilnahme)
    def post(self):
        """Anlegen eines neuen GruppenTeilnahme-Objektes"""
        adm =Admin()
        proposal = GruppenTeilnahme.from_dict(api.payload)

        if proposal is not None:
            gt = adm.create_gruppen_teilnahme(proposal.get_person_id(), proposal.get_gruppen_id())
            return gt, 200
        else:
            return '', 500



"""     
Der Service wird über app.run() gestartet.
Den Parameter 'debug' setzen wir auf True, um in der Development-Umgebung debuggen direkt im Browser anzeigen zu lassen.
Warnung: In der Produktions-Umgebung muss debug auf False gesetzt werden.
"""
if __name__ == "__main__":
    app.run(debug=True)
