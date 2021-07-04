# Lokales Starten von Studoo
In diesem Dokument wird skizziert, wie Studoo erfolgreich auf Ihrem Entwicklungsrechner gestartet wird.

**ACHTUNG:** Für den Start nach einem Deployment in die Cloud gelten andere Regeln!

## Schritt 1: Starten des DBMS
1. Installieren Sie mySQL
2. Starten Sie den Dienst mySQL (Vorgehensweise plattformabhängig, siehe 
Hersteller-Dokumentation zu mySQL).
3. Erstellen Sie mit der Datei ```/mysql/MySQL_Datenbank_mit_Dump.sql``` eine Datenbank mit 
Beispieldaten.

## Schritt 2: Starten des Backend
1. Erstellen Sie für das Projekt ein Virtual Environment, das die in dem Dokument [INSTALLATION.md](INSTALLATION.md) formulierten Anforderungen erfüllt.
2. Starten Sie die Datei ```/src/main.py```. Achten Sie dabei auf die Console. Dort
erscheinen entsprechende Meldungen, wenn der Start erfolgt ist.

*Option 1:* Starten der main.py über das Terminal````python main.py````\
*Option 2:* Rechtsklick auf die Datei main.py und "Run main.py" auswählen.
 
## Schritt 3: Starten des Frontend
1. Navigieren Sie im Terminal in das Verzeichnis /frontend (```cd frontend```) und geben Sie den Befehl
   ```npm start``` ein.
2. Nach der Terminal-Eingabe sollte sich das Frontend automatisch öffnen. Ist dem nicht so, 
   rufen Sie in Ihrem Browser die folgende URL auf: localhost:3000/studoo/

