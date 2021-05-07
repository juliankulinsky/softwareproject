#from bo.BusinessObject import BusinessObject

#class Person(bo.BusinessObject)
class Person():
    def __init__(self):
        self._vorname = ""
        self._nachname = ""
        self._alter = 0
        self._studiengang = ""
        self._wohnort = ""
        self._semester = 0
        self._gruppen = ()
        self._chats = ()

    def get_vorname(self):
        return self._vorname

    def set_vorname(self, vorname):
        self._vorname = vorname

    def get_nachname(self):
        return self._nachname

    def set_nachname(self, nachname):
        self._nachname = nachname

    def get_alter(self):
        return self._alter

    def set_alter(self, alter):
        self._alter = alter

    def get_studiengang(self):
        return self._studiengang

    def set_studiengang(self, studiengang):
        self._studiengang = studiengang

    def get_wohnort(self):
        return self._wohnort

    def set_wohnort(self, wohnort):
        self._wohnort = wohnort

    def get_semester(self):
        return self._semester

    def set_semester(self, semester):
        self._semester = semester

    def get_gruppen(self):
        return self._gruppen

    def gruppe_beitreten(self):
        pass

    def nachricht_schreiben(self):
        pass

    def get_chats(self):
        return self._chats

    def chat_annehmen(self):
        pass

