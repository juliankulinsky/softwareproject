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

"""
Für den Anfang erstellen wir gemäß der Doku (https://flask-restx.readthedocs.io/en/latest/quickstart.html) 
eine minimale Flask-RestX API inkl. Resourceful Routing mit jeweils einer GET und POST Method.
Dieser Endpoint kann über zwei Wege getestet werden:
Grundlegend: run main.py über IDE; dann ...
    
    a) Über das Terminal den Command "curl http://localhost:5000/<name> -d "data=<name>" -X PUT
    b) Öffnen der integrierten Python Shell; 
       from requests import put, get
       put('http://localhost:50000/<name>', data={'data': '<name>'}  # analog mit get

In beiden Fällen wird ein JSON als Response erwartet.

# rudimentäre API

profile = {}


# Minimale API: Response unter http://127.0.0.2:5000/hello
@api.route('/hello')
class HelloWorld(Resource):
    def get(self):
        return {'hello': 'world'}


@api.route('/<string:name>')
class Profile(Resource):
    def get(self, name):
        return {name: profile[name]}

    def put(self, name):
        profile[name] = request.form['data']
        return {name: profile[name]}
"""

# Erstes API Model: Wir möchten folgende Columns von Nachricht ans API übergeben:
model = api.model('Nachricht', {
    'erstellungszeitpunkt': fields.String(attribute='_erstellungszeitpunkt'),
    'inhalt': fields.String(attribute='_inhalt'),
    'absender': fields.Integer(attribute='_absender'),
    'empfaenger': fields.Integer(attribute='_empfaenger'),
})

# Unter der Route 'localhost/nachricht' soll nun das API Model zurückgegeben werden
@api.route('/nachricht')
class Nachricht(Resource):
    # Response Marshalling: Kontrolle welche Daten wie ausgegeben werden (Data formatting; siehe model)
    @api.marshal_with(model, envelope='resource')
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
if __name__ == '__main__':
    app.run(debug=True)
