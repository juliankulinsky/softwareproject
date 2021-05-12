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
from flask_restx import Api, Resource, fields

# Um CORS zu ermöglichen benötigen wir das entsprechende Package
from flask_cors import CORS

# SECURITY DECORATOR IMPORTIEREN (muss noch gecodet werden)

# Mapper implementieren
from server.db import NachrichtMapper


from server.Admin import Admin

"""
Zuerst wird Flask instanziiert.
Anschließend instanziieren wir ein API-Objekt und übergeben unsere app als Argument.
"""
app = Flask(__name__)
api = Api(app)

# Erstes API Model: Wir möchten folgende Columns von Nachricht ans API übergeben:
model = api.model(
    "Nachricht",
    {
        "erstellungszeitpunkt": fields.String(attribute="_erstellungszeitpunkt"),
        "inhalt": fields.String(attribute="_inhalt"),
        "absender": fields.Integer(attribute="_absender_id"),
        "konversation": fields.Integer(attribute="_konversation_id"),
    },
)

# Unter der Route 'localhost/nachricht' soll nun das API Model zurückgegeben werden
@api.route("/nachricht")
class Nachricht(Resource):
    # Response Marshalling: Kontrolle welche Daten wie ausgegeben werden (Data formatting; siehe model)
    @api.marshal_with(model, envelope="resource")
    def get(self):
        adm = Admin()
        return adm.get_all_nachrichten()

    """def get(self, **kwargs):
        # Instanziieren von NachrichtMapper
        instance = NachrichtMapper.NachrichtMapper()
        # In die db entern
        instance.__enter__()
        # Alle Objekte ausgeben und als Response zurückgeben
        return instance.find_all()"""


"""
Der Service wird über app.run() gestartet.
Den Parameter 'debug' setzen wir auf True, um in der Development-Umgebung debuggen direkt im Browser anzeigen zu lassen.
Warnung: In der Produktions-Umgebung muss debug auf False gesetzt werden.
"""
if __name__ == "__main__":
    app.run(debug=True)
