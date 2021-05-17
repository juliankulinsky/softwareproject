from server.bo import BusinessObject as bo


class Person(bo.BusinessObject):
    """Realisierung der Person Klasse

    Person baut auf auf der Klasse BusinessObject auf.

    """

    def __init__(self):
        super().__init__()
        self._vorname = ""
        self._nachname = ""
        self._alter = 0
        self._wohnort = ""
        self._studiengang = ""
        self._semester = 0
        self._profil_id = 0      # Fremdschlüsselbeziehung zum Profil der Person

    """Im Folgenden sind alle Getter- & Setter-Methoden sämtlicher Attribute"""

    def get_vorname(self):
        """ Auslesen von vorname"""
        return self._vorname


    def set_vorname(self, vorname: str):
        self._vorname = vorname

    def get_nachname(self):
        """ Auslesen von nachname"""
        return self._nachname

    def set_nachname(self, nachname: str):
        """ Festlegen von nachname """
        self._nachname = nachname

    def get_alter(self):
        """ Auslesen von alter """
        return self._alter


    def set_alter(self, alter: int):
        """ Festlegen von alter """
        self._alter = alter

    def get_wohnort(self):
        """ Auslesen von wohnort """
        return self._wohnort

    def set_wohnort(self, wohnort: str):
        """ Festlegen von wohnort """
        self._wohnort = wohnort

    def get_studiengang(self):
        """ Auslesen von studiengang """
        return self._studiengang

    def set_studiengang(self, studiengang: str):
        """ Festlegen von studiengang """
        self._studiengang = studiengang

    def get_semester(self):
        """ Auslesen von semester """
        return self._semester

    def set_semester(self, semester: int):
        """ Festlegen von semester """
        self._semester = semester
        
    def get_profil_id(self):
        return self._profil_id

    def set_profil_id(self, profil_id: int):
        self._profil_id = profil_id

    @staticmethod
    def from_dict(dictionary=dict()):
        obj = Person()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_erstellungszeitpunkt(dictionary["erstellungszeitpunkt"])
        obj.set_vorname(dictionary["vorname"])
        obj.set_nachname(dictionary["nachname"])
        obj.set_alter(dictionary["alter"])
        obj.set_wohnort(dictionary["wohnort"])
        obj.set_studiengang(dictionary["studiengang"])
        obj.set_semester(dictionary["semester"])
        obj.set_profil_id(dictionary["profil_id"])
        return obj
