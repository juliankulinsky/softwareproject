# Installationsanleitung

## Client-Seite 
Der Client baut auf einem React-Frontend auf, welches mit create-react-app gebootstrapt wurde. Der Quellcode des React-Clients liegt im Verzeichnis `/frontend`.

### Was wird vorab benötigt?
1. Node.js (siehe https://nodejs.org/ oder Installation via [Homebrew](https://brew.sh) 
2. Package dependecies: 
Vor dem Start des Entwicklungsservers müssen die Dependencies installiert werden. Dies erfolgt über das Kommando `npm install` im Terminal im Verzeichnis `/frontend`. 
   Folgende Abhängigkeiten werden installiert:
- [React Router](https://reacttraining.com/react-router/web/guides/quick-start)
- [Material-UI](https://material-ui.com)
- [Google firebase authentication](https://firebase.google.com/docs/web/setup)

### Wie wird der Development-Server gestartet?
React bringt einen eignen Development-Server mit, mit welchem zur Echtzeit der React-Code in JavaScript übersetzt wird. Dies erfolgt im Hintergrund auf Basis von [Babel](https://babeljs.io), einem JavaScript Compiler.

Der Dev-Server wird in einem Terminal mit dem Kommando `npm start` gestartet. Nach erfolgreichem Start ist die React-App unter http://localhost:3000 verfügbar.

### Deployment auf den flask-Server
Soll die React-App für ein Deployment unter flask bereit gemacht werden, wird im Terminal mit dem Kommando `npm run build` die App produktionsreif und performanzoptimiert in dem Vereichnis `/frontend/build` zur Verfügung gestellt. 

Die React-App ist für ein Deployment im flask Verzeichnis `/static/reactclient` konfiguriert (in der Datei `package.json` im Key `homepage`). Daher muss der Inhalt des Ordner `/frontend/build/` in `/src/static/reactclient` manuell kopiert werden.

Zur Beachtung: Die Verzeichnisse 
- `/frontend/build/` und 
- `/static/reactclient`

sind in der Datei `.gitignore` enthalten, so dass keine Kompilate im Repository abgelegt werden.

### Firebase Authentication
Um sicherzugehen, dass die Firebase Authentication ordnungsgemäß funktioniert, macht es Sinn zu schauen, ob die Daten in der Datei `firebaseconfig.js`
im Verzeichnis `/frontend/src` noch funktionstüchtig sind. Falls die Firebase Authentication nicht funktioniert, muss über die Firebase-Website notwendiges erstellt und
die zugehörigen Daten in die Datei `firebaseconfig.js` kopiert werden.


## Server/Service-Seite
Die Server-Seite baut auf Python, Flask sowie RestX auf.

### Was wird vorab benötigt?
1. Aktuelle Python-Installation (siehe python.org)
2. Flask (darin enthalten sind auch *Werkzeug* und *Jinja*)
3. flask-restx
4. flask-cors
5. mysql-connector-python
6. google-auth
7. requests

Am besten ist es, sich dafür in PyCharm im Projekt ein Virtual Environment anzulegen und darin mithilfe der ```requirements.txt``` im 
Verzeichnis `/src` alles nötige mit dem folgenden Befehl zu installieren: `pip install -r requirements.txt`
So werden alle nötigen Packages, auch für Firebase Authentication, installiert.

### Wie wird der Server gestartet?
Nach richtig installiertem Environment reicht es, die Datei ```main.py``` auszuführen. Der Start des 
Development Server kann in der PyCharm Console beobachtet werden. Anschließend kann man
auf die Dienste zugreifen.

### Benutzen auf lokaler SQL-Datenbank
Damit der mysql-connecter-python mit der Datenbank kommunizieren kann, muss in der ```Mapper.py``` im Verzeichnis `/src/server/db`
in Zeile 34 bei user und password die zur eigenen lokalen Datenbank passenden Daten eingesetzt werden

# NOCH IN BEARBEITUNG:

## Deployment auf Google Cloud Platform (GCP)
### Vorwort
Die Entwicklung von GCP-konformen Applikationen (heutzutage gerne als App bezeichnet) ist 
[von Google ausführlich dokumentiert (Link auf Python Standard Environment).](https://cloud.google.com/appengine/docs/standard/python3/).
Die Dokumentation wird laufend überarbeitet, so dass es schwierig ist, stets konsistente Bezüge 
(z.B. Links) anzugeben. Sämtliche nachfolgend skizzierten Installationsschritte werden in 
der Google-Dokumentation (siehe oben) genauer beschrieben. Nachfolgend soll lediglich etwas zu
den Hintergründen gesagt oder ergänzende Hinweise gegeben werden. 

### Google Cloud SDK
Das Deployment (dt. Auslieferung) des Service bzw. Ihrer App geschieht vollständig auf Basis von GCP.
Hierzu ist insbesondere das Programm ```gcloud``` auf der Kommandozeile (engl. Console) von Bedeutung.
Sie müssen also zunächst dieses Programm installieren. Es ist Bestandteil des *Google Cloud SDK*
(SDK = Software Development Kit).

### Datenbank (Google Cloud SQL)
Als erstes ist eine Datenbank in der Cloud anzulegen und zu befüllen. Allgemeine Informationen
gibt es hierzu in der begleitenden Vorlesung.

### Google App Engine (GAE)
Das Python-Projekt muss auch in die Lage versetzt werden, auf die Google App Engine deployed
zu werden. Auch hierzu gibt es allgemeine Informationen in der begleitenden Vorlesung.

Zusammenfassend sind die Dateien ```app.yaml```, ```requirements.txt``` sowie ```.gcloudignore```
erforderlich, um die App auf GCP zu deployen. Diese Dateien müssen Sie selbst erstellen. 

Mit ```.gcloudignore``` geben Sie an, welche Dateien beim Deployment *nicht* in die Cloud 
transportiert werden müssen. Dies wird hauptsächlich bei Dateien und Verzeichnissen der Fall sein,
die wir nur zur Entwicklungszeit (engl. Build Time) auf unserem Entwicklungsrechner benötigen.

In der Datei ```requirements.txt``` geben wir sämtliche Packages an, die wir auch in der Cloud neben
unserem eigenen Code benötigen, um unsere App starten zu können. In unserem Fall wären dies z.B.
Flask, Flask-RestX, Clask-Cors. Wir geben also über diese Datei nur an, welche Packages in welcher
Version benötigt werden und laden jene Packages nicht selbst hoch. ```gcloud``` stößt dann in der Cloud 
die Beschaffung jener Packages auf Grundlage unserer Datei ```requirements.txt``` an.

Mit ```app.yaml``` können Sie zahlreiche Eigenschaften der App konfigurieren. Bitte lesen Sie
dies in der Google-Dokumentation nach, da dies den Rahmen sprengen würde. YAML steht für *YAML Ain't
Markup Language*, also eine rekursive Definition des Namens wie etwas bei PHP auch.

Es bietet sich an, das Hauptprogramm der App (also, womit die App startet) in einer Datei bzw. 
einem Module namens ```main.py``` unterzubringen. Da dies eine Konvention von Google App Engine 
für Python ist, wurde in dieser Fallstudie entsprechend verfahren. Natürlich wären auch andere 
Namen möglich. Jedoch haben Sie bei Verwendung von ```main.py``` den geringsten Konfigurationsaufwand.

