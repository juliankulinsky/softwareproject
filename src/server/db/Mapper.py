import mysql.connector as connector
import os
from contextlib import AbstractContextManager
from abc import ABC, abstractmethod


class Mapper(AbstractContextManager, ABC):
    """Abstrakte Basisklasse aller Mapper-Klassen"""

    def __init__(self):
        self._cnx = None

    def __enter__(self):
        """Hier wird abgefragt, ob der Code in der lokalen Entwicklungsumgebung oder in der Cloud ausgeführt wird.
        Je nachdem wo der Code ausgeführt wird sind verschiedene Parameter zu anhand des Kontexts zu setzen."""

        if os.getenv('GAE_ENV', '').startswith('standard'):
            """
            Hier wird der Connector darauf festgelegt in der Google Cloud zu laufen (Post-Deployment).
            Die Verbindung wird zwischen der Google App Engine und der Cloud SQL hergestellt."""
 
            self._cnx = connector.connect(
                user="root",
                password="root",
                unix_socket="/cloudsql/studooswp-318712:europe-west3:studoo",
                database="studoo",
            )
        else:
            """
            Hier wird der Connector darauf festgelegt in einer lokalen Umgebung zu laufen (Pre-Deployment).
            Die Verbindung zu einer lokal installierten mySQL-Datenbank hergestellt."""

            self._cnx = connector.connect(
                user="root", password="root", host="127.0.0.1", database="studoo"
            )

        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        """Hier wird die Verbindung geschlossen sobald der Mapper mit dessen Aktion fertig ist."""
        self._cnx.close()

    """Hier sind die abstrakten Methoden der Mapper Klasse zu finden, Das sind all die Funktionen die die Subklassen 
       mindestens erfüllten."""

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
        """Fügt das gegebene Objekt in die Datenbank ein."""
        pass

    @abstractmethod
    def update(self, object):
        """Das gegebene Objekt auf den entsprechende Datensatz in der Datenbank abbilden."""
        pass

    @abstractmethod
    def delete(self, object):
        """Den Datensatz, des gegebeneen Objektes in der Datenbank löschen."""
        pass
