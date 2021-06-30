from server.bo import BusinessObject as bo


class Person(bo.BusinessObject):
    """Realisierung der Person Klasse

    Person baut auf auf der Klasse BusinessObject auf.

    """

    def __init__(self):
        super().__init__()
        self._name = ""
        self._email = ""
        self._google_user_id = ""
        self._alter = 0
        self._wohnort = ""
        self._studiengang = ""
        self._semester = 0
        self._profil_id = 0  # Fremdschlüsselbeziehung zum Profil der Person

    """Im Folgenden sind alle Getter- & Setter-Methoden sämtlicher Attribute"""

    def get_name(self):
        """Auslesen des Namens"""
        return self._name

    def set_name(self, name: str):
        """Setzen des Namens"""
        self._name = name

    def get_email(self):
        """Auslesen der Email"""
        return self._email

    def set_email(self, email: str):
        """Setzen der Email"""
        self._email = email

    def get_google_user_id(self):
        """Auslesen der Google User ID"""
        return self._google_user_id

    def set_google_user_id(self, google_user_id: str):
        """Setzen der Google User ID"""
        self._google_user_id = google_user_id

    def get_alter(self):
        """Auslesen des Alters"""
        return self._alter

    def set_alter(self, alter: int):
        """Setzen des Alters"""
        self._alter = alter

    def get_wohnort(self):
        """Auslesen des Wohnorts"""
        return self._wohnort

    def set_wohnort(self, wohnort: str):
        """Setzen des Wohnorts"""
        self._wohnort = wohnort

    def get_studiengang(self):
        """Auslesen des Studiengangs"""
        return self._studiengang

    def set_studiengang(self, studiengang: str):
        """Setzen des Studiengangs"""
        self._studiengang = studiengang

    def get_semester(self):
        """Auslesen des Semesters"""
        return self._semester

    def set_semester(self, semester: int):
        """Setzen des Semesters"""
        self._semester = semester

    def get_profil_id(self):
        """Auslesen der Profil ID"""
        return self._profil_id

    def set_profil_id(self, profil_id: int):
        """Setzen der Profil ID"""
        self._profil_id = profil_id

    @staticmethod
    def from_dict(dictionary=dict()):
        obj = Person()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_erstellungszeitpunkt(dictionary["erstellungszeitpunkt"])
        obj.set_name(dictionary["name"])
        obj.set_email(dictionary["email"])
        obj.set_google_user_id(dictionary["google_user_id"])
        obj.set_alter(dictionary["alter"])
        obj.set_wohnort(dictionary["wohnort"])
        obj.set_studiengang(dictionary["studiengang"])
        obj.set_semester(dictionary["semester"])
        obj.set_profil_id(dictionary["profil_id"])
        return obj
