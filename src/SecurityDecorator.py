from flask import request
from google.auth.transport import requests
import google.oauth2.id_token

from server.Admin import Admin


def secured(function):

    firebase_request_adapter = requests.Request()

    def wrapper(*args, **kwargs):
        # Verify Firebase auth.
        print("Wrapper")
        id_token = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImFiMGNiMTk5Zjg3MGYyOGUyOTg5YWI0ODFjYzJlNDdlMGUyY2MxOWQiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiTW9yaXR6IE11bHNlciIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQVRYQUp5N2djQWVSWWpPdVlfa3RSZV9aV0lmZVB4U1RuUERIMEVKUllHTT1zOTYtYyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9iYW5rcHJvamVrdC1kODQxNyIsImF1ZCI6ImJhbmtwcm9qZWt0LWQ4NDE3IiwiYXV0aF90aW1lIjoxNjIzMjQ3MDA4LCJ1c2VyX2lkIjoiQnhxSU50N3oxVFdsZU9KRzlQZDFscDIzRFQzMiIsInN1YiI6IkJ4cUlOdDd6MVRXbGVPSkc5UGQxbHAyM0RUMzIiLCJpYXQiOjE2MjMyNDcwMDgsImV4cCI6MTYyMzI1MDYwOCwiZW1haWwiOiJtcG11bHNlckBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjEwMTI4OTgzMDM2Njg2NTU1NjMyOCJdLCJlbWFpbCI6WyJtcG11bHNlckBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.f2GQ11DJhZD--5MHwBfF73HFIuwNoo-lSk2v88WrUIQ6iFmpqHvGteLUDG8agcxf4zF3QLOFbmUEvHaFEqj3w1zNrBsaMc_9TMjODewpmVc5AdayvayRummsB9H0_8ooMwmzxSgePOQPWdql0m-gQF2MrgozTvHKcmvJ_mD2dmVqCNHJUw3UQtNqbMYsLcQv0FXy26kpHBf_d-vWelR1JH_EXK0ktPWz6ShZX_wj4mKky_ynyZQYYR9SaDlhjv5dQjI_jJFRxHAQkFDG4Zs_7LbOoL1PO2Lzlw2bD7b0oaC2QK3k9798xfmd9CqgwGzhBMr1U-4aq8H8aASASrZ8Og"
        #= request.cookies.get("token")
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
                print(claims.get("name"))

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
                        user = adm.create_person(name, email, google_user_id)

                    print("Hier lul ", user)
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
