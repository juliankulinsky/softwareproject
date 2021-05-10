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
        self._studiengang = ""
        self._wohnort = ""
        self._semester = 0
        self._gruppen = []
        self._chats = []

    def get_vorname(self):
        """ Auslesen von vorname"""
        return self._vorname

    def set_vorname(self, vorname):
        """ Festlegen von vorname """
        self._vorname = vorname

    def get_nachname(self):
        """ Auslesen von nachname"""
        return self._nachname

    def set_nachname(self, nachname):
        """ Festlegen von nachname """
        self._nachname = nachname

    def get_alter(self):
        """ Auslesen von alter """
        return self._alter

    def set_alter(self, alter):
        """ Festlegen von alter """
        self._alter = alter

    def get_studiengang(self):
        """ Auslesen von studiengang """
        return self._studiengang

    def set_studiengang(self, studiengang):
        """ Festlegen von studiengang """
        self._studiengang = studiengang

    def get_wohnort(self):
        """ Auslesen von wohnort """
        return self._wohnort

    def set_wohnort(self, wohnort):
        """ Festlegen von wohnort """
        self._wohnort = wohnort

    def get_semester(self):
        """ Auslesen von semester """
        return self._semester

    def set_semester(self, semester):
        """ Festlegen von semester """
        self._semester = semester

    def set_gruppen(self, gruppe):
        self._gruppen.append(gruppe)

    def get_gruppen(self):
        """ Auslesen von gruppen """
        r = self._gruppen[0]
        return r

    def gruppe_beitreten(self):
        """ Beitritt in Gruppen """
        pass

    def nachricht_schreiben(self):
        """ Schreiben einer Nachricht """
        pass

    def get_chats(self):
        """ Auslesen von chats """
        r = self._chats[0]
        return r

    def set_chat(self, chat):
        self._chats.append(chat)

    def chat_annehmen(self):
        """ Annehmen von Chatanfragen """
        pass
