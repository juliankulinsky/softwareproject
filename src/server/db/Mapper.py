import mysql.connector as connector
import os
from contextlib import AbstractContextManager
from abc import ABC, abstractmethod


class Mapper (AbstractContextManager, ABC):
    """Abstrakte Basisklasse aller Mapper-Klassen"""

    def __init__(self):
        self._cnx = None

    def __enter__(self):
        """Was soll geschehen, wenn wir beginnen, mit dem Mapper zu arbeiten?"""

        """Wir testen, ob der Code im Kontext der lokalen Entwicklungsumgebung oder in der Cloud ausgeführt wird.
        Dies ist erforderlich, da die Modalitäten für den Verbindungsaufbau mit der Datenbank kontextabhängig sind."""

        if os.getenv('GAE_ENV', '').startswith('standard'):
            """Landen wir in diesem Zweig, so haben wir festgestellt, dass der Code in der Cloud abläuft.
            Die App befindet sich somit im **Production Mode** und zwar im *Standard Environment*.
            Hierbei handelt es sich also um die Verbindung zwischen Google App Engine und Cloud SQL."""

            self._cnx = connector.connect(user='demo', password='demo',
                                          unix_socket='/cloudsql/...',  # zu verändern
                                          database='studoo')
        else:
            """Wenn wir hier ankommen, dann handelt sich offenbar um die Ausführung des Codes in einer lokalen Umgebung,
            also auf einem Local Development Server. Hierbei stellen wir eine einfache Verbindung zu einer lokal
            installierten mySQL-Datenbank her."""

            """Hier ggf. eigenes Passwort eingeben."""

            self._cnx = connector.connect(user='root', password='root',
                                  host='127.0.0.1',
                                  database='studoo')

        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        """Was soll geschehen, wenn wir (evtl. vorübergehend) aufhören, mit dem Mapper zu arbeiten?"""
        self._cnx.close()

    """Formuliere nachfolgend sämtliche Auflagen, die instanzierbare Mapper-Subklassen mind. erfüllen müssen."""

    @abstractmethod
    def find_all(self):
        """Abstrakte Klasse welche alle Objekte aus der Datenbank als Tupel ausliest"""
        pass

    @abstractmethod
    def find_by_key(self, key):
        """Abstrakte Klasse welche einen Tupel aus der Datenbank anhand der ID ausliest"""
        pass

    @abstractmethod
    def insert(self, object):
        """Fügt das gegebene Objekt in die DB ein."""
        pass

    @abstractmethod
    def update(self, object):
        """Das gegebene Objekt auf den entsprechende Datensatz in der Datenbank abbilden."""
        pass

    @abstractmethod
    def delete(self, object):
        """Den Datensatz, des gegebeneen Objektes in der Datenbank löschen."""
        pass
