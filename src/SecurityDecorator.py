from flask import request
from google.auth.transport import requests
import google.oauth2.id_token

from server.Admin import Admin


def secured(function):

    firebase_request_adapter = requests.Request()

    def wrapper(*args, **kwargs):
        # Verify Firebase auth.
        id_token = request.cookies.get("token")
        print("----------------")
        print("Das ist der Token: (aus SecurityDecorator.py)")
        print(id_token)
        print("----------------")
        error_message = None
        claims = None
        objects = None

        if id_token:
            try:

                # http://flask.pocoo.org/docs/1.0/quickstart/#sessions).
                # Ist eine Anleitung wie man sessions erstellt und prüft, ob der user eingelogged ist.
                # Weiß noch nicht wie ich es implementiere
                claims = google.oauth2.id_token.verify_firebase_token(
                    id_token, firebase_request_adapter)

                if claims is not None:
                    adm = Admin()
                    google_user_id = claims.get("user_id")
                    email = claims.get("email")
                    name = claims.get("name")

                    user = adm.get_person_by_google_user_id(google_user_id)
                    if user is not None:

                        user.set_name(name)
                        user.set_email(email)
                        adm.save_person(user)
                    else:
                        lv = adm.create_lernvorliebe()
                        profil = adm.create_profil(lv.get_id())
                        user = adm.create_person(name, email, google_user_id, profil_id=profil.get_id())

                    print(request.method, request.path, "angefragt durch:", name, email)

                    objects = function(*args, **kwargs)
                    return objects
                else:
                    return '', 401  # UNAUTHORIZED !!!
            except ValueError as exc:
                # This will be raised if the token is expired or any other
                # verification checks fail.
                error_message = str(exc)
                return exc, 401  # UNAUTHORIZED !!!

        return '', 401  # UNAUTHORIZED !!!

    return wrapper
