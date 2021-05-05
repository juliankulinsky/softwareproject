# from server.bo import BusinessObject as bo


class Lernvorlieben("""bo.BusinessObject"""):

    def __init__(self):
        super().__init__()
        self._lerntyp = int
        self._frequenz = int
        self._extrovertiertheit = int
        self._remote_praesenz = int
        self._vorkenntnisse = []
        self._lerninteressen = []

    def get_lerntyp(self):
        return self._lerntyp

    def set_lerntyp(self, wert: int):
        self._lerntyp = wert


