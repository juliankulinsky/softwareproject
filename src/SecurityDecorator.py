from flask import request
from google.auth.transport import requests
import google.oauth2.id_token

from server.Admin import Admin

"""
Diese Funktion dient in unserem Projekt als SecurityDecorator, der in unserer Service Layer Anwendung findet.
Mithilfe dieser Funktion, die wir als Decorator implementieren werden (main.py), authentifizieren und verifizieren
wir den User, der die entsprechende Operation anfragt. 
Diese Funktion dient damit als Sicherheitsmechanismus für unsere Web-Applikation.
Dabei wird geprüft, ob der id_token des Users gültig ist und ob der User in unserem System bereits hinterlegt ist.
Ist der User nicht authorisiert, um eine entsprechende Aktion auszuführen, so wird ein Error geworfen.
"""


def secured(function):

    firebase_request_adapter = requests.Request()

    def wrapper(*args, **kwargs):

        # Aus den Cookies der Request wird der übermittelte Token ausgelesen und als id_token gespeichert.
        id_token = request.cookies.get("token")

        error_message = None
        claims = None
        objects = None

        # Zuerst wird überprüft, ob der Token gültig ist
        if id_token:

            try:

                # Überprüfen wird nun das Token gegen die Firebase Auth API.
                # Dieses Beispiel verifiziert das Token bei jedem Laden der Seite.
                # Hierzu wird der id_token sowie der firebase_request_adapter mitgegeben und in claims gespeichert.
                claims = google.oauth2.id_token.verify_firebase_token(
                    id_token, firebase_request_adapter
                )

                if claims is not None:
                    adm = Admin()
                    google_user_id = claims.get("user_id")
                    email = claims.get("email")
                    name = claims.get("name")

                    user = adm.get_person_by_google_user_id(google_user_id)

                    if user is not None:
                        """Der User ist dem System bekannt und wir updaten die Email sowie den Namen des Users."""
                        user.set_name(name)
                        user.set_email(email)
                        adm.save_person(user)
                    else:
                        """Ist der User nicht bekannt, so wird für diesen ein neues Profil inkl. Lernvorlieben erstellt.
                        Anschließend werden bei Registrierung auch direkt die ersten Matches (Partner als auch Gruppen)
                        generiert, damit der User direkt neue Lernpartner finden kann."""
                        lv = adm.create_lernvorliebe()
                        profil = adm.create_profil(lv.get_id(), " ")
                        personen = adm.get_all_personen()
                        gruppen = adm.get_all_lerngruppen()
                        user = adm.create_person(
                            name, email, google_user_id, profil_id=profil.get_id()
                        )
                        for person in personen:
                            adm.create_partnervorschlag(
                                user.get_id(),
                                person.get_id(),
                                aehnlichkeit=0,
                                matchpoints=0,
                                entscheidung_person=False,
                                entscheidung_partner=False,
                            )

                        for gruppe in gruppen:
                            adm.create_gruppenvorschlag(
                                user.get_id(),
                                gruppe.get_id(),
                                aehnlichkeit=0,
                                matchpoints=0,
                                entscheidung_person=False,
                                entscheidung_gruppe=False,
                            )

                    # Wir geben jede Request inkl. zugehörigem Anfragesteller zu Debugging-Zwecken auf der Console aus.
                    print(request.method, request.path, "angefragt durch:", name, email)

                    objects = function(*args, **kwargs)
                    return objects
                else:
                    return (
                        "",
                        401,
                    )  # Wenn der User nicht authorisiert ist, wird ein 401-Error geworfen.
            except ValueError as exc:
                # Dieser Fehler wird geworden, wenn der Token abgelaufen ist oder der Check aus einem anderen Grund failt.
                error_message = str(exc)
                return exc, 401

        return "", 401

    return wrapper
