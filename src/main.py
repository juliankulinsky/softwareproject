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
from server.db import NachrichtMapper
from server.bo import Nachricht


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
        "absender": fields.Integer(attribute="_absender_id", description="Absender"),
        "konversation": fields.Integer(attribute="_konversation_id", description="Konversationszugehörigkeit")
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
        "ist_gruppenchat": fields.Boolean(attribute="_ist_gruppenchat", description="Konversation einer Gruppe (True) oder zwischen zwei Personen (False)")
    }

)

lernvorliebe = api.inherit(
    "Lernvorliebe", bo, {
        "lerntyp": fields.Integer(attribute="_lerntyp", description="Lerntyp"),
        "frequenz": fields.Integer(attribute="_frequenz", description="Lernfrequenz des Studis"),
        "extrovertiertheit": fields.Integer(attribute="_extrovertiertheit", description="Grad der Extrovertiertheit"),
        "remote_praesenz": fields.Integer(attribute="_remote_praesenz", description="Definiert Präferenz, ob lieber von Zuhause oder vor Ort gelernt wird"),
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

chatteilnahme = api.inherit(
    "ChatTeilnahme", bo, {
        "person_id": fields.Integer(attribute="_person_id", description="ID der Person, welche an einer Konversation teilnimmt"),
        "konversation_id": fields.Integer(attribute="_konversation_id", description="ID der Konversation, an welcher eine Person teilnimmt")
    }
)

partnervorschlag = api.inherit(
    "PartnerVorschlag", bo, {
        "person_id": fields.Integer(attribute="_person_id", description="ID der Person"),
        "partnervorschlag_id": fields.Integer(attribute="_partnervorschlag_id", description="ID des Partners"),
        "aehnlichkeit": fields.Float(attribute="_aehnlichkeit", description="Berechnete Ähnlichkeit der Person zum potentiellen Partner"),
        "entscheidung_person": fields.Boolean(attribute="_entscheidung_person", description="Entscheidung der Person"),
        "entscheidung_partner": fields.Boolean(attribute="_entscheidung_partner", description="Entscheidung des Partners")
    }
)

gruppenvorschlag = api.inherit(
    "GruppenVorschlag", bo, {
        "person_id": fields.Integer(attribute="_person_id", description="ID der Person"),
        "gruppenvorschlag_id": fields.Integer(attribute="_gruppenvorschlag_id", description="ID der Gruppe"),
        "aehnlichkeit": fields.Float(attribute="_aehnlichkeit", description="Berechnete Ähnlichkeit der Person zur Gruppe"),
        "entscheidung_person": fields.Boolean(attribute="_entscheidung_person", description="Entscheidung der Person"),
        "entscheidung_gruppe": fields.Boolean(attribute="_entscheidung_gruppe", description="Entscheidung der Gruppe")
    }
)


"""
API Routes
"""
#  Jetzt folgen die API Routes:

# Unter der Route 'localhost/nachricht' soll nun das API Model zurückgegeben werden
@studoo.route("/nachricht")
@studoo.response(500, "Falls es zu einem Fehler kommt")
class Nachricht(Resource):
    # Response Marshalling: Kontrolle welche Daten wie ausgegeben werden (Data formatting; siehe model)
    @studoo.marshal_list_with(nachricht)
    def get(self):
        adm = Admin()
        return adm.get_all_nachrichten()

    # POST, PUT, DELETE ergänzen je nach fit (siehe Bankprojekt)


"""
Der Service wird über app.run() gestartet.
Den Parameter 'debug' setzen wir auf True, um in der Development-Umgebung debuggen direkt im Browser anzeigen zu lassen.
Warnung: In der Produktions-Umgebung muss debug auf False gesetzt werden.
"""
if __name__ == "__main__":
    app.run(debug=True)
